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
// const yearFilter = document.getElementById('yearFilter');
// for (let year = 2022; year <= 2025; year++) {
//     const option = document.createElement('option');
//     option.value = year;
//     option.textContent = year;
//     yearFilter.appendChild(option);
// }

// // Event listener for the dropdown selection
// yearFilter.addEventListener('change', () => {
//     const selectedYear = yearFilter.value; // Get the selected year
//     if (selectedYear) {
//         const targetId = `${selectedYear}`; // Construct the ID based on the year
//         const targetElement = document.getElementById(targetId);

//         if (targetElement) {
//             targetElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' }); // Smooth scroll
//         } else {
//             alert(`No section found for the year ${selectedYear}.`);
//         }
//     }
// });


/// Wait for the DOM content to load before starting the script
// document.addEventListener('DOMContentLoaded', function() {
//     console.log('DOM fully loaded. Checking for .datetag elements...');
//     initializeDropdownWhenReady();
// });

// function initializeDropdownWhenReady() {
//     const titleElements = document.querySelectorAll('.datetag');
//     const yearFilter = document.getElementById('yearFilter');

//     // Check if the dropdown exists
//     if (!yearFilter) {
//         console.error('Dropdown element with ID "yearFilter" not found!');
//         return;
//     }

//     // Check if any .datetag elements are found
//     if (titleElements.length > 0) {
//         console.log(`Found ${titleElements.length} elements with the class "datetag".`);

//         // Populate the dropdown with IDs from the .datetag elements
//         titleElements.forEach((titleElement, index) => {
//             const dateId = titleElement.id;
//             console.log(`Processing element ${index + 1}: ID = "${dateId}"`);

//             if (dateId) {
//                 const option = document.createElement('option');
//                 option.value = dateId;
//                 option.textContent = dateId;
//                 yearFilter.appendChild(option);
//                 console.log(`Added option for date ID: ${dateId}`);
//             } else {
//                 console.warn(`Element ${index + 1} with class "datetag" has no ID.`);
//             }
//         });

//         // Event listener for dropdown selection
//         yearFilter.addEventListener('change', () => {
//             const selectedDate = yearFilter.value;
//             console.log(`Dropdown changed. Selected date: ${selectedDate}`);

//             if (selectedDate) {
//                 const targetElement = document.getElementById(selectedDate);
//                 if (targetElement) {
//                     console.log(`Scrolling to element with ID: ${selectedDate}`);
//                     targetElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
//                 } else {
//                     console.error(`No section found for the date ${selectedDate}.`);
//                     alert(`No section found for the date ${selectedDate}.`);
//                 }
//             } else {
//                 console.warn('No date selected.');
//             }
//         });
//     } else {
//         console.warn('No elements with the class "datetag" found. Retrying in 1 second...');
//         // Retry after 1 second if elements are not found
//         setTimeout(initializeDropdownWhenReady, 1000);
//     }
// }


// Wait for the DOM content to load before starting the script
// document.addEventListener('DOMContentLoaded', function() {
//     console.log('DOM fully loaded. Checking for .datetag elements...');
//     initializeDropdownWhenReady();
// });

// function initializeDropdownWhenReady() {
//     const datetagElements = document.querySelectorAll('.datetag');
//     const yearFilter = document.getElementById('yearFilter');

//     if (!yearFilter) {
//         console.error('Dropdown element with ID "yearFilter" not found!');
//         return;
//     }

//     if (datetagElements.length > 0) {
//         console.log(`Found ${datetagElements.length} elements with the class "datetag".`);

//         // Populate the dropdown with IDs from the .datetag elements
//         datetagElements.forEach((datetagElement, index) => {
//             const dateId = datetagElement.id;
//             console.log(`Processing element ${index + 1}: ID = "${dateId}"`);

//             if (dateId) {
//                 const option = document.createElement('option');
//                 option.value = dateId;
//                 option.textContent = dateId;
//                 yearFilter.appendChild(option);
//                 console.log(`Added option for date ID: ${dateId}`);
//             } else {
//                 console.warn(`Element ${index + 1} with class "datetag" has no ID.`);
//             }
//         });

//         // Event listener for dropdown selection
//         yearFilter.addEventListener('change', () => {
//             const selectedDate = yearFilter.value;
//             console.log(`Dropdown changed. Selected date: ${selectedDate}`);

//             if (selectedDate) {
//                 const targetElement = document.getElementById(selectedDate);
//                 if (targetElement) {
//                     console.log(`Scrolling to element with ID: ${selectedDate}`);

//                     // Smooth scroll to center the element
//                     targetElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });

//                     // Ensure the element is fully visible after scrolling
//                     setTimeout(() => ensureElementInView(targetElement), 600); // Adjust timeout based on scroll speed
//                 } else {
//                     console.error(`No section found for the date ${selectedDate}.`);
//                     alert(`No section found for the date ${selectedDate}.`);
//                 }
//             } else {
//                 console.warn('No date selected.');
//             }
//         });
//     } else {
//         console.warn('No elements with the class "datetag" found. Retrying in 1 second...');
//         setTimeout(initializeDropdownWhenReady, 1000);
//     }
// }

// // Ensure the element is fully visible in the viewport
// function ensureElementInView(element) {
//     const rect = element.getBoundingClientRect();
//     const isFullyVisible =
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth);

//     if (!isFullyVisible) {
//         console.log('Adjusting scroll position to ensure full visibility.');
//         element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
//     }
// }


// Wait until the entire page has fully loaded
window.addEventListener('load', function () {
    console.log('Window fully loaded. Checking for .datetag elements...');
    initializeDropdownWhenReady();
});

function initializeDropdownWhenReady() {
    const dateTags = document.querySelectorAll('.datetag');
    const yearFilter = document.getElementById('yearFilter');
    const datePattern = /^\d{2}\.\d{2}\.\d{4}$/; // Date format: DD.MM.YYYY

    if (!yearFilter) {
        console.error('Dropdown element with ID "yearFilter" not found!');
        return;
    }

    if (dateTags.length > 0) {
        console.log(`Found ${dateTags.length} elements with the class "datetag".`);

        dateTags.forEach((dateTag, index) => {
            const dateId = dateTag.id;

            // Validate the ID matches the date format
            if (dateId && datePattern.test(dateId)) {
                const option = document.createElement('option');
                option.value = dateId;
                option.textContent = dateId;
                yearFilter.appendChild(option);
            } else if (dateId) {
                console.warn(`Element ${index + 1} with ID "${dateId}" does not match the date format and was excluded.`);
            }
        });

        yearFilter.addEventListener('change', () => {
            const selectedDate = yearFilter.value;
            if (selectedDate) {
                const targetElement = document.getElementById(selectedDate);
                if (targetElement) {
                    console.log(`Scrolling to element with ID: ${selectedDate}`);

                    // Smooth scroll to center the element
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });

                    // Ensure the element is fully visible after scrolling
                    setTimeout(() => ensureElementInView(targetElement), 600); // Adjust timeout based on scroll speed                    
                } else {
                    alert(`No section found for the date ${selectedDate}.`);
                }
            }
        });
    } else {
        console.warn('No elements with the class "datetag" found. Retrying in 1 second...');
        setTimeout(initializeDropdownWhenReady, 1000);
    }
}

// Ensure the element is fully visible in the viewport
function ensureElementInView(element) {
const rect = element.getBoundingClientRect();
const isFullyVisible =
rect.top >= 0 &&
rect.left >= 0 &&
rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
rect.right <= (window.innerWidth || document.documentElement.clientWidth);

if (!isFullyVisible) {
console.log('Adjusting scroll position to ensure full visibility.');
element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
}
}