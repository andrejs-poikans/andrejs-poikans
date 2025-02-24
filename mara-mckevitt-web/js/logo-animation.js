document.addEventListener("DOMContentLoaded", function () {
    const svgImage = document.querySelector("svg image");
    const logoDiv = document.querySelector(".logo");

    // Define probability grid positions using subdivisions of 2, 3, and 5
    const gridPositions = [
        { x: 0, y: 0, width: 100 * (1/5), height: 100 * (4/5) },
        { x: 100 * (3/5), y: 0, width: 100 * (2/5), height: 100 * (2/5) },
        { x: 100 * (1/5), y: 0, width: 100 * (2/5), height: 100 * (1/5) },
        { x: 100 * (1/5), y: 100 * (1/5), width: 100 * (2/5), height: 100 * (3/5) },
        { x: 0, y: 100 * (4/5), width: 100 * (1/5), height: 100 * (1/5) },
        { x: 100 * (1/5), y: 100 * (4/5), width: 100 * (2/5), height: 100 * (1/5) },
        { x: 100 * (3/5), y: 100 * (2/5), width: 100 * (2/5), height: 100 * (3/5) }
    ];

    function moveImageAway(event) {
        const rect = logoDiv.getBoundingClientRect();
        const cursorX = ((event.clientX - rect.left) / rect.width) * 100;
        const cursorY = ((event.clientY - rect.top) / rect.height) * 100;

        // Filter grid positions that are farthest from cursor and stay within bounds
        let possibleMoves = gridPositions.filter(pos => 
            (Math.abs(pos.x - cursorX) > 20 || Math.abs(pos.y - cursorY) > 20)
        );

        // If no valid far moves, use the entire grid
        if (possibleMoves.length === 0) {
            possibleMoves = gridPositions;
        }

        // Choose a random position from valid moves
        const newPosition = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        
        // Move and resize the image while keeping it within bounds
        svgImage.style.width = newPosition.width + "%";
        svgImage.style.height = newPosition.height + "%";
        svgImage.setAttribute("x", Math.min(100 - newPosition.width, newPosition.x) + "%");
        svgImage.setAttribute("y", Math.min(100 - newPosition.height, newPosition.y) + "%");
    }
    
    svgImage.addEventListener("mouseenter", moveImageAway);
});


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

