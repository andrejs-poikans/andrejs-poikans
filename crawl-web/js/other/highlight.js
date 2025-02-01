function setupReordering(ulId) {
    const ulElement = document.getElementById(ulId);
    if (!ulElement) {
        console.error(`No element found with ID: ${ulId}`);
        return;
    }

    let currentlyHighlighted = []; // Keep track of currently highlighted elements

    ulElement.addEventListener('click', (event) => {
        // Check if a <li> element with an ID like "block-{index}" was clicked
        const clickedItem = event.target.closest('li');
        if (!clickedItem || !clickedItem.id.startsWith('block-')) return;

        const match = clickedItem.id.match(/-(\d+)$/);
        if (!match) return;

        const index = match[1]; // Extract the numeric index from the ID

        // Find the corresponding elements
        const descriptionItem = document.getElementById(`description-${index}`);
        const imgItem = document.getElementById(`img-${index}`);

        if (!descriptionItem || !imgItem) {
            console.warn(`Elements with IDs description-${index} or img-${index} not found.`);
            return;
        }

        // Remove underline from previously highlighted elements
        currentlyHighlighted.forEach(item => {
            item.style.textDecoration = '';
        });
        currentlyHighlighted = []; // Clear the list of highlighted elements

        // Add underline to the clicked block and its description
        [clickedItem, descriptionItem].forEach(item => {
            item.style.textDecoration = 'underline';
            currentlyHighlighted.push(item); // Track these as currently highlighted
        });

        // Move the img-{index} element to the bottom of the list
        ulElement.appendChild(imgItem);
    });
}

// Example usage: Pass the ID of the <ul> element
setupReordering('channel-blocks'); // Replace 'my-ul' with your <ul> element's ID
