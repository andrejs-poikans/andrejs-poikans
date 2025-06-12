// Function to fade in an element
function fadeIn(element, duration = 300) {
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

// Function to fade out an element
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

// Initialize gallery elements
document.addEventListener("DOMContentLoaded", () => {
    // Create gallery container
    const container = document.createElement("div");
    container.className = "img-container";
    container.style.display = "none";

    // Create image wrapper
    const displayDiv = document.createElement("div");
    displayDiv.className = "display-img";

    // Create main image
    const img = document.createElement("img");
    img.id = "large-display-img";
    img.style.maxWidth = "100%";
    img.src = "";

    // Create image description
    const desc = document.createElement("p");
    desc.className = "img-description";
    desc.id = "image-desc";

    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    canvas.style.zIndex = "-1";
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas.style.position = "absolute";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.backgroundColor = "white";

    // Create navigation buttons
    const closeBtn = document.createElement("button");
    closeBtn.id = "close";
    closeBtn.textContent = "(close)";
    closeBtn.className = "close-button";
    closeBtn.onclick = closeImg;

    const prevBtn = document.createElement("button");
    prevBtn.className = "nav-button prev";
    prevBtn.innerHTML = "&lt;";
    prevBtn.onclick = () => changeImg(-1);

    const nextBtn = document.createElement("button");
    nextBtn.className = "nav-button next";
    nextBtn.innerHTML = "&gt;";
    nextBtn.onclick = () => changeImg(1);

    const btnWrap = document.createElement("div");
    btnWrap.className = "btnWrap";
    btnWrap.style.display = "none";
    btnWrap.appendChild(prevBtn);
    btnWrap.appendChild(nextBtn);
    btnWrap.appendChild(closeBtn);

    // Assemble gallery
    displayDiv.appendChild(img);
    displayDiv.appendChild(desc);
    container.appendChild(canvas);
    container.appendChild(displayDiv);
    container.appendChild(btnWrap);
    document.body.appendChild(container);

    // Add event listeners to details elements
        document.addEventListener("DOMContentLoaded", () => {
        // 1. Get all buttons meant to open galleries
        const buttons = document.querySelectorAll(".img-button");

        buttons.forEach(button => {
            button.addEventListener("click", () => {
            const label = button.textContent.trim().toLowerCase();

            // 2. Find the matching <summary> inside a <details>
            const detailsElements = document.querySelectorAll("details.wp-block-details");

            for (const details of detailsElements) {
                const summary = details.querySelector("summary");

                if (summary && summary.textContent.trim().toLowerCase().includes(label)) {
                // 3. Open the <details> block and scroll to it
                details.open = true;

                // 4. Scroll smoothly into view
                details.scrollIntoView({ behavior: "smooth", block: "start" });

                break;
                }
            }
            });
        });
        });


    // Add event listener to canvas for closing gallery
    canvas.addEventListener("click", closeImg);

    // Add touch event listeners for swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });

    function handleGesture() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance < 0) {
                changeImg(1);
            } else {
                changeImg(-1);
            }
        }
    }

    let currentIndex = 0;
    let currentImages = [];

    function openImg(images) {
        currentImages = images;
        currentIndex = 0;
        updateImg();
        fadeIn(container);
        btnWrap.style.display = "flex";
    }

    function updateImg() {
        img.src = currentImages[currentIndex].src;
        desc.textContent = currentImages[currentIndex].desc;
    }

    function changeImg(direction) {
        currentIndex += direction;
        if (currentIndex < 0) {
            currentIndex = currentImages.length - 1;
        } else if (currentIndex >= currentImages.length) {
            currentIndex = 0;
        }
        updateImg();
    }

    function closeImg() {
        fadeOut(container);
        btnWrap.style.display = "none";
    }
});
