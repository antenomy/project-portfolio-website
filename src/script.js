// Mobile nav toggle
const navToggleButton = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggleButton && navLinks) {
  navToggleButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggleButton.setAttribute('aria-expanded', 'false');
  });
});

// Smooth scroll enhancement for browsers without native smooth behavior
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});




document.addEventListener("DOMContentLoaded", async () => {
  fetch('./assets/objects/icons.html')
  .then(response => response.text())
  .then(svgText => {
    const div = document.createElement('div');
    div.innerHTML = svgText;
    document.body.insertBefore(div, document.body.firstChild);
  });
});


