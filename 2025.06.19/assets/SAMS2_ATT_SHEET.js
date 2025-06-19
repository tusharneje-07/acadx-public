// SIDEBAR DROPDOWN 
function dashboardDrop() {
  document.addEventListener('DOMContentLoaded', function () {
    const dropdownIcon = document.querySelector('.dropdown-icon');
    const dropdownContent = document.querySelector('.dropdown-content');
    const attendanceIcon = document.querySelector('.Attendance-icon');
    const AttendanceContent = document.querySelector('.attendance-content');
    const subjectIcon = document.querySelector('.subject-icon');
    const subjectContent = document.querySelector('.subject-contents');

    dropdownIcon.addEventListener('click', function () {
      if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
        dropdownContent.style.display = "flex";
        dropdownIcon.style.transform = "rotate(180deg)";
      } else {
        dropdownContent.style.display = "none";
        dropdownIcon.style.transform = "rotate(0deg)";
      }
    });
    attendanceIcon.addEventListener('click', function () {
      if (AttendanceContent.style.display === "none" || AttendanceContent.style.display === "") {
        AttendanceContent.style.display = "flex";
        attendanceIcon.style.transform = "rotate(180deg)";
      } else {
        AttendanceContent.style.display = "none";
        attendanceIcon.style.transform = "rotate(0deg)";
      }
    });
    subjectIcon.addEventListener('click', function () {
      if (subjectContent.style.display === "none" || subjectContent.style.display === "") {
        subjectContent.style.display = "flex";
        subjectIcon.style.transform = "rotate(180deg)";
      } else {
        subjectContent.style.display = "none";
        subjectIcon.style.transform = "rotate(0deg)";
      }
    });
  });
}


//POP UP WINDOW FOR NOTIFICATION
function popupNotification() {
  document.addEventListener('DOMContentLoaded', function () {
    const notificationIcon = document.getElementById('notification');
    const popup = document.getElementById('popup');

    notificationIcon.addEventListener('click', function () {
      // Toggle the popup visibility
      if (popup.classList.contains('hidden')) {
        popup.classList.remove('hidden');
        setTimeout(() => popup.classList.add('visible'), 10);
        notificationIcon.classList.add('fa-shake');

        setTimeout(() => notificationIcon.classList.remove('fa-shake'), 900);

      } else {
        popup.classList.remove('visible');
        setTimeout(() => popup.classList.add('hidden'), 300);
        notificationIcon.classList.remove('fa-shake');
      }

      // Position the popup exactly below the notification icon
      const rect = notificationIcon.getBoundingClientRect();
      popup.style.top = `${rect.bottom + window.scrollY}px`;
      popup.style.left = `${rect.left + rect.width / 2 - popup.offsetWidth / 2}px`;
    });

    // Hide the popup when clicking outside of it
    document.addEventListener('click', function (event) {
      if (!notificationIcon.contains(event.target) && !popup.contains(event.target)) {
        popup.classList.remove('visible');
        setTimeout(() => popup.classList.add('hidden'), 300);
      }
    });
  });
}

//POP UP WINDOW FOR SETTING 

function togglePopup(popup, icon) {
  if (popup.classList.contains('hidden')) {
    popup.classList.remove('hidden');
    setTimeout(() => popup.classList.add('visible'), 10);

  } else {
    popup.classList.remove('visible');
    setTimeout(() => popup.classList.add('hidden'), 300);
  }

  // Position the popup exactly below the icon
  const rect = icon.getBoundingClientRect();
  popup.style.top = `${rect.bottom + window.scrollY}px`;
  popup.style.left = `${rect.left + rect.width / 2 - popup.offsetWidth / 2}px`;
}


const settingIcon = document.getElementById('setting');
const settingsPopup = document.getElementById('settings-popup');
const themeToggle = document.getElementById('theme-toggle');
const logo = document.getElementById('logo');


settingIcon.addEventListener('click', function () {
  togglePopup(settingsPopup, settingIcon);
});

document.addEventListener('click', function (event) {
  if (!settingIcon.contains(event.target) && !settingsPopup.contains(event.target)) {
    settingsPopup.classList.remove('visible');
    setTimeout(() => settingsPopup.classList.add('hidden'), 300);
  }
});

themeToggle.addEventListener('click', function () {
  const root = document.documentElement;
  if (root.style.getPropertyValue('--background-color') === '#FFFFFF') {
    root.style.setProperty('--background-color', '#282828');
    root.style.setProperty('--font-color', '#FFFFFF');
    root.style.setProperty('--dashboard-color', '#181818');
    root.style.setProperty('--dselected-icon-color', '#BFBFBF');
    root.style.setProperty('--icon-color', '#FFFFFF')
    root.style.setProperty('--invert-value', '1');
    themeToggle.classList.remove('fa-toggle-off');
    themeToggle.classList.add('fa-toggle-on');
    logo.src = 'https://acadx.tusharneje.online/acadx-1.3.0/sams_logo_dark.png';
    setCookie('acadx-theme', 'dark', 30)

  } else {
    root.style.setProperty('--background-color', '#FFFFFF');
    root.style.setProperty('--font-color', '#292D32');
    root.style.setProperty('--dashboard-color', '#F7F7F7');
    root.style.setProperty('--dselected-icon-color', '#646464');
    root.style.setProperty('--icon-color', '#646464')
    root.style.setProperty('--invert-value', '0');
    themeToggle.classList.remove('fa-toggle-on');
    themeToggle.classList.add('fa-toggle-off');
    logo.src = 'https://acadx.tusharneje.online/acadx-1.3.0/sams_logo_light.png';
    setCookie('acadx-theme', 'light', 30)
  }
});


