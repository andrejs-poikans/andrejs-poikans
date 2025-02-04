// Select elements
const toggleButton = document.querySelector(".toggle");
const header = document.querySelector("header");
const menu = document.querySelector(".menu");
const slide = document.querySelector(".slide");
const body = document.querySelector("body");
const progress = document.querySelector(".progress-container");
const filter = document.querySelector(".filter");

const logo = document.querySelector(".logo");

const sc = document.querySelector(".scripture");
const mc = document.querySelector(".menu-circle");


// Function to toggle menu and header
function toggleMenu() {
  if (header.classList.contains("open")) {
    // Close menu
    header.classList.remove("open");
    menu.classList.remove("open");
    slide.classList.remove("open");
    sc.classList.remove("open");
    mc.classList.remove("open");
    body.style.overflow = 'scroll';
    progress.style.visibility = 'visible';
    filter.style.visibility = 'visible';
    logo.style.opacity = '1.0';
  } else {
    // Open menu
    header.classList.add("open");
    menu.classList.add("open");
    slide.classList.add("open");
    sc.classList.add("open");
    mc.classList.add("open");
    body.style.overflow = 'hidden';
    progress.style.visibility = 'hidden';
    filter.style.visibility = 'hidden';
    logo.style.opacity = '0.5';
  }
}

// Add event listeners
toggleButton.addEventListener("click", toggleMenu); // Toggle menu on button click

// Close menu when clicking outside of the menu (on the header background)
header.addEventListener("click", (event) => {
  // Check if the click is outside the menu
  if (header.classList.contains("open") && !menu.contains(event.target) && !toggleButton.contains(event.target)) {
    header.classList.remove("open");
    menu.classList.remove("open");
    slide.classList.remove("open");
    sc.classList.remove("open");
    mc.classList.remove("open");
    body.style.overflow = 'scroll';
    progress.style.visibility = 'visible';
    filter.style.visibility = 'visible';
    logo.style.opacity = '1.0';
  }
});
