// Here includes all functions and processes that can be used by any file that needs the following 
// Features : SVG injection, asset loader

// Asset loader

// 1. Define two sets
const critical = [
  'css/loader.css',
  'img/loader-bg.jpg',
  'fonts/loader-font.woff2'
];

const mainAssets = [
  'img/bg.jpg',
  'img/sprite.png',
  'data/config.json',
  // …etc
];

// 2. Reusable fetcher with full-body read
function fetchAndCache(path) {
  return fetch(path, { cache: 'force-cache' })
    .then(res => res.ok ? res.blob() : Promise.resolve())
    .catch(() => {});
}

// 3. Simple preload helper
function preloadList(list, onProgress, concurrency = 4) {
  let loaded = 0, index = 0, total = list.length;

  function worker() {
    if (index >= total) return Promise.resolve();
    const url = list[index++];
    return fetchAndCache(url)
      .finally(() => {
        loaded++;
        onProgress(loaded, total);
      })
      .then(worker);
  }

  return Promise.all(Array.from({ length: concurrency }, worker)).then(() => {});
}

// 4. Kick off the two-phase flow
document.addEventListener('DOMContentLoaded', () => {
  // Step A: Load loader assets
  preloadList(critical, () => {})
    .then(() => {
      // Now loader.css, loader-bg.jpg, loader-font are in cache
      document.getElementById('loader').style.display = 'flex';

      // Step B: Load main assets with progress updates
      const fill = document.getElementById('fill');
      preloadList(mainAssets, (loaded, total) => {
        fill.style.width = Math.round(loaded/total*100) + '%';
      }).then(() => {
        document.getElementById('loader').remove();
        initYourApp();
      });
    });
});

// SVG MANUAL INJECTION TO HTML ELEMENTS
async function injectSVG(targetSelector, filePath) {
    // when an async function is called, it runs an instance of itself, 
    // while the script continues without having to wait for this instance to finish
    try {
        // fetch takes time to return the contents of the filepath
        const fetchResponse = await fetch(filePath);
        // await pauses this function's execution until fetch resolves, 
        // but other code (and other async calls) can continue running in parallel

        // fetchResponse is a Response object — it holds the result of the fetch, 
        // including status codes and the actual file content (accessible via .text() or .json() fyi)
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