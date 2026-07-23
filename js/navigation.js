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
const linksClose = $('.links-close');

function openMenu() {
  linksPanel.classList.add('open');
  navBackdrop.classList.add('show');
  document.documentElement.classList.add('menu-open');
  document.body.classList.add('menu-open');
}

function closeMenu() {
  linksPanel.classList.remove('open');
  navBackdrop.classList.remove('show');
  document.documentElement.classList.remove('menu-open');
  document.body.classList.remove('menu-open');
}

menuBtn.addEventListener('click', () => {
  linksPanel.classList.contains('open') ? closeMenu() : openMenu();
});
linksClose.addEventListener('click', closeMenu);
navBackdrop.addEventListener('click', closeMenu);
$$('.links a').forEach((a) => a.addEventListener('click', closeMenu));