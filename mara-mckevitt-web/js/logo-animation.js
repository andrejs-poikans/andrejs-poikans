
const svgPaths = [
    "../mara-mckevitt-web/resources/logo-new/logo.svg",
    "../mara-mckevitt-web/resources/logo-new/logo1.svg",
    "../mara-mckevitt-web/resources/logo-new/logo2.svg",
  ];
  
let currentSvgIndex = 0;

const image = document.querySelector("svg image");
const svgSwitcher = document.getElementById("svgSwitcher");
  
svgSwitcher.addEventListener("click", () => {
    currentSvgIndex = (currentSvgIndex + 1) % svgPaths.length;
    image.setAttribute("href", svgPaths[currentSvgIndex]);
    image.style.opacity = "1";
    // Optionally, re-apply the transform logic if needed
    updateImageTransform();
});


// adjusted center scaling code

document.addEventListener("DOMContentLoaded", () => {
  const image = document.querySelector("svg image");

  const sections = [
      { name: "projects", weight: 8 },
      { name: "events", weight: 2 },
      { name: "press", weight: 30 },
      { name: "writing", weight: 15 },
      { name: "contact", weight: 16 }
  ];


  const allowedScales = [1, 1/2, 1/3, 1/5];

  // Build a list of all valid scale pairs (excluding both being 1/3 or 1/5)
  const validScaleCombos = [];
  for (let sx of allowedScales) {
      for (let sy of allowedScales) {
          const isBadCombo = (sx === 1/5 || sx === 1/3) && (sy === 1/5 || sy === 1/3);
          if (!isBadCombo) {
              validScaleCombos.push({ scaleX: sx, scaleY: sy });
          }
      }
  }

    /*
  const allowedScales = [1, 1/2, 1/4, 1/8];

  const validScaleCombos = [];
  for (let sx of allowedScales) {
      for (let sy of allowedScales) {
          const isBadCombo = (sx === 1/4 || sx === 1/8) && (sy === 1/4 || sy === 1/8) ;
          if (!isBadCombo) {
              validScaleCombos.push({ scaleX: sx, scaleY: sy });
          }
      }
  }
  */
  // Total valid combinations: map to translation grid positions
  const totalCombos = validScaleCombos.length;

  function getOpenSections() {
      return sections.filter(({ name }) => {
          const detail = document.querySelector(`.${name} details`);
          return detail && detail.open;
      });
  }

  function updateImageTransform() {
      const openSections = getOpenSections();
      const count = openSections.length;

      if (count === 0) {
          image.style.transform = `translate(0%, 0%) scale(1, 1)`;
          return;
      }

      // Create a key from section weights
      const key = openSections.reduce((sum, s) => sum + s.weight, 0);

      // Get transform from valid scale combos (wrap if overflow)
      const index = key % totalCombos;
      const { scaleX, scaleY } = validScaleCombos[index];

      // Canvas size: 100% width and height
      const canvasWidth = 100; // 100% width
      const canvasHeight = 100; // 100% height

      // Bounding box size after scaling
      const scaledWidth = scaleX * canvasWidth;
      const scaledHeight = scaleY * canvasHeight;

      // Calculate max possible translation to keep the SVG within bounds
      const maxTranslateX = (canvasWidth - scaledWidth) / 2;
      const maxTranslateY = (canvasHeight - scaledHeight) / 2;

      // Pseudo-random placement seeded by key (no longer go out of bounds)
      const tX = (key * 7 % 100) / 100 * maxTranslateX;
      const tY = (key * 11 % 100) / 100 * maxTranslateY;

      // Apply transform with center-origin scaling, ensuring the SVG stays within bounds
      image.style.transformOrigin = "center center"; // Center of the SVG
      image.style.transform = `
          translate(${tX}%, ${tY}%) 
          scale(${scaleX}, ${scaleY})
      `;
  }

  // Attach event listeners
  sections.forEach(({ name }) => {
      const detail = document.querySelector(`.${name} details`);
      if (detail) {
          detail.addEventListener("toggle", updateImageTransform);
      }
  });

  updateImageTransform(); // Initial state
});


