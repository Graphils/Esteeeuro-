// Hero image slideshow: swaps the single static hero photo for a rotating set of slides
document.addEventListener('DOMContentLoaded', () => {
  const heroImages = ['photo-01.jpg', 'photo-05.jpg', 'photo-09.jpg', 'photo-13.jpg', 'photo-17.jpg'];

  const imageLayer = $('.hero-img');
  imageLayer.className = 'hero-slides';
  imageLayer.innerHTML = heroImages
    .map((file, index) => `<div class="hero-slide${index === 0 ? ' active' : ''}" style="background-image:url('assets/images/${file}')"></div>`)
    .join('');

  const slides = [...$$('.hero-slide')];
  let slideIndex = 0;
  setInterval(() => {
    slides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add('active');
  }, 4800);

  // Move the quick check-in/check-out bar below the hero, into its own availability strip
  const hero = $('.hero');
  const bookingBar = $('#quick');
  const availability = document.createElement('section');
  availability.className = 'availability';
  hero.after(availability);
  availability.append(bookingBar);
});