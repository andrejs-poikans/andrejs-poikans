/*
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
*/

  const weatherMap = {
    sunny: '☀',
    clear: '☀',
    cloudy: '☁',
    overcast: '☁',
    rain: '🌧',
    showers: '🌧',
    snow: '❅',
    thunder: '↯',
    storm: '↯'
  };

  async function fetchWeather() {
    const resp = await fetch('https://wttr.in/Riga?format=j1');
    if (!resp.ok) return null;
    const json = await resp.json();
    const current = json.current_condition?.[0]?.weatherDesc?.[0]?.value.toLowerCase() || '';
    return current;
  }

  async function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const tz = now.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ').pop();
    document.getElementById('time-display').textContent = `${hh}:${mm}:${ss} (${tz})`;

    const condition = await fetchWeather();
    let symbol = '';
    for (let key in weatherMap) {
      if (condition.includes(key)) {
        symbol = weatherMap[key];
        break;
      }
    }

    // Check for night time in Riga (local hours 21 to 4)
    const hour = now.toLocaleString('en-US', { timeZone: 'Europe/Riga', hour: '2-digit', hour12: false });
    const isNight = (hour >= 21 || hour <= 4);
    const stars = (condition.includes('clear') && isNight) ? ' ✦' : '';

    document.getElementById('weather-display').textContent = symbol + ' ' + condition + stars;
  }

  setInterval(updateClock, 1000);
  updateClock();
