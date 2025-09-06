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

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}


document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("./data.json");
  const data = await response.json();

  // Projects
  const projectsContainer = document.getElementById("projects-container");
  data.projects.forEach(project => {
    const card = document.createElement("article");
    card.className = "card";

    const techList = project.tech.map(t => `<li>${t}</li>`).join("");

    card.innerHTML = `
      <div class="project-card">
        <h3 class="title">${project.title}</h3>
        <a href="${project.repo_link}" class="github-link" target="_blank">
          <svg class="icon" width="24" height="24">
            <use href="#icon-github"></use>
          </svg>
        </a>
        <p class="description">${project.description}</p>
        <ul class="pill-list">${techList}</ul>
      <div>
    `;

    projectsContainer.appendChild(card);
  });
  

  // Experience
  const experienceContainer = document.getElementById("experience-container");
  data.experience.forEach(exp => {
    const item = document.createElement("div");
    item.className = "timeline-item";

    item.innerHTML = `
      <div class="timeline-meta">${exp.start_date} - ${exp.end_date}</div>
      <div class="timeline-content experience-row">
        <img src="./assets/images/${exp.image}" alt="${exp.title}" class="experience-image">
        <div class="experience-text">
          <h3>${exp.title}</h3>
          <p>${exp.responsibilities[0]}</p>
        </div>
      </div>
    `;
    experienceContainer.appendChild(item);
  });

  // Education
  const educationContainer = document.getElementById("education-container");
  data.education.forEach(edc => {
    const item = document.createElement("div");
    item.className = "timeline-item";

    item.innerHTML = `
      <div class="timeline-meta">${edc.start_date} - ${edc.end_date}</div>
      <div class="timeline-content experience-row">
        <img src="./assets/images/${edc.image}" alt="${edc.institution}" class="experience-image">
        <div class="experience-text">
          <h3>${edc.institution}</h3>
          <p>${edc.degree}</p>
        </div>
      </div>
    `;
    educationContainer.appendChild(item);
  });

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  fetch('./assets/objects/icons.html')
  .then(response => response.text())
  .then(svgText => {
    const div = document.createElement('div');
    div.innerHTML = svgText;
    document.body.insertBefore(div, document.body.firstChild);
  });

  const arrow = document.querySelector('.scroll-down-arrow');
  const heroSection = document.getElementById('hero-section-identifier');
  // const aboutSection = document.getElementById('about-section-identifier');
  // const projectsSection = document.getElementById('projects-section-identifier');
  // const experienceSection = document.getElementById('experience-section-identifier');

  if (!arrow || !heroSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Only show arrow when hero is substantially visible
      if (entry.intersectionRatio > 0.1) { // 10% of hero still visible
        arrow.classList.remove('hidden');
        console.log("Hero visible - show arrow");
      } else {
        arrow.classList.add('hidden');
        console.log("Hero hidden - hide arrow");
      }
    });
  // }, {
  //   threshold: [0.9] // Trigger at 0% and 10% visibility
  });

  observer.observe(heroSection);
  // observer.observe(aboutSection);
  // observer.observe(projectsSection);
  // observer.observe(experienceSection);
});


