import tkinter as tk
from tkinter import scrolledtext, messagebox, simpledialog,ttk,PhotoImage
import subprocess
import threading
import time
import platform
import sys
import mysql.connector
import os
from datetime import datetime
import json
from dotenv import load_dotenv
from PIL import Image, ImageTk

def get_latency():
    host = "google.com"

    # Determine the command based on the operating system
    param = "-n" if platform.system().lower() == "windows" else "-c"
    command = ["ping", param, "1", host]

    try:
        output = subprocess.check_output(command, stderr=subprocess.STDOUT, universal_newlines=True)
        
        # Parse the output to extract latency
        if platform.system().lower() == "windows":
            # For Windows output
            for line in output.splitlines():
                if "Average" in line:
                    latency = line.split("Average =")[-1].strip().replace("ms", "")
                    return latency
        else:
            # For Unix/Linux/macOS output
            for line in output.splitlines():
                if "time=" in line:
                    latency = line.split("time=")[-1].split()[0]
                    return latency

    except subprocess.CalledProcessError:
        return "Ping failed"

with open ("./config.json", "r") as f:
    config_data = json.load(f)
    
    
load_dotenv(dotenv_path=f"{config_data.get("DJANGO_DIR", "/django")}/ACADX/.env")
DB_NAME = os.getenv("DB_NAME", "yourdb")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "yourpassword")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_HOST = os.getenv("DB_HOST","localhost")

ADMIN_VERSION = os.getenv("ADMIN_VERSION","0.0.1")
ACADX_VERSION = os.getenv("ACADX_VERSION","1.3.1")

CDN_URL = os.getenv("CDN_URL", "ENV NOT LOADED!")
WEBSITE = os.getenv("WEB_SITE", "ENV NOT LOADED!")
  
# === Config ===
DJANGO_DIR = config_data.get("DJANGO_DIR", "/django")
VENV_ACTIVATE = os.path.join(DJANGO_DIR, f"{config_data.get("VENV_FOLDER_NAME","ubuntu_env")}/bin/activate")
DJANGO_CMD = f"source '{VENV_ACTIVATE}' && python manage.pyw runserver"
CF_CMD = f"cloudflared tunnel run {config_data.get("CF_TUNNEL_NAME", "your_tunnel_name")}"

# === Globals ===
process_cf = None
process_django = None
cf_log_cache = []
django_log_cache = []
cf_log_masked = [True]
django_log_masked = [True]
cf_log_visible = [False]
django_log_visible = [False]

# === App Window ===
root = tk.Tk()
root.title("Django & Cloudflare Manager - Secured")
root.geometry("1000x250")

# === Info Panel ===
img = Image.open("./logo.png")
img = img.resize((100, 50))  # Resize as needed
tk_img = ImageTk.PhotoImage(img)

label = tk.Label(root, image=tk_img,)
label.image = tk_img
label.pack(anchor='w', padx=10, pady=10)

info_label = tk.Label(root, anchor="w", font=("Courier", 10))
info_label.pack(fill="x", padx=10, pady=5)

info_label2 = tk.Label(root, anchor="w", font=("Courier", 10))
info_label2.pack(fill="x", padx=10, pady=5)

separator = ttk.Separator(root, orient='horizontal')
separator.pack(fill='x', pady=10, padx=10)

info_label3 = tk.Label(root, anchor="w", font=("Courier", 10))
info_label3.pack(fill="x", padx=10, pady=5)


def update_info():
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    info = f"DT: {now} | Python: {sys.version.split()[0]} | Platform: {platform.platform()}"
    info2 = f"Node Name (Host) : {platform.node()} | Architecture: {platform.machine()} | OS: {platform.system()}"
    info3 = f"Application Name : Acadx | Version: {ACADX_VERSION} | Admin-Version: {ADMIN_VERSION} | Latency: {get_latency()} ms"
    info_label.config(text=info)
    info_label2.config(text=info2)
    info_label3.config(text=info3)
    root.after(1000, update_info)

# === Log Area Factory ===
def make_log_area(title):
    frame = tk.LabelFrame(root, text=title, padx=5, pady=5)
    text_area = scrolledtext.ScrolledText(frame, wrap=tk.WORD, height=15)
    text_area.pack(fill="both", expand=True)
    frame.pack_forget()
    return frame, text_area

cf_frame, cf_log = make_log_area("Cloudflare Tunnel")
django_frame, django_log = make_log_area("Django Server")

