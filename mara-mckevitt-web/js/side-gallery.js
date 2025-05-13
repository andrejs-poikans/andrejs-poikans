// Function to open the image in the large display
/*function openImg(imageSrc) {
    document.getElementById("close").style.display = "block";
    // Show the image container
    document.getElementsByClassName("img-container")[0].style.display = "block";
    // Set the correct image source to the large display image
    document.getElementById("large-display-img").src = imageSrc;
    document.getElementById("img-canvas").style.display = "block";
}

// Function to close the image view
function closeImg() {
    document.getElementById("close").style.display = "none";
    // Hide the image container
    document.getElementsByClassName("img-container")[0].style.display = "none";
    document.getElementById("img-canvas").style.display = "none";
}
*/

function fadeIn(element, duration = 300) {
    element.style.opacity = 0;
    element.style.display = "flex"; // make sure it's visible and centered
    let last = performance.now();

    function tick(now) {
        let delta = (now - last) / duration;
        let newOpacity = Math.min(parseFloat(element.style.opacity) + delta, 1);
        element.style.opacity = newOpacity;
        last = now;
        if (newOpacity < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

function fadeOut(element, duration = 300) {
    let opacity = 1;
    let last = performance.now();

    function tick(now) {
        let delta = (now - last) / duration;
        opacity -= delta;
        element.style.opacity = Math.max(opacity, 0);
        last = now;
        if (opacity > 0) {
            requestAnimationFrame(tick);
        } else {
            element.style.display = "none";
        }
    }

    requestAnimationFrame(tick);
}


// document.addEventListener("DOMContentLoaded", () => {
//     // Close button
//     const closeBtn = document.createElement("button");
//     closeBtn.id = "close";
//     closeBtn.textContent = "✕";
//     closeBtn.className = "close-button";
//     closeBtn.style.display = "none";
//     closeBtn.onclick = closeImg;

//     // Prev button
//     const prevBtn = document.createElement("button");
//     prevBtn.className = "nav-button prev";
//     prevBtn.innerHTML = "&lt;";
//     prevBtn.style.display = "none";
//     prevBtn.onclick = () => changeImg(-1);
//     document.body.appendChild(prevBtn);

//     // Next button
//     const nextBtn = document.createElement("button");
//     nextBtn.className = "nav-button next";
//     nextBtn.innerHTML = "&gt;";
//     nextBtn.style.display = "none";
//     nextBtn.onclick = () => changeImg(1);
//     document.body.appendChild(nextBtn);
// });



const images = [
    { src: "../mara-mckevitt-web/resources/images/Val3.jpeg", desc: "val" },
    { src: "../mara-mckevitt-web/resources/images/show.jpeg", desc: "exhibition still" },
    { src: "../mara-mckevitt-web/resources/images/still.jpeg", desc: "video" },
    { src: "../mara-mckevitt-web/resources/images/val1.jpg", desc: "screenshot 1" },
    { src: "../mara-mckevitt-web/resources/images/val2.jpg", desc: "screenshot 2" }
];


document.addEventListener("DOMContentLoaded", () => {
    // --- previously created: close, prev, next ---

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.id = "close";
    // closeBtn.textContent = "✕";
    closeBtn.textContent = "(close)";
    closeBtn.className = "close-button";
    closeBtn.onclick = closeImg;

    // Prev button
    const prevBtn = document.createElement("button");
    prevBtn.className = "nav-button prev";
    prevBtn.innerHTML = "&lt;";
    prevBtn.onclick = () => changeImg(-1);

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.className = "nav-button next";
    nextBtn.innerHTML = "&gt;";
    nextBtn.onclick = () => changeImg(1);

    //btn wrapper
    const btnWrap = document.createElement("div");
    btnWrap.className = "btnWrap";
    btnWrap.style.display = "none";

    const filler = document.createElement("div");
    filler.className = "filler";
    filler.style.width = "100%";

    // 1. Create container
    const container = document.getElementById("right");
    container.className = "img-container";
    container.style.display = "none";

    // 2. Create image wrapper
    const displayDiv = document.createElement("div");
    displayDiv.className = "display-img";

    // 3. Create main image
    const img = document.createElement("img");
    img.id = "large-display-img";
    img.style.maxWidth = "100%";
    img.src = ""; // Empty initially

    // 4. Create image description
    const desc = document.createElement("p");
    desc.className = "img-description";
    desc.id = "image-desc";

    // canvas
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    canvas.style.zIndex = "-1";
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas.style.position = "absolute";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.backgroundColor = "white";
    // canvas.style.opacity = 1;



    // 5. Put it together
    container.appendChild(canvas);
    displayDiv.appendChild(img);
    displayDiv.appendChild(desc);
    container.appendChild(displayDiv);
    btnWrap.appendChild(prevBtn);
    btnWrap.appendChild(nextBtn);
    btnWrap.appendChild(filler);
    btnWrap.appendChild(closeBtn);
    container.appendChild(btnWrap);
    document.body.appendChild(container);
});


// document.addEventListener("DOMContentLoaded", function () {
//     const buttons = document.querySelectorAll('.img-button');
//     buttons.forEach(button => {
//       const sup = document.createElement('sup');
//       sup.textContent = '(gallery)';
//       button.parentNode.insertBefore(sup, button.nextSibling);
//     });
//   });


let currentIndex = 0;

let activeButton = null; // stores the currently clicked img-button

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".img-button");
    buttons.forEach((button, index) => {
        button.addEventListener("click", (e) => {
            e.preventDefault(); // just in case
            openImg(index, button); // pass button
        });
    });
});

