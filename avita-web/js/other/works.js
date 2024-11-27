function toggleWorks() {
    let categories = document.getElementById("categories");
    let bio = document.getElementById("bio");
    let works = document.getElementById("works-button");
    let home = document.getElementById("home");


    // Check if the element is currently visible
    if (categories.style.display === "block") {
        works.className = works.className = "inactive";
        home.className = home.className = "active";
        // If visible, hide it
        categories.style.display = "none";
        bio.style.display = "block";
    } else {
        works.className = works.className = "active";
        home.className = home.className = "inactive";
        // If hidden, show it
        categories.style.display = "block";
        bio.style.display = "none";
    }
}