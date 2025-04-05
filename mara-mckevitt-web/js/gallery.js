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

function fadeIn(element, duration = 100) {
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


document.addEventListener("DOMContentLoaded", () => {
    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.id = "close";
    closeBtn.textContent = "✕";
    closeBtn.className = "close-button";
    closeBtn.style.display = "none";
    closeBtn.onclick = closeImg;
    document.body.appendChild(closeBtn);

    // Prev button
    const prevBtn = document.createElement("button");
    prevBtn.className = "nav-button prev";
    prevBtn.innerHTML = "&lt;";
    prevBtn.style.display = "none";
    prevBtn.onclick = () => changeImg(-1);
    document.body.appendChild(prevBtn);

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.className = "nav-button next";
    nextBtn.innerHTML = "&gt;";
    nextBtn.style.display = "none";
    nextBtn.onclick = () => changeImg(1);
    document.body.appendChild(nextBtn);

    // Canvas
    const canvas = document.createElement("canvas");
    canvas.id = "img-canvas";
    canvas.style.display = "none";
    canvas.onclick = closeImg;
    document.body.appendChild(canvas);
});



const images = [
    { src: "../mara-mckevitt-web/resources/images/val.png", desc: "val" },
    { src: "../mara-mckevitt-web/resources/images/val1.jpg", desc: "screenshot 1" },
    { src: "../mara-mckevitt-web/resources/images/val2.jpg", desc: "screenshot 2" }
];


document.addEventListener("DOMContentLoaded", () => {
    // --- previously created: canvas, close, prev, next ---

    // 1. Create container
    const container = document.createElement("div");
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

    // 5. Put it together
    displayDiv.appendChild(img);
    displayDiv.appendChild(desc);
    container.appendChild(displayDiv);
    document.body.appendChild(container);
});



let currentIndex = 0;

function openImg(index) {
   currentIndex = index;

    const container = document.querySelector(".img-container");
    const canvas = document.getElementById("img-canvas");
    const closeBtn = document.getElementById("close");
    const prevBtn = document.querySelector(".nav-button.prev");
    const nextBtn = document.querySelector(".nav-button.next");

    fadeIn(container);
    canvas.style.display = "block";
    closeBtn.style.display = "block";
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";

    updateImg();
}

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

function closeImg() {
    const container = document.querySelector(".img-container");

    fadeOut(container);
    document.getElementById("img-canvas").style.display = "none";
    document.getElementById("close").style.display = "none";
    document.querySelector(".nav-button.prev").style.display = "none";
    document.querySelector(".nav-button.next").style.display = "none";
}

// esc support
window.onkeyup = function (event) {
    if (event.keyCode == 27) {
        document.getElementById("img-canvas").style.display = "none";
        document.getElementById("close").style.display = "none";
        document.querySelector(".nav-button.prev").style.display = "none";
        document.querySelector(".nav-button.next").style.display = "none";
        document.querySelector(".img-container").style.display = "none";
    }
}



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
