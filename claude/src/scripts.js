const elements = document.querySelectorAll('.floating-element');

function moveRandomly(el) {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  el.style.transform = `translate(${x}px, ${y}px)`;
}

// initialize and keep moving them
elements.forEach(el => {
  moveRandomly(el); // first move
  setInterval(() => moveRandomly(el), 12000); // new pos every 12s
});

// reposition if window resizes
window.addEventListener('resize', () => {
  elements.forEach(el => moveRandomly(el));
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Animate sections on scroll
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });

        // Animate skill bars
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.animation = 'fillBar 2s ease forwards';
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skills-grid').forEach(grid => {
            skillObserver.observe(grid);
        });

        // Timeline animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
        });

        // Project card interactions
        function openProject(projectId) {
            // In a real implementation, this would open a detailed view
            alert(`Opening project: ${projectId}. In a real implementation, this would show detailed project information.`);
        }

        // Contact form submission
        function submitForm(event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            
            // Simulate form submission
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }

        // Particle effect for hero section
        function createParticles() {
            const hero = document.querySelector('.hero');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: rgba(139, 92, 246, 0.6);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                    animation-delay: -${Math.random() * 5}s;
                `;
                hero.appendChild(particle);
            }
        }

        // Initialize particles
        createParticles();

        // Add typing effect to hero text
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing effect for hero subtitle
        const heroSubtitle = document.querySelector('.hero p');
        if (heroSubtitle) {
            const originalText = heroSubtitle.textContent;
            setTimeout(() => {
                typeWriter(heroSubtitle, originalText, 50);
            }, 1000);
        }