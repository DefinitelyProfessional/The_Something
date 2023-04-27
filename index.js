// make element variables
let NAVBAR, tabButton, tabContent;
document.addEventListener('DOMContentLoaded', () => {
    // Define the variables after everything is loaded
    NAVBAR = document.getElementById('NAVBAR');
    tabButton = Array.from(document.getElementsByClassName('tab'));
    tabContent = Array.from(document.getElementsByClassName('tab-content'));

    // Add EventListeners
    for (let i = 0; i < tabButton.length; i++) {
        tabButton[i].addEventListener('click', () => { switchTab(tabButton[i], tabContent[i]) });
    }

    // Controls the NAVBAR's height
    NAVBAR.style.height = `${window.innerHeight}px`;
    window.addEventListener('resize', () => {
        NAVBAR.style.height = `${window.innerHeight}px`;
    });
});

// a function for NAVBAR's tab switching buttons. NOTE : the order of buttons and its corresponding content must be the same because this function is order dependant
let prevButton, prevContent;
function switchTab(_button, _content) {
    // deactivate previous stuff
    if (prevButton != undefined) {
        prevButton.classList.remove('active');
        prevContent.classList.remove('active');
    }
    // activate current button and content
    _button.classList.add('active');
    _content.classList.add('active');
    // now current is remembered as previous
    prevButton = _button;
    prevContent = _content;
}