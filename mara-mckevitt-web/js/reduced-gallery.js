// Fading animation
function fadeIn(element, duration = 100) {
    element.style.opacity = 0;
    element.style.display = "flex";
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

// Image data
const images = [
    { src: "../mara-mckevitt-web/resources/images/val.png", desc: "val" },
    { src: "../mara-mckevitt-web/resources/images/val1.jpg", desc: "screenshot 1" },
    { src: "../mara-mckevitt-web/resources/images/val2.jpg", desc: "screenshot 2" }
];

let galleryWrapper = null;
let closeBtn = null;
let galleryVisible = false;

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("right");

    // Create and append the gallery wrapper
    galleryWrapper = document.createElement("div");
    galleryWrapper.className = "gallery-wrapper";
    galleryWrapper.style.display = "none";
    galleryWrapper.style.zIndex = "1";

    container.appendChild(galleryWrapper);

    // Populate images
    images.forEach((imgData) => {
        const img = document.createElement("img");
        img.src = imgData.src;
        img.alt = imgData.desc;
        img.style.flexShrink = "0";
        img.style.transition = "opacity 0.3s ease";
        galleryWrapper.appendChild(img);
    });

    // Create and append close button
    closeBtn = document.createElement("button");
    closeBtn.id = "close";
    closeBtn.textContent = "✕";
    closeBtn.className = "close-button";
    closeBtn.style.display = "none";
    closeBtn.style.position = "fixed";
    closeBtn.onclick = toggleGallery;

    container.appendChild(closeBtn);

    // Hook up existing gallery button
    const galleryBtn = document.querySelector(".img-button");
    galleryBtn.onclick = toggleGallery;
});

function toggleGallery() {
    if (!galleryWrapper) return;

    if (!galleryVisible) {
        fadeIn(galleryWrapper);
        closeBtn.style.display = "block";
        galleryVisible = true;
    } else {
        fadeOut(galleryWrapper);
        closeBtn.style.display = "none";
        galleryVisible = false;
    }
}

// ESC support
window.addEventListener("keyup", (event) => {
    if (event.key === "Escape" && galleryVisible) {
        toggleGallery();
    }
});