function openImg(index, button) {
    currentIndex = index;
    const container = document.querySelector(".img-container");
    const btnWrap = document.querySelector(".btnWrap");

    // Disable the clicked button
    if (button) {
        button.disabled = true;
        activeButton = button; // store it for later
    }

    updateImg();
    fadeIn(container);
    btnWrap.style.display = "flex";
    if (window.innerWidth <= 1024) {
        btnWrap.style.color = "black";
    }
}

// function openImg(index) {
//     currentIndex = index;

//     const container = document.querySelector(".img-container");
//     const btnWrap = document.querySelector(".btnWrap");

//     fadeIn(container);
//     btnWrap.style.display = "flex";
//     updateImg();
// }

function updateImg() {
    document.getElementById("large-display-img").src = images[currentIndex].src;
    document.getElementById("image-desc").textContent = images[currentIndex].desc;
}

function changeImg(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    updateImg();
}

// function closeImg() {
//     const container = document.querySelector(".img-container");

//     fadeOut(container);
//     document.querySelector(".btnWrap").style.display = "none";
// }



function closeImg() {
    const container = document.querySelector(".img-container");

    fadeOut(container);
    document.querySelector(".btnWrap").style.display = "none";

    // Re-enable previously active button
    if (activeButton) {
        activeButton.disabled = false;
        activeButton = null;
    }
}

function closeImgCanvas() {
    const container = document.querySelector(".img-container");

    fadeOut(container);
    document.querySelector(".btnWrap").style.display = "none";

    // Re-enable previously active button
    if (activeButton) {
        activeButton.disabled = false;
        activeButton = null;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.canvas').forEach(el => {
      el.addEventListener('click', closeImgCanvas);
    });
});



// const detailsList = document.querySelectorAll("details");

// function handleDetailToggle(event) {
//     // Only do something if a <details> was closed
//     if (!event.target.open) {
//         const anyOpen = Array.from(detailsList).some(d => d.open);
//         if (!anyOpen) {
//             closeImg(); // Close the gallery only if no <details> is open
//         }
//     }
// }

// // Attach the event listener
// detailsList.forEach(details => {
//     details.addEventListener("toggle", handleDetailToggle);
// });


// esc support
// window.onkeyup = function (event) {
//     if (event.keyCode == 27) {
//         document.querySelector(".btnWrap").style.display = "none";
//         document.querySelector(".img-container").style.display = "none";
//     }
// }


// for mobile swipe function

let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > 50) { // Adjust this for sensitivity
        if (swipeDistance < 0) {
            changeImg(1);  // Swipe left → next image
        } else {
            changeImg(-1); // Swipe right → previous image
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".img-container");

    container.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });
});
