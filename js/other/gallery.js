
import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe/dist/photoswipe-lightbox.esm.js';


const lightbox = new PhotoSwipeLightbox({
  gallery: '#my-gallery',
  children: 'a',
  showHideAnimationType: 'fade',
  pswpModule: () => import('https://unpkg.com/photoswipe'),
});

lightbox.init();