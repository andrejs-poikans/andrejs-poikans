document.addEventListener("DOMContentLoaded", function () {
    // Handle elements with class "img-button"
    document.querySelectorAll('.post details summary').forEach(el => {
      const sup = document.createElement('sup');
      sup.textContent = '(img)';
      el.appendChild(sup);
    });

    // Handle elements with class "forthcoming"
    document.querySelectorAll('.post p em').forEach(el => {
      const sup = document.createElement('sup');
      sup.textContent = '(forthcoming)';
      el.parentNode.insertBefore(sup, el.nextSibling);
    });
  });