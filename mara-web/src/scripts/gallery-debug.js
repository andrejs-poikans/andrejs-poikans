// const post = document.querySelector('.post');
// const details = post?.querySelector('details');

// if (details) {
//   const imgElements = details.querySelectorAll('img');

//   const images = Array.from(imgElements).map(img => ({
//     src: img.getAttribute('src'),
//     desc: img.getAttribute('alt') || img.getAttribute('title') || 'No description'
//   }));

//   console.log(images);
// } else {
//   console.log('No <details> element found inside .post');
// }


document.querySelectorAll('.post details').forEach(details => {
  details.addEventListener('toggle', () => {
    if (details.open) {
      // Remove 'open' class from all other details
      document.querySelectorAll('.post details.open').forEach(d => {
        if (d !== details) {
          d.classList.remove('open');
          d.open = false; // Close others
        }
      });

      details.classList.add('open');

      // Get images inside the opened details
      const imgElements = details.querySelectorAll('img');
      const images = Array.from(imgElements).map(img => ({
        src: img.getAttribute('src'),
        desc: img.getAttribute('alt') || img.getAttribute('title') || 'No description'
      }));

      console.log(images);
    } else {
      // If closed, remove 'open' class
      details.classList.remove('open');
      console.log([]); // Nothing is selected
    }
  });
});
