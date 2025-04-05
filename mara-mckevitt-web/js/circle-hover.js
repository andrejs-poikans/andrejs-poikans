/*
document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".menu");
    const hoverText = document.createElement("div");
    hoverText.classList.add("hover-text");
    hoverText.textContent = "*"; // Replace with any desired text
    document.body.appendChild(hoverText);

    let lastHoveredElement = null;

    // Ensure the text is always visible
    hoverText.style.display = "block";

    // Position the text at the first item initially
    const firstItem = menu.querySelector("summary");
    if (firstItem) {
        updateHoverTextPosition(firstItem);
        lastHoveredElement = firstItem;
    }

    menu.addEventListener("mouseover", (event) => {
        let target = event.target;
        if (target && (target.tagName === "SUMMARY")) {
            lastHoveredElement = target;
            updateHoverTextPosition(target);
        }
    });

    document.addEventListener("mouseleave", () => {
        if (lastHoveredElement) {
            updateHoverTextPosition(lastHoveredElement);
        }
    });

    function updateHoverTextPosition(element) {
        const rect = element.getBoundingClientRect();
        hoverText.style.transition = "top 1s ease-out, left 1s ease-out";
        hoverText.style.left = `${rect.right + 10}px`;
        hoverText.style.top = `${rect.top + window.scrollY}px`; // Adjust for scrolling
    }
});
*/

/*
document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".menu");
    const hoverText = document.createElement("div");
    hoverText.classList.add("hover-text");
    hoverText.textContent = "*"; // Replace with any desired text
    document.body.appendChild(hoverText);

    let lastHoveredElement = null;

    // Ensure the text is always visible
    hoverText.style.display = "block";

    // Position the text at the first item initially
    const firstItem = menu.querySelector("summary");
    if (firstItem) {
        updateHoverTextPosition(firstItem);
        lastHoveredElement = firstItem;
    }

    menu.addEventListener("mouseover", (event) => {
        let target = event.target;
        if (target && (target.tagName === "SUMMARY")) {
            lastHoveredElement = target;
            updateHoverTextPosition(target);
        }
    });

    document.addEventListener("mouseleave", () => {
        if (lastHoveredElement) {
            updateHoverTextPosition(lastHoveredElement);
        }
    });

    function updateHoverTextPosition(element) {
        const rect = element.getBoundingClientRect();
        hoverText.style.transition = "top 1s ease-out, left 1s ease-out";
        hoverText.style.left = `${rect.right + 10}px`;
        hoverText.style.top = `${rect.top + window.scrollY}px`; // Adjust for scrolling
    }
});
*/


document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".menu");
    const hoverText = document.querySelector(".info .hover-text"); // Select the existing hover text div inside info

    let lastHoveredElement = null;

    // Ensure the hover text is visible and full height
    hoverText.style.display = "flex";
    hoverText.style.height = "100%";

    // Position the text at the first summary initially
    const firstItem = menu.querySelector("summary");
    if (firstItem) {
        updateHoverTextPosition(firstItem);
        lastHoveredElement = firstItem;
    }

    menu.addEventListener("mouseover", (event) => {
        let target = event.target;
        if (target.tagName === "LI") {
            const summary = target.closest("details").querySelector("summary"); // Find associated summary
            if (summary) {
                lastHoveredElement = summary;
                updateHoverTextPosition(summary);
            }
        } else if (target.tagName === "SUMMARY") {
            lastHoveredElement = target;
            updateHoverTextPosition(target);
        }
    });

    document.addEventListener("mouseleave", () => {
        if (lastHoveredElement) {
            updateHoverTextPosition(lastHoveredElement);
        }
    });


function updateHoverTextPosition(element) {
    const rect = element.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect(); // Get menu's position
    const offsetY = rect.top - menuRect.top; // Adjust relative to menu

    hoverText.style.transition = "top 1s ease-out";
    hoverText.style.top = `${offsetY}px`;
}
});

