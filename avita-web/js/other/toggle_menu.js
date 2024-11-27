function toggleMenu() {
    let links = document.getElementById("links");
    let categories = document.getElementById("categories");
    let theme = document.getElementById("mobile-theme");
    let arena = document.getElementById("arena");
    let bio = document.getElementById("bio");

    // Check if the element is currently visible
    if (links.style.display === "block") {
        theme.className = theme.className = "inactive";
        links.style.display = "none";
        categories.style.display = "none";
        arena.style.display = "grid";
        bio.style.display = "block";
    } else {
        theme.className = theme.className = "active";
        links.style.display = "block";
        arena.style.display = "none";
    }
}

function toggleMenuExtended() {
    let links = document.getElementById("links");
    let categories = document.getElementById("categories");
    let theme = document.getElementById("mobile-theme");
    let arena = document.getElementById("arena");
    let workTitlesDiv = document.getElementById('workTitles');

    let titleButton = document.getElementsByClassName("category-button");

    // Check if the element is currently visible
    if (links.style.display === "none") {
        links.style.display = "block";
        arena.style.display = "none";
        categories.style.display = "block";
        workTitlesDiv.style.display = "block";
    } else {
        links.style.display = "none";
        categories.style.display = "none";
        arena.style.display = "grid";
        workTitlesDiv.style.display = "none";
    }

    let allInactive = true;  // Assume all buttons are inactive

    for (var i = 0; i < titleButton.length; i++) {
        // If any button contains the "active" class, set the flag to false
        if (titleButton[i].classList.contains("active")) {
            allInactive = false;
            break;  // No need to check further once one active button is found
        }
    }
    // Redirect only if all buttons are inactive
    if (allInactive) {
        window.location.assign("/..");
    }
}

// on load functions
function onLoad() {
    let theme = document.getElementById("mobile-theme");
    let links = document.getElementById("links");
    let categories = document.getElementById("categories");
    let arena = document.getElementById("arena");
    // let bio = document.getElementById("bio");

    if (!theme.classList.contains("active")) {
        links.style.display = "block";
        arena.style.display = "none";
        // bio.style.display = "none";
        categories.style.display = "block";
    }
}

window.addEventListener("load", onLoad);