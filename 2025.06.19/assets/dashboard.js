setInterval(function() {getFormattedDateTime()},1000);
function getFormattedDateTime() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const now = new Date();
  
    const dayOfWeek = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
  
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const amPM = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hours %= 12;
    hours = hours || 12; // Handle midnight (0 hours)
  
    const formattedTime = `${dayOfWeek} - ${month} ${date}, ${year} - ${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${amPM}`;
  
    document.getElementById("copyrightinfo").innerHTML = formattedTime + " | " + `Copyright &copy; ${new Date().getFullYear()} <span style="color: #e41b45;">ACADX</span> | <a href="/ABOUT/" style="color : #f3ff70; text-decoration : none;">Get to Know Us</a>`;
  }

function openPopup(msg) {
    document.getElementById('overlay').style.display = 'flex';
}
function closePopup() {
    // Hide the overlay
    document.getElementById('overlay').style.display = 'none';
}
