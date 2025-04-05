
/*
  const svgPaths = [
    "../mara-mckevitt-web/resources/logo/logo.svg",
    "../mara-mckevitt-web/resources/logo/logo4.svg",
    "../mara-mckevitt-web/resources/logo/logo1.svg",
    "../mara-mckevitt-web/resources/logo/logo5.svg",
    "../mara-mckevitt-web/resources/logo/logo2.svg",
    "../mara-mckevitt-web/resources/logo/logo6.svg",
  ];

  const detailSections = [
    ".projects details",
    ".events details",
    ".press details",
    ".writing details",
    ".contact details"
  ];
  
  const svgImage = document.querySelector("svg image");
  let openDetailsStack = []; // This will keep track of open details in order
  
  function updateSVGFromOpenDetail() {
    // Find the last opened <details>
    const lastOpenedIndex = openDetailsStack.length > 0 ? openDetailsStack[openDetailsStack.length - 1] : -1;
  
    if (lastOpenedIndex === -1) {
      // No section open → fade out
      svgImage.style.opacity = "0";
      return;
    }
  
    const newSrc = svgPaths[lastOpenedIndex];
  
    // Only update if the image actually needs to change
    if (svgImage.getAttribute("href") !== newSrc) {
      svgImage.style.opacity = "0"; // Fade out
      setTimeout(() => {
        svgImage.setAttribute("href", newSrc);
        svgImage.style.opacity = "1"; // Fade in new
      }, 500);
    } else {
      svgImage.style.opacity = "1"; // Ensure visible if the same image is needed
    }
  }
  
  // Function to update the openDetailsStack correctly
  function handleDetailToggle(event) {
    const detail = event.target;
    const index = detailSections.findIndex(selector => document.querySelector(selector) === detail);
  
    if (detail.open) {
      // Add to stack if opened
      openDetailsStack.push(index);
    } else {
      // Remove from stack if closed
      openDetailsStack = openDetailsStack.filter(i => i !== index);
    }
  
    updateSVGFromOpenDetail();
  }
  
  // Attach event listeners to each <details> element
  detailSections.forEach(selector => {
    const detail = document.querySelector(selector);
    if (detail) {
      detail.addEventListener("toggle", handleDetailToggle);
    }
  });
  
  // Initialize with an empty state
  updateSVGFromOpenDetail();

*/

  
const svgPaths = [
   "../mara-mckevitt-web/resources/logo-new/logo.svg",   // Default logo when nothing is open
   "../mara-mckevitt-web/resources/logo-new/logo5.svg",  // Projects
   "../mara-mckevitt-web/resources/logo-new/logo1.svg",  // Events
   "../mara-mckevitt-web/resources/logo-new/logo4.svg",  // Press
   "../mara-mckevitt-web/resources/logo-new/logo2.svg",  // Writing
   "../mara-mckevitt-web/resources/logo-new/logo3.svg",  // Contact
  
  /*
  "../mara-mckevitt-web/resources/glow-logo/Asset-11.svg",   // Default logo when nothing is open
  "../mara-mckevitt-web/resources/glow-logo/Asset-8.svg",  // Projects
  "../mara-mckevitt-web/resources/glow-logo/Asset-9.svg",  // Events
  "../mara-mckevitt-web/resources/glow-logo/Asset-10.svg",  // Press
  "../mara-mckevitt-web/resources/glow-logo/Asset-7.svg",  // Writing
  "../mara-mckevitt-web/resources/glow-logo/Asset-12.svg",  // Contact
  */
];

const detailSections = [
  ".projects details",
  ".events details",
  ".press details",
  ".writing details",
  ".contact details"
];

const svgImage = document.querySelector("svg image");
let openDetailsStack = []; // This will keep track of open details in order

function updateSVGFromOpenDetail() {
  const lastOpenedIndex = openDetailsStack.length > 0 ? openDetailsStack[openDetailsStack.length - 1] : -1;

  // If no sections are open, show the default logo
  if (lastOpenedIndex === -1) {
    const defaultSrc = svgPaths[0];

    if (svgImage.getAttribute("href") !== defaultSrc) {
      svgImage.style.opacity = "0";
      setTimeout(() => {
        svgImage.setAttribute("href", defaultSrc);
        svgImage.style.opacity = "1";
      }, 500);
    } else {
      svgImage.style.opacity = "1";
    }
    return;
  }

  // Get the corresponding SVG path (+1 because 0 is reserved for the default logo)
  const newSrc = svgPaths[lastOpenedIndex + 1];

  if (svgImage.getAttribute("href") !== newSrc) {
    svgImage.style.opacity = "0";
    setTimeout(() => {
      svgImage.setAttribute("href", newSrc);
      svgImage.style.opacity = "1";
    }, 500);
  } else {
    svgImage.style.opacity = "1";
  }
}

// Function to update the openDetailsStack correctly
function handleDetailToggle(event) {
  const detail = event.target;
  const index = detailSections.findIndex(selector => document.querySelector(selector) === detail);

  if (detail.open) {
    openDetailsStack.push(index);
  } else {
    // Remove all occurrences of this index (if opened multiple times somehow)
    openDetailsStack = openDetailsStack.filter(i => i !== index);
  }

  updateSVGFromOpenDetail();
}

// Attach event listeners to each <details> element
detailSections.forEach(selector => {
  const detail = document.querySelector(selector);
  if (detail) {
    detail.addEventListener("toggle", handleDetailToggle);
  }
});

// Initialize with default logo
updateSVGFromOpenDetail();
