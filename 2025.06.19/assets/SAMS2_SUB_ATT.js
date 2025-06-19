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



// PROGRESS BAR
function StartProgressBar() {
const loader =  document.getElementById('loader');
loader.style.display='block';
}



//To Stop ProgressBar
// function StopProgressBar() {
//   const loader =  document.getElementById('loader');
//   loader.style.display='none';
//   } 
  


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
    root.style.setProperty('--text-color', '#292D32');
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

// PIE CHART

function doughnutChart(labels, data) {
  const ctx = document.getElementById("attendanceChart").getContext("2d");
  
  const attendanceChart = new Chart(ctx, {
    type: "doughnut", // Doughnut chart type
    data: {
      labels: labels, // Labels for the chart segments
      datasets: [
        {
          data: data, // Data values for each segment
          backgroundColor: ['#2FCAE9', '#ffffff'],
          borderWidth: 0, // No border around segments
          hoverOffset: 4, // Offset effect on hover
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Allows flexibility in resizing
      cutout: "70%", // The cutout size for the doughnut hole
      plugins: {
        legend: {
          position: "right", // Legend position
          align: "end", // Alignment of the legend
          labels: {
            usePointStyle: true, // Use a circle instead of a rectangle in the legend
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
     },
    },
    // plugins: [ChartDataLabels], // Plugin to enable data labels
  });
}

// LINE CHART
function lineChart(data1, data2, data3) {
  var ctx1 = document.getElementById("myLineChart").getContext("2d");

  // Create a new Chart instance
  var myLineChart = new Chart(ctx1, {
    type: "line", // Specify the type of chart
    data: {
      labels: ["Average", "Theory", "Practical"], 
      datasets: [
        {
          label: "Selected Subject", 
          data: data1, // Data points for the first line
          borderColor: "#2FCAE9", // Line color for the first line
          //backgroundColor: "rgba(75, 192, 192, 0.2)", // Area color under the line
          fill: false,
        },
        {
          label: "Overall in Department", 
          data: data2, // Data points for the second line
          borderColor: "#FF3B67", // Line color for the second line
          backgroundColor: "rgba(255, 59, 103, 0.2)", // Area color under the line
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
          max: 120,
          ticks: {
            stepSize: 10,
          },
        },
      },
    },
  });
}


// TO ACTIVE BATCH SECTION OR DEACTIVE THE BATCH SECTION



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


function StartProgressBar() {
  document.documentElement.style.setProperty('--loader-display', 'block');
}

//To Stop ProgressBar
function StopProgressBar() {
  document.documentElement.style.setProperty('--loader-display', 'none');
}