function loadImages() {
  const imageBoxes = document.querySelectorAll('.img-box');

  imageBoxes.forEach(box => {
    if (box.querySelector('img')) return; // Already handled

    const thumbUrl = box.dataset.thumb;
    const largeUrl = box.dataset.large;

    const thumbImg = new Image();
    thumbImg.src = thumbUrl;
    thumbImg.classList.add('blurred');

    thumbImg.onload = () => {
      const aspectRatio = thumbImg.naturalWidth / thumbImg.naturalHeight;

      // TEMPORARILY set .img-box width to match expected width
      box.style.width = `${aspectRatio * box.offsetHeight}px`;

      // Swap placeholder with blurred thumb
      box.querySelector('.img-placeholder')?.replaceWith(thumbImg);

      // Load large image
      const largeImg = new Image();
      largeImg.src = largeUrl;
      
            largeImg.onload = () => {
            thumbImg.replaceWith(largeImg);

            // ✅ Add class after load to trigger fade-in
            largeImg.classList.add('loaded');

            // ✅ Remove the temporary width restriction
            box.style.width = '';
            };
    };
  });
}

