
function StartProgressBar(){
  document.querySelector(".loader-container").style.display = "flex";
}
function StopProgressBar(){
  document.querySelector(".loader-container").style.display = "none";
}
//POP UP WINDOW FOR SETTING
function popup() {
  const menuIcon = document.getElementById("menu");
  const popup = document.getElementById("menu-popup");
  const closeIconClass = "fa-xmark";
  const menuIconClass = "fa-bars";

  // Toggle the popup and switch icons
  menuIcon.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    if (popup.classList.contains("show")) {
      popup.classList.remove("show-top");
      popup.classList.add("hide-bottom");
      setTimeout(() => {
        popup.classList.remove("show", "hide-bottom");
        popup.classList.add("hidden");
        // Switch to the menu icon
        menuIcon.classList.remove(closeIconClass);
        menuIcon.classList.add(menuIconClass);
      }, 300); // Matches animation duration
    } else {
      popup.classList.remove("hidden");
      popup.classList.add("show", "show-top");
      // Switch to the close icon
      menuIcon.classList.remove(menuIconClass);
      menuIcon.classList.add(closeIconClass);
    }
  });
}

const menuIcon = document.getElementById("menu");
const menuPopup = document.getElementById("menu-popup");
const themeToggle = document.getElementById("theme-toggle");

menuIcon.addEventListener("click", function () {
  togglePopup(menuPopup, menuIcon);
});

document.addEventListener("click", function (event) {
  if (!menuIcon.contains(event.target) && !menuPopup.contains(event.target)) {
    menuPopup.classList.remove("visible");
    setTimeout(() => menuPopup.classList.add("hidden"), 300);
  }
});

themeToggle.addEventListener("click", function () {
  const root = document.documentElement;
  if (root.style.getPropertyValue("--background-color") === "#FFFFFF") {
    root.style.setProperty("--background-color", "#282828");
    root.style.setProperty("--text-color", "#FFFFFF");
    root.style.setProperty("--dashboard-color", "#181818");
    root.style.setProperty("--dselected-icon-color", "#BFBFBF");
    root.style.setProperty("--icon-color", "#FFFFFF");
    root.style.setProperty("--sub-text-color", "#BFBFBF");
    root.style.setProperty("--invert-value", "1");
    themeToggle.classList.remove("fa-toggle-off");
    themeToggle.classList.add("fa-toggle-on");
    // logo.src = './PNGs/dark-logo.png';
    setCookie("acadx-theme", "dark", 30);
  } else {
    root.style.setProperty("--background-color", "#FFFFFF");
    root.style.setProperty("--text-color", "#292D32");
    root.style.setProperty("--dashboard-color", "#F7F7F7");
    root.style.setProperty("--dselected-icon-color", "#646464");
    root.style.setProperty("--icon-color", "#646464");
    root.style.setProperty("--sub-text-color", "#B1B1B1");
    root.style.setProperty("--invert-value", "0");
    themeToggle.classList.remove("fa-toggle-on");
    themeToggle.classList.add("fa-toggle-off");
    // logo.src = './PNGs/light-logo.png';
    setCookie("acadx-theme", "light", 30);
  }
});

// PIE CHART

function pieChart(label, data) {
  const ctx = document.getElementById("attendanceChart").getContext("2d");
  const attendanceChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: label,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "#FF3B67",
            "#FF9F40",
            "#2FCAE9",
            "#8F59FF",
            "#00BE9D",
            "#A5236E",
            "#06A420",
          ],
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "60%",
      plugins: {
        legend: {
          position: "right",
          align: "end",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 6,
            boxHeight: 6,
            padding: 20,
            font: {
              size: 12,
              weight: 500,
            },
          },
        },
        datalabels: {
          color: "#00000",
          display: true,
          formatter: (value, context) => {
            return `${value}%`;
          },
          anchor: "center",
          align: "center",
          offset: -10,
          font: {
            size: 12,
            weight: "300",
          },
        },
      },
    },
    plugins: [ChartDataLabels], // Add this line
  });
}

// LINE CHART

