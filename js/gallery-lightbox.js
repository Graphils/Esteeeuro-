// Photo gallery lightbox: click any gallery photo (or "Open gallery") to view it full-screen,
// then step through photos with the on-screen arrows, or the keyboard.
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = $('#lightbox');
  const box = lightbox.querySelector('.box');

  box.insertAdjacentHTML(
    'beforeend',
    '<button class="lbnav lbprev" aria-label="Previous photo">←</button>' +
    '<button class="lbnav lbnext" aria-label="Next photo">→</button>' +
    '<span class="count"></span>'
  );

  const photos = [...$$('#gallerygrid img')];
  const mainImg = $('#lightimg');
  const count = box.querySelector('.count');
  let photoIndex = 0;

  const show = (index) => {
    photoIndex = (index + photos.length) % photos.length;
    mainImg.src = photos[photoIndex].src;
    mainImg.alt = photos[photoIndex].alt;
    count.textContent = `${photoIndex + 1} / ${photos.length}`;
    lightbox.classList.add('show');
  };

  photos.forEach((photo, index) => photo.parentElement.addEventListener('click', () => show(index)));
  $('#open-gallery').addEventListener('click', () => show(0));
  box.querySelector('.lbprev').addEventListener('click', () => show(photoIndex - 1));
  box.querySelector('.lbnext').addEventListener('click', () => show(photoIndex + 1));

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('show')) return;
    if (event.key === 'ArrowLeft') show(photoIndex - 1);
    if (event.key === 'ArrowRight') show(photoIndex + 1);
  });
});