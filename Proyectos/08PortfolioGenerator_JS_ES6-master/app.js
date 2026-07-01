class PortfolioGenerator {
  constructor() {
    this.portfolio = {
      fullName: '',
      title: '',
      bio: '',
      email: '',
      phone: '',
      location: '',
      projects: [],
      skills: [],
      github: '',
      linkedin: '',
      twitter: '',
      theme: 'dark'
    };
    this.storage = 'portfolio-generator';

    this.init();
  }

  init() {
    console.log('Inicializando Portfolio Generator...');
    this.loadPortfolio();
    this.setupEventListeners();
    this.render();
  }

  // ===== EVENTOS =====
  setupEventListeners() {
    // Formulario principal
    document.getElementById('portfolioForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.updatePortfolioData();
      this.render();
      this.showNotification('✅ Portafolio actualizado');
    });

    // Tema
    document.getElementById('theme').addEventListener('change', (e) => {
      this.portfolio.theme = e.target.value;
      this.render();
    });

    // Proyecto
    document.getElementById('addProjectBtn').addEventListener('click', () => {
      this.openProjectModal();
    });

    document.getElementById('projectForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.addProject();
    });

    document.getElementById('cancelProjectBtn').addEventListener('click', () => {
      this.closeProjectModal();
    });

    document.getElementById('closeProjectModal').addEventListener('click', () => {
      this.closeProjectModal();
    });

    // Cambios en tiempo real
    document.getElementById('fullName').addEventListener('input', (e) => {
      this.portfolio.fullName = e.target.value;
      this.renderPreview();
    });

    document.getElementById('title').addEventListener('input', (e) => {
      this.portfolio.title = e.target.value;
      this.renderPreview();
    });

    document.getElementById('bio').addEventListener('input', (e) => {
      this.portfolio.bio = e.target.value;
      this.renderPreview();
    });

    document.getElementById('email').addEventListener('input', (e) => {
      this.portfolio.email = e.target.value;
      this.renderPreview();
    });

    document.getElementById('phone').addEventListener('input', (e) => {
      this.portfolio.phone = e.target.value;
      this.renderPreview();
    });

    document.getElementById('location').addEventListener('input', (e) => {
      this.portfolio.location = e.target.value;
      this.renderPreview();
    });

    document.getElementById('skills').addEventListener('input', (e) => {
      this.portfolio.skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
      this.renderPreview();
    });

    document.getElementById('github').addEventListener('input', (e) => {
      this.portfolio.github = e.target.value;
      this.renderPreview();
    });

    document.getElementById('linkedin').addEventListener('input', (e) => {
      this.portfolio.linkedin = e.target.value;
      this.renderPreview();
    });

    document.getElementById('twitter').addEventListener('input', (e) => {
      this.portfolio.twitter = e.target.value;
      this.renderPreview();
    });
  }

  // ===== PROYECTOS =====
  addProject() {
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;
    const technologies = document.getElementById('projectTechnologies').value;
    const link = document.getElementById('projectLink').value;

    if (!title.trim()) {
      this.showNotification('⚠️ El título es requerido');
      return;
    }

    const project = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      technologies: technologies.split(',').map(t => t.trim()).filter(t => t),
      link: link.trim()
    };

    this.portfolio.projects.push(project);
    this.savePortfolio();
    this.renderProjectsList();
    this.renderPreview();
    this.closeProjectModal();
    this.showNotification('✅ Proyecto agregado');
  }

  deleteProject(id) {
    this.portfolio.projects = this.portfolio.projects.filter(p => p.id !== id);
    this.savePortfolio();
    this.renderProjectsList();
    this.renderPreview();
    this.showNotification('🗑️ Proyecto eliminado');
  }

  renderProjectsList() {
    const list = document.getElementById('projectsList');
    list.innerHTML = '';

    this.portfolio.projects.forEach(project => {
      const item = document.createElement('div');
      item.className = 'project-item';
      item.innerHTML = `
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.technologies.join(', ')}</p>
        </div>
        <button class="btn-delete" onclick="pg.deleteProject(${project.id})">✕</button>
      `;
      list.appendChild(item);
    });
  }

  // ===== MODAL =====
  openProjectModal() {
    document.getElementById('projectForm').reset();
    document.getElementById('projectModal').classList.remove('hidden');
  }

  closeProjectModal() {
    document.getElementById('projectModal').classList.add('hidden');
  }

  // ===== RENDERIZACIÓN =====
  renderPreview() {
    this.savePortfolio();
    this.render();
  }

  render() {
    this.renderProjectsList();
    this.generatePortfolioHTML();
  }

  generatePortfolioHTML() {
    const portfolio = document.getElementById('portfolio');
    const theme = this.portfolio.theme;

    portfolio.className = `portfolio-preview ${theme}`;

    let projectsHTML = '';
    if (this.portfolio.projects.length > 0) {
      projectsHTML = `
        <section class="portfolio-section">
          <h2>🎯 Proyectos</h2>
          <div class="projects-grid">
            ${this.portfolio.projects.map(project => `
              <div class="project-card">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                  ${project.technologies.map(tech => `
                    <span class="tech-badge">${tech}</span>
                  `).join('')}
                </div>
                ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">Ver Proyecto →</a>` : ''}
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    let socialsHTML = '';
    if (this.portfolio.github || this.portfolio.linkedin || this.portfolio.twitter) {
      socialsHTML = `
        <div class="social-links">
          ${this.portfolio.github ? `<a href="${this.portfolio.github}" target="_blank" class="social-link">GH</a>` : ''}
          ${this.portfolio.linkedin ? `<a href="${this.portfolio.linkedin}" target="_blank" class="social-link">LI</a>` : ''}
          ${this.portfolio.twitter ? `<a href="${this.portfolio.twitter}" target="_blank" class="social-link">TW</a>` : ''}
        </div>
      `;
    }

    portfolio.innerHTML = `
      <div class="portfolio-header">
        <h1 class="portfolio-name">${this.portfolio.fullName || 'Tu Nombre'}</h1>
        <div class="portfolio-title">${this.portfolio.title || 'Tu Profesión'}</div>
        <p class="portfolio-bio">${this.portfolio.bio || 'Tu biografía aparecerá aquí'}</p>
        
        <div class="portfolio-contact">
          ${this.portfolio.email ? `<div class="contact-item">📧 ${this.portfolio.email}</div>` : ''}
          ${this.portfolio.phone ? `<div class="contact-item">📱 ${this.portfolio.phone}</div>` : ''}
          ${this.portfolio.location ? `<div class="contact-item">📍 ${this.portfolio.location}</div>` : ''}
        </div>
      </div>

      ${this.portfolio.skills.length > 0 ? `
        <section class="portfolio-section">
          <h2>💻 Habilidades</h2>
          <div class="skills-grid">
            ${this.portfolio.skills.map(skill => `
              <div class="skill-tag">${skill}</div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      ${projectsHTML}

      ${socialsHTML ? `
        <div class="portfolio-footer">
          ${socialsHTML}
          <p style="margin-top: 1.5rem; opacity: 0.7;font-size: 0.9rem;">© 2026 ${this.portfolio.fullName || 'Tu Nombre'}. Creado con Portfolio Generator</p>
        </div>
      ` : ''}
    `;
  }

  // ===== UTILIDADES =====
  updatePortfolioData() {
    this.portfolio.fullName = document.getElementById('fullName').value;
    this.portfolio.title = document.getElementById('title').value;
    this.portfolio.bio = document.getElementById('bio').value;
    this.portfolio.email = document.getElementById('email').value;
    this.portfolio.phone = document.getElementById('phone').value;
    this.portfolio.location = document.getElementById('location').value;
    this.portfolio.skills = document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s);
    this.portfolio.github = document.getElementById('github').value;
    this.portfolio.linkedin = document.getElementById('linkedin').value;
    this.portfolio.twitter = document.getElementById('twitter').value;
    this.portfolio.theme = document.getElementById('theme').value;

    this.savePortfolio();
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

  // ===== ALMACENAMIENTO =====
  savePortfolio() {
    localStorage.setItem(this.storage, JSON.stringify(this.portfolio));
  }

  loadPortfolio() {
    const data = localStorage.getItem(this.storage);
    if (data) {
      this.portfolio = JSON.parse(data);
      // Llenar formulario
      document.getElementById('fullName').value = this.portfolio.fullName;
      document.getElementById('title').value = this.portfolio.title;
      document.getElementById('bio').value = this.portfolio.bio;
      document.getElementById('email').value = this.portfolio.email;
      document.getElementById('phone').value = this.portfolio.phone;
      document.getElementById('location').value = this.portfolio.location;
      document.getElementById('skills').value = this.portfolio.skills.join(', ');
      document.getElementById('github').value = this.portfolio.github;
      document.getElementById('linkedin').value = this.portfolio.linkedin;
      document.getElementById('twitter').value = this.portfolio.twitter;
      document.getElementById('theme').value = this.portfolio.theme;
    }
  }
}

let pg;

document.addEventListener('DOMContentLoaded', () => {
  pg = new PortfolioGenerator();
});
