document.body.addEventListener('touchend', () => {
  const video = document.getElementById('stayAwake');
  video.play().catch(console.error);
});