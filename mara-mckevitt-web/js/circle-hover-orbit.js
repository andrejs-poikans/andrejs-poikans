document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".menu");
    const hoverText = document.querySelector(".info .hover-text");
    const orbitText = document.getElementById("orbit").querySelector("a");

    let lastHoveredElement = null;
    let orbiting = false;
    let orbitAnimationFrame;
    let angle = 45;

    // Ensure the hover text is visible and full height
    hoverText.style.display = "flex";
    hoverText.style.alignItems = "center";
    hoverText.style.width = "calc(100%/8*0.5)";

    // Keep orbitText inside its flexbox cell
    orbitText.style.position = "relative";


    // Orbit toggle on click
    orbitText.addEventListener("click", function () {
        orbiting = !orbiting;
        if (orbiting) {
            startOrbit();
        } else {
            cancelAnimationFrame(orbitAnimationFrame);
            orbitText.style.position = "relative";
            orbitText.style.left = "0";
            orbitText.style.top = "0";
            if (lastHoveredElement) updateHoverTextPosition(lastHoveredElement);
        }
    });

    function startOrbit() {
        const orbitBox = hoverText.getBoundingClientRect();
        const menuBox = menu.getBoundingClientRect();
        const centerX = orbitBox.width / 2;
        const centerY = menuBox.height / 2;
        const radiusX = orbitBox.width / 2; // Smaller radius horizontally
        const radiusY = menuBox.height / 2;

        function animate() {
            angle += 0.1;
            const x = centerX + radiusX * Math.cos(angle);
            const y = centerY + radiusY * Math.sin(angle);

            orbitText.style.position = "absolute";
            orbitText.style.left = `${x}px`;
            orbitText.style.top = `${y}px`;

            orbitAnimationFrame = requestAnimationFrame(animate);
        }

        animate();
    }

    // Position the text at the first summary initially
    const firstItem = menu.querySelector("summary");
    if (firstItem) {
        updateHoverTextPosition(firstItem);
        lastHoveredElement = firstItem;
    }

    menu.addEventListener("mouseover", (event) => {
        if (orbiting) return;

        let target = event.target;
        if (target.tagName === "LI") {
            const summary = target.closest("details").querySelector("summary");
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
        if (!orbiting && lastHoveredElement) {
            updateHoverTextPosition(lastHoveredElement);
        }
    });

    function updateHoverTextPosition(element) {
        const rect = element.getBoundingClientRect();
        const menuRect = menu.getBoundingClientRect();

        hoverText.style.transition = "top 0.5s ease-out";

        orbitText.style.position = "relative";
        orbitText.style.left = "0";
        orbitText.style.top = "0";
    }
});
