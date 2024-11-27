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
        arena.style.display = "inline-block";
        bio.style.display = "block";
    } else {
        theme.className = theme.className = "active";
        links.style.display = "block";
        arena.style.display = "none";
    }
}

function toggleMenuNews() {
    let links = document.getElementById("links");
    let theme = document.getElementById("mobile-theme");
    let arena = document.getElementById("arena");

    // Check if the element is currently visible
    if (links.style.display === "block") {
        theme.className = theme.className = "inactive";
        links.style.display = "none";
        arena.style.display = "inline-block";
    } else {
        theme.className = theme.className = "active";
        links.style.display = "block";
        arena.style.display = "none";
    }
}