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

// Hamburger menu (mobile nav drawer)
const menuBtn = $('.menu');
const linksPanel = $('.links');
const navBackdrop = $('.nav-backdrop');

function closeMenu() {
  linksPanel.classList.remove('open');
  navBackdrop.classList.remove('show');
  menuBtn.textContent = '☰';
  document.body.classList.remove('menu-open');
}

menuBtn.addEventListener('click', () => {
  const open = linksPanel.classList.toggle('open');
  navBackdrop.classList.toggle('show', open);
  menuBtn.textContent = open ? '✕' : '☰';
  document.body.classList.toggle('menu-open', open);
});
$$('.links a').forEach((a) => a.addEventListener('click', closeMenu));
navBackdrop.addEventListener('click', closeMenu);