// document.getElementById('filterButton').addEventListener('click', () => {
//     const inputYear = document.getElementById('yearFilter').value.trim(); // Get the entered year
//     if (inputYear) {
//         const targetId = `${inputYear}`; // Construct the ID based on the year
//         const targetElement = document.getElementById(targetId);

//         if (targetElement) {
//             targetElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' }); // Smooth scroll
//         } else {
//             alert(`No section found for the year ${inputYear}.`);
//         }
//     } else {
//         alert('Please enter a valid year.');
//     }
// });


// // Populate the dropdown menu with year options
// const yearFilter = document.getElementById('yearFilter');
// for (let year = 2022; year <= 2025; year++) {
//     const option = document.createElement('option');
//     option.value = year;
//     option.textContent = year;
//     yearFilter.appendChild(option);
// }

// // Event listener for the Go button
// document.getElementById('filterButton').addEventListener('click', () => {
//     const selectedYear = yearFilter.value; // Get the selected year
//     if (selectedYear) {
//         const targetId = `${selectedYear}`; // Construct the ID based on the year
//         const targetElement = document.getElementById(targetId);

//         if (targetElement) {
//             targetElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center'}); // Smooth scroll
//         } else {
//             alert(`No section found for the year ${selectedYear}.`);
//         }
//     } else {
//         alert('Please select a year.');
//     }
// });


// Populate the dropdown menu with year options
const yearFilter = document.getElementById('yearFilter');
for (let year = 2022; year <= 2025; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
}

// Event listener for the dropdown selection
yearFilter.addEventListener('change', () => {
    const selectedYear = yearFilter.value; // Get the selected year
    if (selectedYear) {
        const targetId = `${selectedYear}`; // Construct the ID based on the year
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' }); // Smooth scroll
        } else {
            alert(`No section found for the year ${selectedYear}.`);
        }
    }
});