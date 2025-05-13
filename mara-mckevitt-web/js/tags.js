document.addEventListener("DOMContentLoaded", function () {
    // Handle elements with class "img-button"
    document.querySelectorAll('.img-button').forEach(el => {
      const sup = document.createElement('sup');
      sup.textContent = '(gallery)';
      el.parentNode.insertBefore(sup, el.nextSibling);
    });

    // Handle elements with class "forthcoming"
    document.querySelectorAll('.forthcoming').forEach(el => {
      const sup = document.createElement('sup');
      sup.textContent = '(forthcoming)';
      el.parentNode.insertBefore(sup, el.nextSibling);
    });
  });