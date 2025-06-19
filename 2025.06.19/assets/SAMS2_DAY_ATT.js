// SIDEBAR DROPDOWN 
function dashboardDrop() {
  document.addEventListener('DOMContentLoaded', function () {
    const dropdownIcon = document.querySelector('.dropdown-icon');
    const dropdownContent = document.querySelector('.dropdown-content');
    const attendanceIcon = document.querySelector('.Attendance-icon');
    const AttendanceContent = document.querySelector('.attendance-content');
    const subjectIcon = document.querySelector('.subject-icon');
    const subjectContent = document.querySelector('.subject-content');

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
    root.style.setProperty('--text-color', '#FFFFFF');
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
    root.style.setProperty('--text-color', '#000');
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
// document.addEventListener('DOMContentLoaded', (event) => {
//   // Get the current date
//   const today = new Date();
  
//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, '0'); 
//   const day = String(today.getDate()).padStart(2, '0');
//   const formattedDate = `${year}-${month}-${day}`;
//   document.getElementById('Select-date').value = formattedDate;
// });





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


// //TO PRINT STUDENT LIST
function printStudentList() {
  var studentList = document.getElementById('std-list').innerHTML;
  var originalContents = document.body.innerHTML;
  
  document.body.innerHTML = studentList;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload();
}

// PROGRESS BAR
function StartProgressBar() {
  document.documentElement.style.setProperty('--loader-display', 'block');
}

//To Stop ProgressBar
function StopProgressBar() {
  document.documentElement.style.setProperty('--loader-display', 'none');
}


function copy_data(data) {
  var tempTextArea = document.createElement("textarea");
  tempTextArea.value = data.replace(/\|/g, '\n');;

  document.body.appendChild(tempTextArea);

  tempTextArea.select();
  tempTextArea.setSelectionRange(0, 99999);

  document.execCommand("copy");

  // Remove the temporary textarea
  
  showPopup_copy();

  setTimeout(function () { closePopup_copy() }, 2000);
}

function showPopup_copy() {

  // Show the popup and overlay
  document.getElementById("copy_popup").style.display = "block";
}

function closePopup_copy() {
  // Hide the popup and overlay
  document.getElementById("copy_popup").style.display = "none";
}