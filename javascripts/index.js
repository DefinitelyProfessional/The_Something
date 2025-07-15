// USING DEFER IN THE HTML SCRIPT TAG EFFICIENTLY PARSES THIS JS FILE ONLY
// AFTER THE ENTIRE HTML CONTENTS COMPLETELY PARSED AND LOADED i.e. EXISTS
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

// svg injection to use svg graphics stuff, the file location is used by fetch() which root from the repository,
// not relative to its file location. Also avoid injecting several classes with the same file. THATS INEFFICIENT 
injectSVG('.icon-house', './assets/graphics/house.svg');
injectSVG('.icon-credit', './assets/graphics/credit.svg');
injectSVG('.icon-calc', './assets/graphics/calculator.svg');
injectSVG('.icon-triangle', './assets/graphics/triangle.svg');
injectSVG('.icon-github', './assets/graphics/github.svg');
injectSVG('.icon-instagram', './assets/graphics/instagram.svg');
injectSVG('.icon-user', './assets/graphics/user.svg');
injectSVG('.icon-camera', './assets/graphics/camera.svg');


// END OF addEventListeners AND global variable definitions . . . . . . . . THIS IS WHERE FUNCTION DEFINITIONS START


// svg graphics injection to elements
async function injectSVG(targetSelector, filePath) {
    // when an async function is called, it runs an instance of itself, 
    // while the script continues without having to wait for this instance to finish
    try {
        // fetch takes time to return the contents of the filepath
        const fetchResponse = await fetch(filePath);
        // await pauses this function's execution until fetch resolves, 
        // but other code (and other async calls) can continue running in parallel

        // // fetchResponse is a Response object — it holds the result of the fetch, 
        // including status codes and the actual file content (accessible via .text() or .json())
        if (!fetchResponse.ok) throw new Error(`Failed to load ${filePath}`);

        // .text() is a method that returns a Promise which resolves to the response body as a string, so we use await again here 
        let svgText = await fetchResponse.text();
        // it takes time to read the full response body, so .text() uses a Promise to handle that delay asynchronously

        // by now, things have successfully fetched the SVG contents and only then it starts injecting the SVG
        const targets = document.querySelectorAll(targetSelector);
        targets.forEach(el => {
            el.innerHTML = svgText;
        });
    }
    catch (errorsIfItExists) {
        console.error(errorsIfItExists);
    }
    // Each async function call creates its own independent execution. 
    // It can pause itself using await, but the rest of the script — and other async calls — continue running in parallel.
}

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