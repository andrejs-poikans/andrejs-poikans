document.addEventListener("DOMContentLoaded", function () {

      const detailsList = document.querySelectorAll("details");
  
      // const menu = document.getElementById("menu");
      const logo = document.getElementById("logo");
      // menu.appendChild(logo);

      const svg = document.getElementById("m");

      detailsList.forEach(details => {
        const summary = details.querySelector("summary");
        const listItems = details.querySelectorAll("ul li");
  
        summary.addEventListener("click", () => {
          setTimeout(() => {
            if (details.open) {
              summary.classList.add("opened");
              details.classList.add("show-items");
              svg.classList.add("opened");
              logo.classList.add("opened");
              // svg.style.display = "none"
  
              // Reset classes first
              listItems.forEach(li => li.classList.remove("visible"));
  
              // Force reflow to restart transitions
              void details.offsetWidth;
  
              // Apply visible class with stagger (20ms per item)
              listItems.forEach((li, index) => {
                setTimeout(() => {
                  li.classList.add("visible");
                }, index * 50);
              });
  
            } else {
              summary.classList.remove("opened");
              details.classList.remove("show-items");
              // svg.style.display = "block";
  
              listItems.forEach(li => li.classList.remove("visible"));

              const anyOpen = Array.from(detailsList).some(d => d.open);
              if (!anyOpen) {
                svg.classList.remove("opened");
                logo.classList.remove("opened");
              }
            }
          }, 50); // Slight delay to let <details> state update
        });
      });

    //   if (window.innerWidth <= 1024) {
    //     // When a details is open, close all other details.
    //     function handleDetailToggle(event) {
    //       // We are only interested in details being opened.
    //       // Also, without the guard below, we'd run into an infinite loop.
    //       if (!event.target.open) return;
    //       for (let details of detailsList) {
    //         details.open = details === event.target;
    //       }
    //     }

    //     // Add toggle listeners.
    //     for (let details of detailsList) {
    //       details.addEventListener("toggle", handleDetailToggle);
    //     }
    // }
  });
  
  