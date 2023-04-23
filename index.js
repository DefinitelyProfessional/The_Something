// make variables
let NAVBAR;
document.addEventListener('DOMContentLoaded', () => {
    // Define the variables after everything is loaded
    NAVBAR = document.getElementById('NAVBAR');

    // Controls the NAVBAR's height
    NAVBAR.style.height = `${window.innerHeight}px`;
    window.addEventListener('resize', () => {
        NAVBAR.style.height = `${window.innerHeight}px`;
    });
});
