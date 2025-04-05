//   // Get all elements with the class 'hover-text'
//   const hoverElements = document.querySelectorAll('.text');
//   const displayArea = document.getElementById('name');

//   // Add hover effect
//   hoverElements.forEach(element => {
//     element.addEventListener('mouseenter', () => {
//       // Show the hovered text in display area with animation
//       displayArea.textContent = element.textContent;
//       displayArea.classList.add('visible');
//     });

//     element.addEventListener('mouseleave', () => {
//       // Hide the display area when mouse leaves
//       displayArea.classList.remove('visible');
//     });
//   });


    // Get all parent elements
    const parentElements = document.querySelectorAll('.text');
    const displayArea = document.getElementById('name');

    // Add hover effect
    parentElements.forEach(element => {
      const smallText = element.querySelector('small'); // Try to find the <small> inside the parent
      const body = element.querySelector('body'); 

      element.addEventListener('mouseenter', () => {
        // If <small> exists, display its text, otherwise show default text
        if (smallText) {
          displayArea.textContent = smallText.textContent;
        } else {
          displayArea.textContent = 'Mara McKevitt'; // Default text when no <small> is present
        }
        displayArea.classList.add('visible');
      });

      element.addEventListener('mouseleave', () => {
        // Hide the display area when mouse leaves
        displayArea.classList.remove('visible');
        displayArea.textContent = 'Mara McKevitt'; 
      });
    });