
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

let index = 0;
let images = [];
let currentIndex = 0;

document.querySelectorAll('.post details').forEach(details => {
  details.addEventListener('toggle', () => {
    if (details.open) {
      // Remove 'open' class from all other details
      document.querySelectorAll('.post details.open').forEach(d => {
        if (d !== details) {
          d.classList.remove('open');
          d.open = false; // Close others
        }
      });

      // Get images inside the opened details
      const imgElements = details.querySelectorAll('img');
      images = Array.from(imgElements).map(img => ({
        src: img.getAttribute('src'),
        desc: img.getAttribute('alt') || img.getAttribute('title'),
        alt: img.getAttribute('alt') || "no-alt"
      }));

    //   console.log(images);

      if (images.length < 0) {
            closeImg();
      } else {
            currentIndex = 0;
            openImg(index); // ✅ safe to call now
      }

    } 
    // else {
    //   console.log([]); // Nothing is selected
    // }
  });
});

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


function openImg(index) {
  const container = document.querySelector(".img-container");
  const btnWrap = document.querySelector(".btnWrap");

  closeAllDetailsInPosts();
  updateImg();
  fadeIn(container);
  btnWrap.style.display = "flex";

    // arrow add and remove function
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
            // ⬇️ Show/hide next/prev buttons
    if (images.length <= 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
    }
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


function closeAllDetailsInPosts() {
  document.querySelectorAll('.post details').forEach(details => {
    details.classList.remove('open');  // Remove class
    details.open = false;               // Close the details element
  });
}

function closeImg() {
    const container = document.querySelector(".img-container");

    fadeOut(container);
    document.querySelector(".btnWrap").style.display = "none";
    closeAllDetailsInPosts();
}

function closeImgCanvas() {
    const container = document.querySelector(".img-container");

    fadeOut(container);
    document.querySelector(".btnWrap").style.display = "none";
    closeAllDetailsInPosts();
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.canvas').forEach(el => {
      el.addEventListener('click', closeImgCanvas);
    });
    closeAllDetailsInPosts();
});


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


