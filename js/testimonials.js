// Guest notes / testimonial carousel
const testimonials = [
  {
    quote: "The location was perfect, Wi-Fi was fast, and the suite felt like home. Everything was quietly taken care of.",
    name: "Kwame B.",
    role: "Business traveller",
    img: "assets/images/photo-15.jpg",
  },
  {
    quote: "Spotless suite, warm welcome, and the security put my mind at ease for the whole stay.",
    name: "Ama S.",
    role: "Extended stay guest",
    img: "assets/images/photo-16.jpg",
  },
  {
    quote: "Booked for a week, ended up staying a month. The kitchenette and reliable Wi-Fi made working from Accra easy.",
    name: "David O.",
    role: "Relocation stay",
    img: "assets/images/photo-18.jpg",
  },
];

let testimonialIndex = 0;

function renderTestimonial(i) {
  const t = testimonials[i];
  $('#quote').textContent = `"${t.quote}"`;
  $('#guestname').textContent = t.name;
  $('#guestrole').textContent = t.role;
  $('#guestimg').src = t.img;
}

$('#prev')?.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonial(testimonialIndex);
});

$('#next')?.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  renderTestimonial(testimonialIndex);
});
