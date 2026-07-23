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
    '<a class="whatsapp" href="https://wa.me/233533868869" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">WA</a>'
  );
});