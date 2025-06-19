 //For Password Section - 
const Pass = document.getElementById('Spass');
const toggleEye = document.getElementById('eye-icon-1');

toggleEye.addEventListener('click', function () {
  if (Pass.type === 'password') 
  {
    Pass.type = 'text';
    toggleEye.classList.remove('fa-eye');
    toggleEye.classList.add('fa-eye-slash');
  } 
  else 
  {
    Pass.type = 'password';
    toggleEye.classList.remove('fa-eye-slash');
    toggleEye.classList.add('fa-eye');
  }
});