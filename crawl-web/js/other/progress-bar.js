// // When the user scrolls the page, execute myFunction
// window.onscroll = function() {myFunction()};

// function myFunction() {
//   var winScroll = document.body.scrollLeft || document.documentElement.scrollLeft;
//   var width = document.documentElement.scrollWidth - document.documentElement.clientWidth;
//   var scrolled = (winScroll / width) * 100;
//   document.getElementById("myBar").style.width = scrolled + "%";
// }

// // When the user scrolls the page, execute myFunction
// window.onscroll = function() { myFunction() };

// function myFunction() {
//   // Get the total scroll width
//   var winScroll = document.body.scrollLeft || document.documentElement.scrollLeft;
//   var width = document.documentElement.scrollWidth - document.documentElement.clientWidth;

//   // Calculate the scroll progress as a percentage
//   var scrolled = (winScroll / width) * 100;

//   // Get all the progress circles
//   var circles = document.querySelectorAll('.progress-circle');
//   var totalCircles = circles.length;

//   // Calculate how many circles should be filled based on scroll percentage
//   var filledCircles = Math.round((scrolled / 100) * totalCircles);

//   // Loop through each circle and update its state (filled or not)
//   circles.forEach((circle, index) => {
//     if (index < filledCircles) {
//       circle.style.backgroundColor = 'blue'; // Filled circle
//     } else {
//       circle.style.backgroundColor = 'lightgray'; // Empty circle
//     }
//   });
// }

// When the user scrolls the page, execute myFunction
window.onscroll = function() { myFunction() };

function myFunction() {
  // Get the total scrollable width (document width minus window width)
  var docWidth = document.documentElement.scrollWidth - window.innerWidth;
  var scrollPosition = window.scrollX || document.documentElement.scrollLeft;

  // Calculate the scroll position percentage
  var scrolled = (scrollPosition / docWidth) * 100;

  // Get all the progress circles
  var circles = document.querySelectorAll('.progress-circle');
  var totalCircles = circles.length;

  // Calculate the index of the circle to highlight based on the scroll position
  var circleToHighlight = Math.floor((scrolled / 100) * (totalCircles - 1));

  // Loop through each circle and highlight the one corresponding to the scroll position
  circles.forEach((circle, index) => {
    if (index === circleToHighlight) {
      circle.style.backgroundColor = 'black'; // Highlight the current circle
    } else {
      circle.style.backgroundColor = 'lightgray'; // Keep other circles gray
    }
  });
}