# === Safe Insert ===
def insert_log(log_cache, log_widget, line, masked):
    log_cache.append(line)
    if masked[0]:
        log_widget.insert(tk.END, "*** *** ** *\n")
    else:
        log_widget.insert(tk.END, line)
    log_widget.see(tk.END)

# === Run Bash ===
def run_bash(cmd, log_cache, log_widget, masked_flag, cwd=None):
    process = subprocess.Popen(["/bin/bash", "-c", cmd], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, cwd=cwd)
    def reader():
        for line in iter(process.stdout.readline, ''):
            insert_log(log_cache, log_widget, line, masked_flag)
        process.stdout.close()
    threading.Thread(target=reader, daemon=True).start()
    return process

# === Toggle Log Frame ===
def toggle_log(frame, widget, log_cache, visible_flag, masked_flag):
    if visible_flag[0]:
        frame.pack_forget()
        visible_flag[0] = False
    else:
        frame.pack(fill="both", expand=True, padx=10, pady=5)
        visible_flag[0] = True
        widget.delete("1.0", tk.END)
        for line in log_cache:
            widget.insert(tk.END, "*** *** ** *\n" if masked_flag[0] else line)
        widget.see(tk.END)

# === Unlock Password ===
def unlock_logs():
    pwd = simpledialog.askstring("Unlock Logs", "Enter Admin Password:", show="*")
    if pwd == config_data.get("ADMIN_PASSWORD","1577"):
        cf_log_masked[0] = False
        django_log_masked[0] = False
        if cf_log_visible[0]:
            cf_log.delete("1.0", tk.END)
            for line in cf_log_cache:
                cf_log.insert(tk.END, line)
        if django_log_visible[0]:
            django_log.delete("1.0", tk.END)
            for line in django_log_cache:
                django_log.insert(tk.END, line)
    else:
        messagebox.showerror("Access Denied", "Incorrect Password")

# === Start/Stop Actions ===
def start_all():
    global process_cf, process_django
    if not process_cf:
        process_cf = run_bash(CF_CMD, cf_log_cache, cf_log, cf_log_masked)
    if not process_django:
        process_django = run_bash(DJANGO_CMD, django_log_cache, django_log, django_log_masked, cwd=DJANGO_DIR)

def stop_all():
    global process_cf, process_django
    if process_cf:
        process_cf.terminate()
        process_cf = None
        insert_log(cf_log_cache, cf_log, "[Cloudflare Tunnel Stopped]\n", cf_log_masked)
    if process_django:
        process_django.terminate()
        process_django = None
        insert_log(django_log_cache, django_log, "[Django Server Stopped]\n", django_log_masked)

def test_mysql():
    try:
        conn = mysql.connector.connect(host=f"{DB_HOST}", user=f"{DB_USER}", password=f"{DB_PASSWORD}", database=f"{DB_NAME}", port=f"{DB_PORT}")
        conn.close()
        messagebox.showinfo("MySQL", "Connection Successful")
    except Exception as e:
        messagebox.showerror("MySQL", f"Connection Failed:\n{e}")

def confirm_exit():
    pwd = simpledialog.askstring("Exit Confirmation", "Enter Admin Password to Close:", show="*")
    if pwd == config_data.get("ADMIN_PASSWORD","1577"):
        stop_all()
        root.destroy()
    else:
        messagebox.showerror("Access Denied", "Incorrect Password")

# === Button Panel ===
btn_frame = tk.Frame(root)
btn_frame.pack(fill="x", pady=5)

tk.Button(btn_frame, text="▶️ Start All", command=start_all).pack(side="left", padx=10)
tk.Button(btn_frame, text="🔽 Toggle CF Logs", command=lambda: toggle_log(cf_frame, cf_log, cf_log_cache, cf_log_visible, cf_log_masked)).pack(side="left", padx=10)
tk.Button(btn_frame, text="🔽 Toggle Django Logs", command=lambda: toggle_log(django_frame, django_log, django_log_cache, django_log_visible, django_log_masked)).pack(side="left", padx=10)
tk.Button(btn_frame, text="Unlock Logs", command=unlock_logs).pack(side="left", padx=10)
tk.Button(btn_frame, text="Test MySQL", command=test_mysql).pack(side="left", padx=10)
tk.Button(btn_frame, text="Exit", command=confirm_exit).pack(side="right", padx=10)

# === Startup ===
update_info()
start_all()
root.protocol("WM_DELETE_WINDOW", confirm_exit)
icon = PhotoImage(file='./icon.png')  # use a PNG file
root.iconphoto(False, icon)
root.mainloop()