// old working code
/*
document.addEventListener("DOMContentLoaded", () => {
    const image = document.querySelector("svg image");
  
    const sections = [
      { name: "projects", weight: 8 },
      { name: "events", weight: 2 },
      { name: "press", weight: 30 },
      { name: "writing", weight: 15 },
      { name: "contact", weight: 16 }
    ];
  
    const allowedScales = [1, 1/2, 1/3, 1/5,];
  
    // Build a list of all valid scale pairs (excluding both being 1/3 or 1/5)
    const validScaleCombos = [];
    for (let sx of allowedScales) {
      for (let sy of allowedScales) {
        const isBadCombo = (sx === 1/5 || sx === 1/3) && (sy === 1/5 || sy === 1/3);
        if (!isBadCombo) {
          validScaleCombos.push({ scaleX: sx, scaleY: sy });
        }
      }
    }
  
    // Total valid combinations: map to translation grid positions
    const totalCombos = validScaleCombos.length;
  
    function getOpenSections() {
      return sections.filter(({ name }) => {
        const detail = document.querySelector(`.${name} details`);
        return detail && detail.open;
      });
    }
  
    function updateImageTransform() {
      const openSections = getOpenSections();
      const count = openSections.length;
  
      if (count === 0) {
        image.style.transform = `translate(0%, 0%) scale(1, 1)`;
        return;
      }
  
      // Create a key from section weights
      const key = openSections.reduce((sum, s) => sum + s.weight, 0);
  
      // Get transform from valid scale combos (wrap if overflow)
      const index = key % totalCombos;
      const { scaleX, scaleY } = validScaleCombos[index];
  
      // Translation: shift based on scale to keep inside canvas
      const maxTranslateX = 1 - scaleX;
      const maxTranslateY = 1 - scaleY;
  
      // Pseudo-random placement seeded by key
      const tX = (key * 7 % 100) / 100 * maxTranslateX;
      const tY = (key * 11 % 100) / 100 * maxTranslateY;
  
      image.style.transform = `
        translate(${tX * 100}%, ${tY * 100}%) 
        scale(${scaleX}, ${scaleY})
      `;
    }
  
    // Attach event listeners
    sections.forEach(({ name }) => {
      const detail = document.querySelector(`.${name} details`);
      if (detail) {
        detail.addEventListener("toggle", updateImageTransform);
      }
    });
  
    updateImageTransform(); // Initial state
  });
  */


/*
document.addEventListener("DOMContentLoaded", () => {
    const image = document.querySelector("svg image");
  
    const sections = [
      { name: "projects", weight: 1 },
      { name: "events", weight: 2 },
      { name: "press", weight: 4 },
      { name: "writing", weight: 8 },
      { name: "contact", weight: 16 }
    ];
  
    function getOpenSections() {
      return sections.filter(({ name }) => {
        const detail = document.querySelector(`.${name} details`);
        return detail && detail.open;
      });
    }
  
    function updateImageTransform() {
      const openSections = getOpenSections();
      const count = openSections.length;
  
      if (count === 0) {
        image.style.transform = `translate(0%, 0%) scale(1, 1)`;
        return;
      }
  
      // Use a grid layout (5x5) for placement
      const gridSize = 5;
      const cellSize = 1 / gridSize;
  
      // Generate a unique index based on open sections
      const stateKey = openSections.reduce((acc, s) => acc + s.weight, 0);
  
      // Use stateKey to choose a grid cell
      const cellIndex = stateKey % (gridSize * gridSize);
      const xIndex = cellIndex % gridSize;
      const yIndex = Math.floor(cellIndex / gridSize);
  
      // Scaling based on number of open sections (more open = smaller image)
      const scaleDivisor = [2, 3, 5, 7][count - 1] || 1; // keep prime-based options
      const scale = 1 / scaleDivisor;
  
      // Translate based on which grid cell we picked
      const translateX = xIndex * cellSize;
      const translateY = yIndex * cellSize;
  
      // Adjust to ensure image stays within bounds:
      const adjustedX = translateX * (1 - scale);
      const adjustedY = translateY * (1 - scale);
  
      image.style.transform = `
        translate(${adjustedX * 100}%, ${adjustedY * 100}%)
        scale(${scale}, ${scale})
      `;
    }
  
    // Attach event listeners
    sections.forEach(({ name }) => {
      const detail = document.querySelector(`.${name} details`);
      if (detail) {
        detail.addEventListener("toggle", updateImageTransform);
      }
    });
  
    updateImageTransform(); // Initial update
  });
  */
  
/*
document.addEventListener("DOMContentLoaded", () => {
  const image = document.querySelector("svg image");
  const detailGroups = [
    ".projects details",
    ".events details",
    ".press details",
    ".writing details",
    ".contact details"
  ];

  function updateImageTransform() {
    let openCount = 0;

    for (let selector of detailGroups) {
      const detail = document.querySelector(selector);
      if (detail && detail.open) {
        openCount++;
      }
    }

    // Avoid divide-by-zero
    const divisor = openCount || 1;

    // Example: base logic - scale inversely to number of opens, translate based on number too
    const xTranslate = (100 / 5) * (5 - openCount); // move left as more open
    const yTranslate = (100 / 5) * openCount;       // move down as more open
    const xScale = 1 / divisor;
    const yScale = divisor / 5;

    image.style.transform = `
      translate(${xTranslate}%, ${yTranslate}%)
      scale(${xScale}, ${yScale})
    `;
  }

  // Attach listener to all details
  for (let selector of detailGroups) {
    const detail = document.querySelector(selector);
    if (detail) {
      detail.addEventListener("toggle", updateImageTransform);
    }
  }

  updateImageTransform(); // Initial call
});
*/



