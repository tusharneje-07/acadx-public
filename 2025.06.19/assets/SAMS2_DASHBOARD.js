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
  document.documentElement.style.setProperty('--loader-display', 'block');
}

//To Stop ProgressBar
function StopProgressBar() {
  document.documentElement.style.setProperty('--loader-display', 'none');
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


//Student attendance for SYCWA
function std_sycw_a(per) {
  let fill_percentage = parseInt(per)
  let ull_percentage = 100 - fill_percentage
  document.getElementById("class_1").innerHTML = `${fill_percentage}` + "%"
  document.addEventListener('DOMContentLoaded', (event) => {
    var ctx = document.getElementById('std_sycw-a').getContext('2d');
    var attendanceChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Attendance', 'Absence'],
        datasets: [{
          data: [fill_percentage, ull_percentage],
          backgroundColor: ['#FF3B67', '#FFFFFF'],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true, // Disable responsiveness
        maintainAspectRatio: true,
        cutoutPercentage: 70,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      }
    });
  });

}
//Student attendance for SYCWB
function std_sycw_b(per) {
  let fill_percentage = parseInt(per)
  let ull_percentage = 100 - fill_percentage
  document.getElementById("class_2").innerHTML = `${fill_percentage}` + "%"

  document.addEventListener('DOMContentLoaded', (event) => {
    var ctx = document.getElementById('std_sycw-b').getContext('2d');
    var attendanceChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Attendance', 'Absence'],
        datasets: [{
          data: [fill_percentage, ull_percentage],
          backgroundColor: ['#FF9F40', '#FFFFFF'],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true, // Disable responsiveness
        maintainAspectRatio: true,
        cutoutPercentage: 70,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false,
          }
        }
      }
    });
  });
}
//Student attendance for TYCWA
function std_tycw_a(per) {
  let fill_percentage = parseInt(per)
  let ull_percentage = 100 - fill_percentage
  document.getElementById("class_3").innerHTML = `${fill_percentage}` + "%"

  document.addEventListener('DOMContentLoaded', (event) => {
    var ctx = document.getElementById('std_tycw-a').getContext('2d');
    var attendanceChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Attendance', 'Absence'],
        datasets: [{
          data: [fill_percentage, ull_percentage],
          backgroundColor: ['#06A420', '#FFFFFF'],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true, // Disable responsiveness
        maintainAspectRatio: true,
        cutoutPercentage: 70,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      }
    });
  });
}

//Absent and present students for SYCWA
function ap_sycw_a(ab, per) {
  absent = parseInt(ab);
  present = parseInt(per);


  document.getElementById("ap_class_1").innerHTML = `<span style="font-size: 2rem;">${absent}</span>/${present}`

  class_1_fill = absent
  class_1_unfill = present

  document.addEventListener('DOMContentLoaded', (event) => {
    var ctx = document.getElementById('ap_sycw-a').getContext('2d');
    var attendanceChart = new Chart(ctx, {
      
      type: 'doughnut',
      data: {
        labels: ['Absence', 'Present'],
        datasets: [{
          data: [class_1_fill, class_1_unfill],
          backgroundColor: ['#2FCAE9', '#FFFFFF'],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true, // Disable responsiveness
        maintainAspectRatio: true,
        cutoutPercentage: 70,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          }
        }
      }
    });
  });
}
//Absent and present students for SYCWB
function ap_sycw_b(ab, per) {
  absent = parseInt(ab);
  present = parseInt(per);
  document.getElementById("ap_class_2").innerHTML = `<span style="font-size: 2rem;">${absent}</span>/${present}`
  class_2_fill = absent
  class_2_unfill = present
  document.addEventListener('DOMContentLoaded', (event) => {
    var ctx = document.getElementById('ap_sycw-b').getContext('2d');
    var attendanceChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Absence', 'Present'],
        datasets: [{
          data: [class_2_fill, class_2_unfill],
          backgroundColor: ['#8F59FF', '#FFFFFF'],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true, // Disable responsiveness
        maintainAspectRatio: true,
        cutoutPercentage: 70,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          }
        }
      }
    });
  });
}
//Absent and present students for TYCWA
function ap_tycw_a(ab, per) {
  absent = parseInt(ab);
  present = parseInt(per);
  document.getElementById("ap_class_3").innerHTML = `<span style="font-size: 2rem;">${absent}</span>/${present}`
  class_3_fill = absent
  class_3_unfill = present
  document.addEventListener('DOMContentLoaded', (event) => {
    var ctx = document.getElementById('ap_tycw-a').getContext('2d');
    var attendanceChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Absence', 'Present'],
        datasets: [{
          data: [class_3_fill, class_3_unfill],
          backgroundColor: ['#A5236E', '#FFFFFF'],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true, // Disable responsiveness
        maintainAspectRatio: true,
        cutoutPercentage: 70,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          }
        }
      }
    });
  });
}

