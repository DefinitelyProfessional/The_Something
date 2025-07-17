// Here includes all functions and processes that the index file uses, meant to be reusable


// USING DEFER IN THE HTML SCRIPT TAG EFFICIENTLY PARSES THIS JS FILE AND ONLY
// EXECUTES THIS AFTER THE ENTIRE HTML CONTENTS COMPLETELY PARSED i.e. READY !
let NAVBAR = document.getElementById('NAVBAR');
let tabButton = document.getElementsByClassName('tab');
let tabContent = document.getElementsByClassName('tab-content');
let COOLVIEW = document.getElementById('COOL'); // this is the COOL I love the view button
let contents = document.getElementsByClassName('contents'); // for the I love the view button

// landing screen dissappears on click and triggers bg music
let land_screen = document.getElementById("LANDING-SCREEN");
land_screen.addEventListener("click", () => {
    document.getElementById("MUSIC-COAST").play();

    land_screen.classList.add("fade-out");
    // display none, perfectly timed with the CSS transition
    setTimeout(() => {
        land_screen.style.display = "none";
    }, 500); // CSS transition 0.5s
}, { once: true }); // once: true will delete the event listener after it's triggered once

// Add active EventListeners for the tab switching mechanism
let tabButtonAmount = tabButton.length;
for (let i = 0; i < tabButtonAmount; i++) {
    // the key is that tabButton and tabContent elements are in the same order in the html n css files
    tabButton[i].addEventListener('click', () => { switchTab(tabButton[i], tabContent[i]) });
}

// The button for the I LOVE THE VIEW button lmao
let toggleCOOLVIEW = false;
let contentsAmount = contents.length;
COOLVIEW.addEventListener('click', () => {
    toggleCOOLVIEW = !toggleCOOLVIEW;
    if (toggleCOOLVIEW) {
        for (let i = 0; i < contentsAmount; i++) {
            contents[i].style.opacity = '0.0';
        }
        NAVBAR.style.opacity = '0.2';
        NAVBAR.style.position = 'fixed';
        COOLVIEW.classList.add('active');
    }
    else {
        for (let i = 0; i < contentsAmount; i++) {
            contents[i].style.opacity = '1.0';
        }
        NAVBAR.style.opacity = '1.0';
        NAVBAR.style.position = 'sticky';
        COOLVIEW.classList.remove('active');
    }
});

// Controls the NAVBAR's height
window.addEventListener('resize', () => {
        NAVBAR.style.height = `${window.innerHeight}px`;
});
// trigger the resize event so the code inside the EventListener above is executed
window.dispatchEvent(new Event('resize'));


// END OF addEventListeners AND global variable definitions . . . . . . . . THIS IS WHERE FUNCTION DEFINITIONS START


// a function for NAVBAR's tab switching buttons. 
// NOTE : the order of buttons and its corresponding content must be the same because this function is order dependant
let prevButton = null, prevContent = null;
function switchTab(_button, _content) {
    // deactivate previous stuff
    if (prevButton) {
        prevButton.classList.remove('active');
        prevContent.style.display = 'none';
    }
    // activate current button and content
    _button.classList.add('active');
    _content.style.display = 'block';
    // now current is remembered as previous
    prevButton = _button;
    prevContent = _content;
}

// Finally, make the Arrival tab as initial tab with switchTab,
// due to new method with defer in html and the way JS parses let variables,
// the switchTab function call needs all let variables parsed top bottom beforehand.
tabButton[0].click()