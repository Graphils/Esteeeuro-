// Navigation: scroll shadow on the navbar, dark mode toggle, back-to-top button
// Relies on $ and $$ from utils.js, so load utils.js before this file.

// Dark mode toggle
$('#theme').onclick = () => document.body.classList.toggle('dark');

// Navbar background + back-to-top visibility on scroll
let scrollIdleTimer;
window.addEventListener('scroll', () => {
  $('#nav').classList.toggle('scrolled', scrollY > 35);
  $('#back').classList.toggle('show', scrollY > 500);

  const mobileBook = $('.mobile-book');
  mobileBook.classList.add('show');
  clearTimeout(scrollIdleTimer);
  scrollIdleTimer = setTimeout(() => mobileBook.classList.remove('show'), 1200);
});

$('#back').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

// Hamburger menu (mobile nav dropdown)
const menuBtn = $('.menu');
const linksPanel = $('.links');
menuBtn.addEventListener('click', () => {
  const open = linksPanel.classList.toggle('open');
  menuBtn.textContent = open ? '✕' : '☰';
});
$$('.links a').forEach((a) => a.addEventListener('click', () => {
  linksPanel.classList.remove('open');
  menuBtn.textContent = '☰';
}));