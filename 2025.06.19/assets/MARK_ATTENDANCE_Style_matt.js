document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.btn');
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        button.classList.toggle('aBtn');
      });
    });
  });
  
  // add numbers js 
  var rollNos = [];
  function addno(roll) {
    const box = document.getElementById("txtid");
    if (!rollNos.join().includes(roll)) {
      rollNos.push(roll);
    }
    else {
      rollNos.splice(rollNos.indexOf(roll), 1);
    }
    box.innerHTML = rollNos
    if (rollNos.length > 12) {
      console.log(13);
      document.getElementById("txtid").style = "height: 70px;";
    }
    else if(rollNos.length > 24){
      document.getElementById("txtid").style = "height: 105px;";
    }
    else{
      document.getElementById("txtid").style = "height: 35px;";
    }
  }
  function updateTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    document.getElementById('time').innerHTML = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ' ' + ampm;
  }
  
  setInterval(updateTime, 100); // Update every second
  
  
  function getCurrentDateInMumbai() {
    const options = {
        timeZone: 'Asia/Kolkata',
        weekday: 'short', // Short day name (e.g., Mon, Tue)
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };
  
    const mumbaiDate = new Date().toLocaleString('en-US', options);
    // return mumbaiDate.replace(',', ''); // Remove the comma after the day name
    return mumbaiDate;
  }
  
  document.getElementById('day_date').innerHTML = getCurrentDateInMumbai();