function lineChart(data) {
  var ctx1 = document.getElementById("myLineChart").getContext("2d");
  // Create a new Chart instance
  var myLineChart = new Chart(ctx1, {
    type: "line", // Specify the type of chart
    data: {
      labels: ["Average", "Theory", "Practical"], // X-axis labels
      datasets: [
        {
          label: "Overall Attendance", // Label for the third line
          data: data, // Data points for the third line
          borderColor: "rgba(153, 102, 255, 1)", // Line color for the third line
          backgroundColor: "rgba(153, 102, 255, 0.2)", // Area color under the line
          fill: true,
        },
      ],
    },
    options: {
      layout: {
        padding: {
          top: -5,
          bottom: 0, // Add padding below the label
        },
      },
      plugins: {
        legend: {
          labels: {
            boxWidth: 50, // Size of the color box next to the label
            padding: 10, // Add padding around the label
          },
        },
      },
      scales: {
        y: {
          min: 10,
          max: 100,
          ticks: {
            stepSize: 10,
          },
        },
      },
    },
  });
}
// TO SET COOKIES

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

if (getCookie("acadx-theme") == "dark") {
  document.getElementById("theme-toggle").click();
  document.getElementById("theme-toggle").click();
}

// //TO PRINT STUDENT LIST
// function printStudentList() {
//   var studentList = document.getElementById("stud-table").innerHTML;
//   var originalContents = document.body.innerHTML;

//   document.body.innerHTML = studentList;
//   window.print();
//   document.body.innerHTML = originalContents;
//   window.location.reload();
// }

function printStudentList(){
  var studentList = document.getElementById('print_table').innerHTML;
  var newWindow = window.open('', '_blank');
  
  newWindow.document.title = "Student Attendance Print [ACADX-GENERATED]";
newWindow.document.write(`
                    <html>
                        <head>
                            <title>Student Attendance Print [ACADX-GENERATED]</title>
                        </head>
                `);
  // Write some content to the new window
  newWindow.document.write(
    `
    <style>
    body{
      font-family: 'Times New Roman';
    }
    table{
    width: 100%;
    border-collapse: collapse;
    }
    th,
      td {
        border: 1px solid #000;
        margin: 20px 0;
        padding: 10px;
        text-align: center;
        vertical-align: middle; 
        white-space: nowrap;
        font-size: 12px;
        font-weight: 500;
      }
      td{
        color: #000;
      }
      th {
        color: #000;
        font-weight: 700;
      } 
    </style>
    `
  )

  newWindow.document.write(studentList)

  // Close the document to finish writing
  newWindow.document.close();

  // Trigger the print dialog
  newWindow.print();

  newWindow.close();

  window.location.reload(true);
}



function detailReport(){
  var studentList = document.getElementById('detailed_report').innerHTML;

  var newWindow = window.open('', '_blank');
  
  newWindow.document.title = "Student Attendance [ACADX-GENERATED]";
newWindow.document.write(`
                    <html>
                        <head>
                            <title>Student Attendance [ACADX-GENERATED]</title>
                        </head>
                `);
  // Write some content to the new window
  newWindow.document.write(
    `
    <style>
    body{
      font-family: 'Times New Roman';
    }
    table{
    width: 100%;
    border-collapse: collapse;
    }
    th,
      td {
        border: 1px solid #000;
        margin: 20px 0;
        padding: 10px;
        text-align: center;
        vertical-align: middle; 
        white-space: nowrap;
        font-size: 12px;
        font-weight: 500;
      }
      td{
        color: #000;
      }
      th {
        color: #000;
        font-weight: 700;
      } 
    </style>
    
    <script>document.addEventListener('contextmenu', function(e) { e.preventDefault(); }, false); document.addEventListener('keydown', function(e) { if (e.keyCode === 123) { e.preventDefault(); } if (e.ctrlKey && e.shiftKey && e.keyCode === 73) { e.preventDefault(); } if (e.ctrlKey && e.shiftKey && e.keyCode === 74) { e.preventDefault(); } if (e.ctrlKey && e.keyCode === 85) { e.preventDefault(); } }, false);</script>

    `
  )

  newWindow.document.write(studentList)

  // Close the document to finish writing
  newWindow.document.close();

  // Trigger the print dialog
  //newWindow.print();

  //newWindow.close();

  window.location.reload(true);
}