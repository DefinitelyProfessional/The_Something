// make element variables
let NAVBAR, CONTENT, tabButton, tabContent, coolView, tabContentAmount;
document.addEventListener('DOMContentLoaded', () => {
    // Define element variables after everything is loaded
    NAVBAR = document.getElementById('NAVBAR');
    COOLVIEW = document.getElementById('COOL');
    contents = document.getElementsByClassName('contents'); // for the I love the view button
    tabButton = document.getElementsByClassName('tab');
    tabContent = document.getElementsByClassName('tab-content');

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
    // Make the Arrival tab as initial tab with switchTab
    tabButton[0].click()

    // Controls the NAVBAR's height
    window.addEventListener('resize', () => {
            NAVBAR.style.height = `${window.innerHeight}px`;
    });

    // trigger the resize event so the code inside the EventListener above is executed
    window.dispatchEvent(new Event('resize'));

    // svg injection to use svg graphics stuff, the file location is used by fetch() which root from the repository, not relative to its file location
    injectSVG('.icon-house', './assets/graphics/house.svg');
    injectSVG('.icon-credit', './assets/graphics/credit.svg');
    injectSVG('.icon-calc', './assets/graphics/calculator.svg');
    injectSVG('.icon-triangle', './assets/graphics/triangle.svg');
    injectSVG('.icon-github', './assets/graphics/github.svg');
    injectSVG('.icon-instagram', './assets/graphics/instagram.svg');
    injectSVG('.icon-user', './assets/graphics/user.svg');
    injectSVG('.icon-camera', './assets/graphics/camera.svg');
}, { once: true }); // once: true can be used for any EventListener that only requires to be called once.

// svg graphics injection to elements
const svgCache = {};
async function injectSVG(targetSelector, filePath) {
    try {
        // ... so what does svgCache store when svgCache[filePath] ?
        let svgText = svgCache[filePath]; // this line's purpose seem to just be so if (!svgText) works as intended ?
        // if svgText is NOT empty... can I just use !filePath ?
        if (!svgText) {
            // ok so await waits for fetch to finish fetching ?
            // then what data type does fetch return and gets stored in res ? the actual svg graphics ?
            const res = await fetch(filePath);
            // .ok checks if fetch returns resolved(ok) or rejected(not ok) ? isnt res the contents of an svg now ?
            if (!res.ok) throw new Error(`Failed to load ${filePath}`);
            // so what is the data type and value of res.text ? finally the actual svg ?
            svgText = await res.text();
            svgCache[filePath] = svgText;// .. this line seems obsolete and pointless ?
        }
        // inject svgs for each element with the target
        const targets = document.querySelectorAll(targetSelector);
        targets.forEach(el => {
            // ok so this is where the innerHTML becomes the literal svg ?
            el.innerHTML = svgText;
        });
    }
    // err is just a placeholder variable for catch to work ?
    catch (err) {
        console.error(err);
    }
}

// a function for NAVBAR's tab switching buttons. NOTE : the order of buttons and its corresponding content must be the same because this function is order dependant
let prevButton, prevContent;
function switchTab(_button, _content) {
    // deactivate previous stuff
    if (prevButton != undefined) {
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