// Wait for the DOM content to load before starting the check
document.addEventListener('DOMContentLoaded', function() {
    // Immediately check for elements inside the #channel-description div
    initializeMarqueeWhenReady();
});

function initializeMarqueeWhenReady() {
    const container = document.getElementById('channel-description');

    // Check if the container has the required elements
    if (container && container.querySelectorAll('span, a').length > 0) {
        // Initialize the marquee if the container has <span> or <a> elements
        initializeMarquee();
    } else {
        // If no elements found, wait and try again after 1 second
        setTimeout(initializeMarqueeWhenReady, 1000);
    }
}

function initializeMarquee() {
    setupMarquee('latest-news'); // You may want to change 'latest-news' to a related container if necessary
    rotateMarquee(marqueeContainers);
}

function getObjectWidth(obj) {
    if (obj.offsetWidth) return obj.offsetWidth;
    if (obj.clip) return obj.clip.width;
    return 0;
}

const marqueeContainers = [];

function setupMarquee(id) {
    const container = document.getElementById(id);
    const firstItem = container.getElementsByTagName("span")[0];
    const itemWidth = getObjectWidth(firstItem) + 5; // Include spacing
    const fullWidth = getObjectWidth(container);
    const textContent = firstItem.innerHTML; // Use the content of the first span
    const height = container.style.height;

    // container.onmouseout = () => rotateMarquee(marqueeContainers);
    // container.onmouseover = () => cancelAnimationFrame(marqueeContainers[0].animationID);


    if (window.innerWidth > 767) {
        container.onmouseout = () => rotateMarquee(marqueeContainers);
        container.onmouseover = () => cancelAnimationFrame(marqueeContainers[0].animationID);
    }


    // Clear existing content but retain container
    container.innerHTML = "";

    container.items = [];
    const maxItems = Math.ceil(fullWidth / itemWidth) + 1;

    for (let i = 0; i < maxItems; i++) {
        const item = document.createElement("span"); // Use <span> instead of <div>
        item.innerHTML = textContent;
        item.style.position = "absolute";
        item.style.left = itemWidth * i + "px";
        item.style.width = itemWidth + "px";
        item.style.height = height;
        container.appendChild(item);
        container.items.push(item);
    }

    marqueeContainers.push(container);
}

function rotateMarquee(containers) {
    if (!containers) return;

    for (let j = containers.length - 1; j >= 0; j--) {
        const maxItems = containers[j].items.length;

        for (let i = 0; i < maxItems; i++) {
            const itemStyle = containers[j].items[i].style;
            itemStyle.left = parseInt(itemStyle.left, 10) - 1 + "px"; // Move left by 1px
        }

        const firstItemStyle = containers[j].items[0].style;

        // If the first item goes out of bounds, reset its position
        if (parseInt(firstItemStyle.left, 10) + parseInt(firstItemStyle.width, 10) < 0) {
            const shiftedItem = containers[j].items.shift(); // Remove the first item
            shiftedItem.style.left = parseInt(shiftedItem.style.left) + parseInt(shiftedItem.style.width) * maxItems + "px";
            containers[j].items.push(shiftedItem); // Add it to the end
        }
    }

    // Request the next animation frame
    containers[0].animationID = requestAnimationFrame(() => rotateMarquee(containers));
}
