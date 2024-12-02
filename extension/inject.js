// // Create a container for the chatbot
// const container = document.createElement("div");
// container.id = "react-chatbot-container";
// document.body.appendChild(container);

// // Inject the React app's main script
// const script = document.createElement("script");
// script.src = chrome.runtime.getURL("build/static/js/main.e669bb4d.js");
// document.body.appendChild(script);


// Fetch the asset-manifest.json file to get the CSS and JS file paths
fetch(chrome.runtime.getURL("build/asset-manifest.json"))
  .then((response) => response.json())
  .then((manifest) => {
    // Get the CSS and JS files from the manifest
    const mainCssFile = manifest["files"]["main.css"];
    const mainJsFile = manifest["files"]["main.js"];

    // Inject the CSS file into the page
    if (mainCssFile) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = chrome.runtime.getURL(`build${mainCssFile}`);
      document.head.appendChild(link);
    }

    // Create a container for the React app
    const container = document.createElement("div");
    container.id = "react-chatbot-container";
    document.body.appendChild(container);

    // Inject the JS file into the page
    if (mainJsFile) {
      const script = document.createElement("script");
      script.src = chrome.runtime.getURL(`build${mainJsFile}`);
      document.body.appendChild(script);
    }
  })
  .catch((error) => {
    console.error("Error loading asset-manifest.json or assets:", error);
  });
