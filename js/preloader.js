// Loading screen: shown until the page (including images) has fully loaded.
// A small minimum display time keeps the animation from flashing on fast connections.
window.addEventListener('load', () => {
  const preloader = $('#preloader');
  if (!preloader) return;
  setTimeout(() => {
    preloader.classList.add('hide');
    document.body.classList.remove('loading');
    setTimeout(() => preloader.remove(), 700);
  }, 350);
});