// document.addEventListener("DOMContentLoaded", function () {
//     const svgImage = document.querySelector("svg image");
//     const logoDiv = document.querySelector(".logo");

//     // Define probability grid positions using subdivisions of 2, 3, and 5
//     const gridPositions = [
//         { x: 0, y: 0, width: 100 * (1/5), height: 100 * (4/5) },
//         { x: 100 * (3/5), y: 0, width: 100 * (2/5), height: 100 * (2/5) },
//         { x: 100 * (1/5), y: 0, width: 100 * (2/5), height: 100 * (1/5) },
//         { x: 100 * (1/5), y: 100 * (1/5), width: 100 * (2/5), height: 100 * (3/5) },
//         { x: 0, y: 100 * (4/5), width: 100 * (1/5), height: 100 * (1/5) },
//         { x: 100 * (1/5), y: 100 * (4/5), width: 100 * (2/5), height: 100 * (1/5) },
//         { x: 100 * (3/5), y: 100 * (2/5), width: 100 * (2/5), height: 100 * (3/5) }
//     ];

//     function moveImageAway(event) {
//         const rect = logoDiv.getBoundingClientRect();
//         const cursorX = ((event.clientX - rect.left) / rect.width) * 100;
//         const cursorY = ((event.clientY - rect.top) / rect.height) * 100;

//         // Filter grid positions that are farthest from cursor and stay within bounds
//         let possibleMoves = gridPositions.filter(pos => 
//             (Math.abs(pos.x - cursorX) > 20 || Math.abs(pos.y - cursorY) > 20)
//         );

//         // If no valid far moves, use the entire grid
//         if (possibleMoves.length === 0) {
//             possibleMoves = gridPositions;
//         }

//         // Choose a random position from valid moves
//         const newPosition = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        
//         // Move and resize the image while keeping it within bounds
//         svgImage.style.width = newPosition.width + "%";
//         svgImage.style.height = newPosition.height + "%";
//         svgImage.setAttribute("x", Math.min(100 - newPosition.width, newPosition.x) + "%");
//         svgImage.setAttribute("y", Math.min(100 - newPosition.height, newPosition.y) + "%");
//     }
    
//     svgImage.addEventListener("mouseenter", moveImageAway);
// });


// document.addEventListener("DOMContentLoaded", function () {
//     const svgImage = document.querySelector("svg image");
//     const logoDiv = document.querySelector(".logo");
    
//     // Apply smoother animation using CSS transforms
//     // svgImage.style.transition = "transform 0.5s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out";
    
//     const gridPositions = [
//         { x: 0, y: 0, width: 100 * (1/5), height: 100 * (4/5) },
//         { x: 100 * (3/5), y: 0, width: 100 * (2/5), height: 100 * (2/5) },
//         { x: 100 * (1/5), y: 0, width: 100 * (2/5), height: 100 * (1/5) },
//         { x: 100 * (1/5), y: 100 * (1/5), width: 100 * (2/5), height: 100 * (3/5) },
//         { x: 0, y: 100 * (4/5), width: 100 * (1/5), height: 100 * (1/5) },
//         { x: 100 * (1/5), y: 100 * (4/5), width: 100 * (2/5), height: 100 * (1/5) },
//         { x: 100 * (3/5), y: 100 * (2/5), width: 100 * (2/5), height: 100 * (3/5) }
//     ];

//     let lastPosition = null;

//     function moveImageAway(event) {
//         const rect = logoDiv.getBoundingClientRect();
//         const cursorX = ((event.clientX - rect.left) / rect.width) * 100;
//         const cursorY = ((event.clientY - rect.top) / rect.height) * 100;

//         // Sort positions by distance from cursor, closest first
//         let sortedMoves = gridPositions
//             .filter(pos => !lastPosition || (pos.x !== lastPosition.x || pos.y !== lastPosition.y))
//             .sort((a, b) => {
//                 const distA = Math.hypot(a.x - cursorX, a.y - cursorY);
//                 const distB = Math.hypot(b.x - cursorX, b.y - cursorY);
//                 return distA - distB;
//             });

//         // Select the closest valid move from the sorted list, ensuring no immediate repetition
//         let newPosition = sortedMoves.find(pos => !lastPosition || (pos.x !== lastPosition.x || pos.y !== lastPosition.y));
        
//         if (newPosition) {
//             svgImage.style.transform = `translate(${newPosition.x}%, ${newPosition.y}%)`;
//             svgImage.style.width = newPosition.width + "%";
//             svgImage.style.height = newPosition.height + "%";
//             lastPosition = newPosition;
//         }
//     }
    
//     svgImage.addEventListener("mouseenter", moveImageAway);
// });

