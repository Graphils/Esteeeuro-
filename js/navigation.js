// Navigation: scroll shadow on the navbar, dark mode toggle, back-to-top button
// Relies on $ and $$ from utils.js, so load utils.js before this file.

// Dark mode toggle
$('#theme').onclick = () => document.body.classList.toggle('dark');

// Navbar background + back-to-top visibility on scroll
window.addEventListener('scroll', () => {
  $('#nav').classList.toggle('scrolled', scrollY > 35);
  $('#back').classList.toggle('show', scrollY > 500);
});

$('#back').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });