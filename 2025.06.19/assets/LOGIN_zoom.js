 // Disable zooming
 document.addEventListener('keydown', function (event) {
    if (event.ctrlKey === true && (event.key === '+' || event.key === '-' || event.key === '=')) {
        event.preventDefault();
    }
});
