function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.body.style.transition = "background-color 2s";
  }

function toggleDarkMode() {
    let isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    document.body.style.transition = "background-color 2s";
  }
  
  // On page load
  document.addEventListener('DOMContentLoaded', (event) => {

    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
    }
  });