// Function for creating the weekly report (bar chart)
// Working Here
function weekly_report(dates, data) {

  const container = document.getElementById('weekly_graph');


  const oldCanvas = document.getElementById('myChart');
  if (oldCanvas) {
    container.removeChild(oldCanvas);
  }

  // Create a new canvas element
  const newCanvas = document.createElement('canvas');
  newCanvas.id = 'myChart';
  newCanvas.width = 400;
  newCanvas.height = 400;
  container.appendChild(newCanvas);


  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      // labels: ['MON','TUE','WED','THU','FRI','SAT','SUN'],
      labels: dates,
      datasets: [{
        label: 'Attendance',
        // data: [85, 90, 80, 70, 75, 95, 60],
        data: data,
        backgroundColor: '#2FCAE9', // Same color for all bars
        borderColor: '#2FCAE9',
        borderWidth: 1,
        borderSkipped: 'bottom',    // Skip the border on the bottom
        borderRadius: {
          topLeft: 50,
          topRight: 50
        }
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 10
          }
        }
      },
      plugins: {
        legend: {
          display: false, // Hide the legend
          position: 'top'
        }
      },
      barPercentage: 0.5,
    }
  });
}
// Function for creating the overall percentage (doughnut chart)
function overall_percentage(per) {
  var ctx = document.getElementById('overall-percentage').getContext('2d');
  let fill_percentage = parseInt(per)
  let ull_percentage = 100 - fill_percentage
  document.getElementById("overall_per").innerHTML = `${fill_percentage}` + "%"
  var overallPercentage = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Attendance', 'Absence'],
      datasets: [{
        data: [fill_percentage, ull_percentage],
        backgroundColor: ['#2FCAE9', '#F7F7F7'],
        borderWidth: 0,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 70,
      cutout: '75%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true
        }
      }
    }
  });
}
// Execute the functions when DOM content is loaded
// document.addEventListener('DOMContentLoaded', (event) => {
//   weekly_report();
//   overall_percentage();
// });

// To Select Date with 7 Days Gap
function selectDateWith7Days() {
  document.addEventListener('DOMContentLoaded', function () {
    const fromDate = document.getElementById('fromDate');
    const toDate = document.getElementById('toDate');
    toDate.max = formatDate(new Date());

    // Function to format date as yyyy-mm-dd
    function formatDate(date) {
      return date.toISOString().split('T')[0];
    }

    // Function to set fromDate 7 days before toDate
    function updateFromDate() {
      const selectedDate = new Date(toDate.value);
      const pastDate = new Date(selectedDate);
      pastDate.setDate(selectedDate.getDate() - 6);
      fromDate.value = formatDate(pastDate);
      displayDateRange();
    }

    // Function to set toDate 7 days after fromDate
    function updateToDate() {
      const selectedDate = new Date(fromDate.value);
      const futureDate = new Date(selectedDate);
      futureDate.setDate(selectedDate.getDate() + 6);
      toDate.value = formatDate(futureDate);
      displayDateRange();
    }

    // Function to generate array of dates between fromDate and toDate
    function generateDateRangeArray() {
      const startDate = new Date(fromDate.value);
      const endDate = new Date(toDate.value);
      const dates = [];
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        dates.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return dates;
    }

    // Function to display date range array in console
    function displayDateRange() {
      const dateRange = generateDateRangeArray();
      const onlyDD_MM = Array();
      for (let i = 0; i < dateRange.length; i++) {
        const dateParts = dateRange[i].split('-');
        const day = dateParts[2];
        const month = dateParts[1];
        const result = `${month}-${day}`;
        onlyDD_MM.push(result);
      }
      data = [100, 20, 80, 21, 67, 90, 55]
      getPercentage(onlyDD_MM).then(mydata => {
        if (mydata) {
          weekly_report(onlyDD_MM, mydata);
        } else {
          console.log('Failed to fetch data.');
        }
      });

    }

    // Set initial dates
    const currentDate = new Date();
    toDate.value = formatDate(currentDate);
    updateFromDate();

    // Add event listeners to both inputs
    fromDate.addEventListener('change', updateToDate);
    toDate.addEventListener('change', updateFromDate);
  });
}

// function getPercentage(onlyDD_MM) {
//   const csrftoken = getCookie('csrftoken');
//   var mydata;
//   console.log(csrftoken);
//   const data = {
//     data: onlyDD_MM,
//   };

//   fetch('/SAMS2/WEEKLY_REPORT/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-CSRFToken': csrftoken
//     },
//     body: JSON.stringify(data),
//   })
//     .then(response => response.json())
//     .then(result => {
//       mydata = result.data
//     })
//     .catch(error => console.error('Error:', error));
//     console.log(mydata)
//   return [50, 50, 50, 50, 50, 50, 50]
// }

async function getPercentage(onlyDD_MM) {
  const csrftoken = getCookie('csrftoken');
  const data = {
    data: onlyDD_MM,
  };

  try {
    const response = await fetch('/SAMS2/WEEKLY_REPORT/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    const mydata = result.data;
    return mydata; // Return mydata after fetch completes
  } catch (error) {
    console.error('Error:', error);
    return null; // Return null or handle error as needed
  }
}
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

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

