# 📦 Acadx Test Server Runner

**Application Name:** Acadx Test Server Runner  
**Parent Software:** [Acadx](https://acadx.tusharneje.online)  
**Version:** 1.0.0  
**Author:** Tushar Neje  

---

## 📝 Description

The **Acadx Test Server Runner** is a GUI-based utility tool designed to simplify the local testing and debugging of the Acadx platform. It automatically launches a Django server and a secure Cloudflare tunnel, displaying both logs within a unified, user-friendly interface.

This application is intended **for development and internal testing purposes only**.

---

## 🚀 Features

- 🔄 **Auto-start Django server and Cloudflare tunnel**
- 🔐 **Encrypted and collapsible log windows**
- 🔓 **Password-protected log access and exit**
- 🕒 **Real-time system info: Date, time, Python version, and OS**
- 🧪 **MySQL database connectivity test**

---

## 🖥️ Requirements

- Python 3.8+
- `cloudflared` installed and configured
- `mysql-connector-python`  
- GUI support for Tkinter (may require `python3-tk` on Ubuntu)

---

## ⚙️ How to Run

```bash
python main.py
````

Make sure your virtual environment is properly configured and Cloudflare tunnel is set up as `django-tunnel`.


---

## 🛠️ Notes

> This application is built for testing the Acadx platform locally. It is **not intended for production use**.


