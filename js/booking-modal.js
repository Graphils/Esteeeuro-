// Reservation modal: opens from any ".open-book" button, plus form submissions.
// Business contact details used to build the WhatsApp / email messages:
const BOOKING_WHATSAPP_NUMBER = '233533868869';
const BOOKING_EMAIL_ADDRESS = 'reservations@esteeeuroapartment.com';

const modal = $('#bookingmodal');
const bookingForm = $('#bookingform');
const bookingSuccess = $('#bookingSuccess');

function resetBookingModal() {
  bookingForm.hidden = false;
  bookingSuccess.hidden = true;
  bookingForm.reset();
}

$$('.open-book').forEach((btn) => btn.addEventListener('click', () => {
  resetBookingModal();
  modal.classList.add('show');
}));

// Every element with data-close="someModalId" closes that modal.
// addEventListener (rather than .onclick=) so this can never be silently
// overwritten by another handler being attached to the same button later.
$$('[data-close]').forEach((btn) => {
  btn.addEventListener('click', () => {
    $('#' + btn.dataset.close).classList.remove('show');
  });
});

// Click the dark backdrop (outside the white box) to close a modal
$$('.modal').forEach((m) => {
  m.addEventListener('click', (e) => {
    if (e.target === m) m.classList.remove('show');
  });
});

// Escape key closes whichever modal is open
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  $$('.modal.show').forEach((m) => m.classList.remove('show'));
});

// Quick check-in/check-out bar also opens the full reservation modal
$('#quick').addEventListener('submit', (e) => {
  e.preventDefault();
  resetBookingModal();
  modal.classList.add('show');
});
// A plain Enter press inside the booking form shouldn't submit/reload the page
$('#bookingform').addEventListener('submit', (e) => e.preventDefault());

// Any "Terms & Conditions" link (footer, booking form, etc.) opens the terms modal
$$('.open-terms').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    $('#termsmodal').classList.add('show');
  });
});

function bookingMessage() {
  if (!bookingForm.reportValidity()) return null;
  const f = new FormData(bookingForm);
  return (
    `Hello Estee Euro Apartment, I'd like to reserve a suite.\n\n` +
    `Name: ${f.get('name')}\n` +
    `Email: ${f.get('email')}\n` +
    `Phone: ${f.get('phone')}\n` +
    `Suite: ${f.get('suite')}\n` +
    `Check-in: ${f.get('checkin')}\n` +
    `Check-out: ${f.get('checkout')}\n` +
    (f.get('notes') ? `Notes: ${f.get('notes')}\n` : '')
  );
}

function showBookingConfirmation(channel) {
  bookingForm.hidden = true;
  bookingSuccess.hidden = false;
  $('#successText').textContent =
    `Your reservation details have been prepared. Send them over on ${channel} to confirm with our team.`;
}

$('#bookingDone').addEventListener('click', () => modal.classList.remove('show'));

$('#bookWhatsApp').addEventListener('click', () => {
  const message = bookingMessage();
  if (!message) return;
  window.open(`https://wa.me/${BOOKING_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  showBookingConfirmation('WhatsApp');
});

$('#bookEmail').addEventListener('click', () => {
  const message = bookingMessage();
  if (!message) return;
  const subject = encodeURIComponent('Suite Reservation Request');
  window.location.href = `mailto:${BOOKING_EMAIL_ADDRESS}?subject=${subject}&body=${encodeURIComponent(message)}`;
  showBookingConfirmation('email');
});

// Contact form at the bottom of the page
$('#contactform').addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.reset();
  alert('Thank you. Your enquiry has been sent.');
});