//POPUP WINDOW FOR PROFILE
function popupProfile() {
  document.addEventListener('DOMContentLoaded', function () {
    const profileDiv = document.getElementById('profile');
    const profilePopup = document.getElementById('profile-popup');

    function togglePopup() {
      if (profilePopup.style.display === 'none' || profilePopup.style.display === '') {
        profilePopup.style.display = 'block';
        centerPopup(); // Center popup when shown
      } else {
        profilePopup.style.display = 'none';
      }
    }

    function centerPopup() {
      const profileRect = profileDiv.getBoundingClientRect();
      const popupRect = profilePopup.getBoundingClientRect();

      // Calculate centering positions
      const centerX = profileRect.left + (profileRect.width / 2) - (popupRect.width / 2);
      const centerY = profileRect.bottom; // Place just below the profileDiv

      profilePopup.style.left = `${centerX}px`;
      profilePopup.style.top = `${centerY}px`;
    }

    profileDiv.addEventListener('click', function () {
      togglePopup();
    });

    document.addEventListener('click', function (event) {
      if (!profileDiv.contains(event.target) && !profilePopup.contains(event.target)) {
        profilePopup.style.display = 'none';
      }
    });

    window.addEventListener('resize', function () {
      if (profilePopup.style.display !== 'none') {
        centerPopup();
      }
    });
  });

}


// TO SET THE CURRENT DATE TO THE DATE PICKER
document.addEventListener('DOMContentLoaded', (event) => {
  // Get the current date

});

//TO SET COOKIES
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

if (getCookie('acadx-theme') == 'dark') {
  document.getElementById('theme-toggle').click();
  document.getElementById('theme-toggle').click();
}

//TO PRINT STUDENT LIST
// function printStudentList() {
//   var studentList = document.getElementById('std-list').innerHTML;
//   var originalContents = document.body.innerHTML;

//   document.body.innerHTML = studentList;
//   window.print();
//   document.body.innerHTML = originalContents;
//   window.location.reload(); // Refresh to restore original state
// }


//TO PRINT STUDENT LIST
function printStudentList() {
  var studentList = document.getElementById('std-list').innerHTML;
  var newWindow = window.open('', '_self', 'fullscreen=yes');

  // Write some content to the new window
  newWindow.document.write(
    `
    <style>
    table{
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
        /* padding-left: 1%; */
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






//TO Open table in New Tab
function openTableInNewTab() {
  var studentList = document.getElementById('std-list').innerHTML;
  var newTab = window.open('', '_blank');
  newTab.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Attendance Sheet</title>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: center;
        }

        @media print {
          table, th, td {
            border: 1px solid black;
          }
        }
      </style>
    </head>
    <body>
      ${studentList}
    </body>
    </html>
  `);
  newTab.document.close();
}

// TO EXPORT EXCEL SHEET

// TO EXPORT EXCEL SHEET
function exportExcel() {
  var AttendanceData = document.getElementById('attendanceSheet');

  // Create a worksheet
  var ws = XLSX.utils.table_to_sheet(AttendanceData);

  // Create a new workbook and append the worksheet
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Export the workbook
  XLSX.writeFile(wb, "AttendanceSheet.xlsx");
}


// TO EXPORT FILE AS A PDF


function StartProgressBar() {
  document.documentElement.style.setProperty('--loader-display', 'block');
}

//To Stop ProgressBar
function StopProgressBar() {
  document.documentElement.style.setProperty('--loader-display', 'none');
}

function change_batch(checked) {
  if (checked) {
    document.getElementById('batch_sep').disabled = false
  }
  else {
    document.getElementById('batch_sep').disabled = true
  }
}
change_batch(document.getElementById('max_attendance').checked)

function change_sem(year){
  elem = document.getElementById('sem')
  elem.innerHTML = ""
  if (year == 'FY') {
    const optionElement1 = document.createElement('option');
    optionElement1.value = "1";
    optionElement1.textContent = "Semester 1";
    
    const optionElement2 = document.createElement('option');
    optionElement2.value = "2";
    optionElement2.textContent = "Semester 2";
    
    elem.appendChild(optionElement1);
    elem.appendChild(optionElement2);
}
else if (year == 'SY') {
    const optionElement1 = document.createElement('option');
    optionElement1.value = "3";
    optionElement1.textContent = "Semester 3";
    
    const optionElement2 = document.createElement('option');
    optionElement2.value = "4";
    optionElement2.textContent = "Semester 4";
    
    elem.appendChild(optionElement1);
    elem.appendChild(optionElement2);
}
else {
    const optionElement1 = document.createElement('option');
    optionElement1.value = "5";
    optionElement1.textContent = "Semester 5";
    
    const optionElement2 = document.createElement('option');
    optionElement2.value = "6";
    optionElement2.textContent = "Semester 6";
    
    elem.appendChild(optionElement1);
    elem.appendChild(optionElement2);
}

}
change_sem(document.getElementById('year').value)