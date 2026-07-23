// Suite "save" heart buttons
$$('.save').forEach((btn) => {
  btn.onclick = () => {
    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
  };
});

// Suite "compare" buttons + the floating compare bar
let selected = [];
$$('.compare').forEach((btn) => {
  btn.onclick = () => {
    const suite = btn.dataset.suite;
    selected = selected.includes(suite) ? selected.filter((s) => s !== suite) : [...selected, suite];
    btn.textContent = selected.includes(suite) ? '✓ Selected' : '+ Compare';
    $('#comparetext').textContent = selected.length + ' suite' + (selected.length === 1 ? '' : 's') + ' selected';
    $('#comparebar').classList.toggle('show', selected.length > 0);
  };
});
$('#comparego').onclick = () => alert('Comparing: ' + selected.join(' · '));

// FAQ accordion
$$('.qa button').forEach((btn) => {
  btn.onclick = () => {
    const item = btn.parentElement;
    item.classList.toggle('open');
    btn.querySelector('span').textContent = item.classList.contains('open') ? '−' : '+';
  };
});

// Animated stats counters, triggered once the stats section scrolls into view
let statsAnimated = false;
const statsObserver = new IntersectionObserver((entries) => {
  if (entries.some((entry) => entry.isIntersecting) && !statsAnimated) {
    statsAnimated = true;
    $$('.num').forEach((el) => {
      const end = +el.dataset.count;
      const start = performance.now();
      function tick(now) {
        const value = Math.min(end, Math.floor(((now - start) / 850) * end));
        el.textContent = value + (end === 24 ? '/7' : end === 100 ? '%' : end === 5 ? '★' : '+');
        if (value < end) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }
});
statsObserver.observe($('.stats'));

// Small page inserts: exact address under the location text, and a floating WhatsApp button
document.addEventListener('DOMContentLoaded', () => {
  const locationText = $('#location p');
  locationText.insertAdjacentHTML(
    'afterend',
    '<span class="location-address">Accra, Ghana · Walk-ins welcome</span>' +
    '<a class="directions" href="https://maps.google.com/?q=Accra+Ghana+Estee+Euro+Apartment" target="_blank" rel="noopener">Get directions →</a>'
  );

  $('.contact-grid > div').insertAdjacentHTML(
    'beforeend',
    '<b>Visit us</b><small>Accra, Ghana<br>Walk-ins welcome</small>'
  );

  document.body.insertAdjacentHTML(
    'beforeend',
    '<a class="whatsapp" href="https://wa.me/233533868869" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' +
    '<svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M16.04 4C9.42 4 4 9.32 4 15.87c0 2.24.62 4.33 1.7 6.13L4 28l6.2-1.62a12.2 12.2 0 0 0 5.84 1.49h.01c6.62 0 12.03-5.32 12.03-11.87C28.08 9.32 22.66 4 16.04 4Zm0 21.7h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.68.96.98-3.55-.24-.37a9.75 9.75 0 0 1-1.52-5.28c0-5.4 4.44-9.79 9.88-9.79 2.64 0 5.12 1.02 6.98 2.87a9.68 9.68 0 0 1 2.9 6.92c0 5.4-4.44 9.83-9.89 9.83Zm5.42-7.36c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.29-.77.96-.94 1.16-.17.19-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.66-2.06-.17-.29-.02-.45.13-.6.14-.14.3-.35.45-.53.15-.18.2-.29.3-.49.1-.19.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.19-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.47s1.07 2.86 1.22 3.06c.15.19 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.35.19 1.86.11.57-.08 1.75-.71 2-1.41.24-.69.24-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z"/></svg>' +
    '</a>'
  );
});