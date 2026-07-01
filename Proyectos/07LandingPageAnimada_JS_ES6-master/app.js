class LandingPage {
  constructor() {
    this.init();
  }

  init() {
    console.log('Inicializando Landing Page Animada...');
    this.setupEventListeners();
    this.observeElements();
  }

  setupEventListeners() {
    // CTA Button
    document.getElementById('ctaBtn').addEventListener('click', () => {
      document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
      this.showNotification('✅ Scroll a sección de contacto');
    });

    // Mobile Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      });
    }

    // Contact Form
    document.getElementById('contactForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.showNotification('✅ Mensaje enviado correctamente');
      document.getElementById('contactForm').reset();
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          if (navLinks) navLinks.style.display = 'none';
        }
      });
    });
  }

  observeElements() {
    // Intersection Observer para animaciones al scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });
  }

  showNotification(message) {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notificationText');
    text.textContent = message;
    notification.classList.remove('hidden');

    setTimeout(() => {
      notification.classList.add('hidden');
    }, 3000);
  }
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new LandingPage();
});
