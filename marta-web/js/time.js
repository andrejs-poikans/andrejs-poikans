    function updateClock() {
      const now = new Date();

      // Format hours, minutes, seconds
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      // Get time zone abbreviation (e.g., 'CET', 'EEST')
      const timeZone = now.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ').pop();

      // Format date as dd-mm-yyyy
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-based
      const year = now.getFullYear();

      const timeString = `${hours}:${minutes}:${seconds} (${timeZone})`;
      const dateString = `${day}-${month}-${year}`;

      const target = document.getElementById('circadian');
      if (target) {
        target.innerHTML = `
          <p>${timeString}</p>
          <p>${dateString}</p>
        `;
      }
    }
        // Initial call and interval
    updateClock();
    setInterval(updateClock, 1000);