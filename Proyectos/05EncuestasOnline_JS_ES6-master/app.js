class EncuestasOnline {
  constructor() {
    this.surveys = [];
    this.responses = [];
    this.storage = 'encuestas-online';
    this.storageResponses = 'encuestas-responses';
    this.currentSurveyId = null;
    this.optionCount = 2;

    this.init();
  }

  init() {
    console.log('Inicializando Encuestas Online...');
    this.loadData();
    this.setupEventListeners();
    this.render();
  }

  // ===== GESTIÓN DE ENCUESTAS =====
  createSurvey(title, description) {
    if (!title.trim()) {
      this.showNotification('⚠️ El título es requerido');
      return;
    }

    const survey = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      questions: [],
      status: 'activa',
      createdAt: new Date().toISOString()
    };

    this.surveys.push(survey);
    this.saveData();
    this.render();
    document.getElementById('surveyForm').reset();
    this.showNotification(`✅ Encuesta "${title}" creada correctamente`);
  }

  deleteSurvey(id) {
    const survey = this.surveys.find(s => s.id === id);
    if (confirm(`¿Confirmar eliminación de "${survey.title}"?`)) {
      this.surveys = this.surveys.filter(s => s.id !== id);
      this.responses = this.responses.filter(r => r.surveyId !== id);
      this.saveData();
      this.render();
      this.closeModal();
      this.showNotification('🗑️ Encuesta eliminada');
    }
  }

  toggleStatus(id) {
    const survey = this.surveys.find(s => s.id === id);
    if (survey) {
      survey.status = survey.status === 'activa' ? 'cerrada' : 'activa';
      this.saveData();
      this.render();
      const statusText = survey.status === 'activa' ? 'abierta' : 'cerrada';
      this.showNotification(`📊 Encuesta ${statusText}`);
    }
  }

  addQuestion(surveyId, questionText, questionType, options = []) {
    const survey = this.surveys.find(s => s.id === surveyId);
    if (!survey) return;

    const question = {
      id: Date.now(),
      text: questionText.trim(),
      type: questionType,
      options: options.filter(opt => opt.trim()),
      responses: []
    };

    survey.questions.push(question);
    this.saveData();
    this.showNotification('✅ Pregunta agregada');
  }

  // ===== RESPUESTAS =====
  submitResponse(surveyId, answers) {
    const survey = this.surveys.find(s => s.id === surveyId);
    if (!survey || survey.status === 'cerrada') {
      this.showNotification('⚠️ Esta encuesta está cerrada');
      return;
    }

    const response = {
      id: Date.now(),
      surveyId,
      answers,
      createdAt: new Date().toISOString()
    };

    this.responses.push(response);
    this.saveData();
    this.showNotification('✅ Respuesta enviada correctamente');
  }

  getSurveyResponses(surveyId) {
    return this.responses.filter(r => r.surveyId === surveyId);
  }

  // ===== ESTADÍSTICAS =====
  updateStats() {
    const totalSurveys = this.surveys.length;
    const totalResponses = this.responses.length;
    const activeSurveys = this.surveys.filter(s => s.status === 'activa').length;
    const participationRate = totalSurveys > 0 
      ? Math.round((totalResponses / (this.surveys.reduce((sum, s) => sum + (s.questions.length || 1), 0) || 1)) * 100)
      : 0;

    document.getElementById('totalSurveys').textContent = totalSurveys;
    document.getElementById('totalResponses').textContent = totalResponses;
    document.getElementById('activeSurveys').textContent = activeSurveys;
    document.getElementById('participationRate').textContent = `${participationRate}%`;
  }

  // ===== ANÁLISIS DE RESULTADOS =====
  getQuestionResults(surveyId, questionId) {
    const survey = this.surveys.find(s => s.id === surveyId);
    const question = survey.questions.find(q => q.id === questionId);
    const responses = this.getSurveyResponses(surveyId);

    const results = {};

    if (question.type === 'multiple' || question.type === 'rating') {
      question.options.forEach(option => {
        results[option] = responses.filter(r => 
          r.answers[questionId] === option
        ).length;
      });
    } else if (question.type === 'text') {
      results['total'] = responses.filter(r => r.answers[questionId]).length;
    }

    return results;
  }

  // ===== EXPORTACIÓN =====
  exportResults(surveyId) {
    const survey = this.surveys.find(s => s.id === surveyId);
    if (!survey) return;

    let csv = `"${survey.title}"\n`;
    csv += `"${survey.description}"\n\n`;

    survey.questions.forEach(question => {
      csv += `"${question.text}"\n`;
      
      const results = this.getQuestionResults(surveyId, question.id);
      
      Object.entries(results).forEach(([option, count]) => {
        csv += `"${option}","${count}"\n`;
      });
      csv += '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `encuesta_${survey.id}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    this.showNotification('📥 Resultados exportados');
  }

  // ===== RENDERIZACIÓN =====
  renderSurveys() {
    const list = document.getElementById('surveysList');
    const noSurveys = document.getElementById('noSurveys');

    list.innerHTML = '';

    if (this.surveys.length === 0) {
      noSurveys.style.display = 'block';
      return;
    }

    noSurveys.style.display = 'none';

    this.surveys.forEach(survey => {
      const responseCount = this.getSurveyResponses(survey.id).length;
      const statusClass = survey.status === 'activa' ? 'status-activa' : 'status-cerrada';
      const statusText = survey.status === 'activa' ? '✅ Activa' : '❌ Cerrada';

      const card = document.createElement('div');
      card.className = 'survey-card';
      card.innerHTML = `
        <div class="survey-card-header">
          <div class="survey-title">${survey.title}</div>
          <span class="survey-status ${statusClass}">${statusText}</span>
        </div>
        <p class="survey-description">${survey.description}</p>
        <div class="survey-info">
          <div class="info-row">📋 ${survey.questions.length} pregunta${survey.questions.length !== 1 ? 's' : ''}</div>
          <div class="info-row">💬 ${responseCount} respuesta${responseCount !== 1 ? 's' : ''}</div>
          <div class="info-row">📅 ${new Date(survey.createdAt).toLocaleDateString('es-ES')}</div>
        </div>
        <div class="survey-actions">
          <button class="btn-icon" onclick="encuestas.openSurvey(${survey.id})">Ver</button>
          <button class="btn-icon" onclick="encuestas.deleteSurvey(${survey.id})">Eliminar</button>
        </div>
      `;

      list.appendChild(card);
    });
  }

  openSurvey(surveyId) {
    this.currentSurveyId = surveyId;
    const survey = this.surveys.find(s => s.id === surveyId);

    document.getElementById('modalSurveyTitle').textContent = survey.title;
    document.getElementById('modalSurveyDescription').textContent = survey.description;

    this.renderQuestions();
    this.renderResults();

    // Actualizar botón de estado
    const toggleBtn = document.getElementById('toggleStatusBtn');
    toggleBtn.textContent = survey.status === 'activa' ? '🔒 Cerrar Encuesta' : '🔓 Abrir Encuesta';

    document.getElementById('surveyModal').classList.remove('hidden');
  }

  renderQuestions() {
    const survey = this.surveys.find(s => s.id === this.currentSurveyId);
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';

    if (survey.questions.length === 0) {
      container.innerHTML = '<p class="empty-state">Sin preguntas aún</p>';
      return;
    }

    survey.questions.forEach(question => {
      const block = document.createElement('div');
      block.className = 'question-block';

      let optionsHTML = '';

      if (question.type === 'multiple') {
        optionsHTML = question.options.map((option, idx) => `
          <div class="option-item">
            <input type="radio" id="q${question.id}_${idx}" name="q${question.id}" value="${option}">
            <label for="q${question.id}_${idx}">${option}</label>
          </div>
        `).join('');
      } else if (question.type === 'rating') {
        optionsHTML = `
          <div class="rating-group">
            ${[1, 2, 3, 4, 5].map(n => `
              <button type="button" class="rating-btn" data-rating="${n}" onclick="document.getElementById('q${question.id}').value = '${n}'; this.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active')); this.classList.add('active')">${n}</button>
            `).join('')}
          </div>
          <input type="hidden" id="q${question.id}" name="q${question.id}" value="">
        `;
      } else if (question.type === 'text') {
        optionsHTML = `<textarea class="text-response" id="q${question.id}" name="q${question.id}" placeholder="Tu respuesta..."></textarea>`;
      }

      block.innerHTML = `
        <div class="question-text">${question.text}</div>
        <div class="question-options">${optionsHTML}</div>
      `;

      container.appendChild(block);
    });
  }

  renderResults() {
    const survey = this.surveys.find(s => s.id === this.currentSurveyId);
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    survey.questions.forEach(question => {
      const resultDiv = document.createElement('div');
      resultDiv.className = 'result-question';

      const results = this.getQuestionResults(this.currentSurveyId, question.id);
      const totalResponses = Object.values(results).reduce((a, b) => a + b, 0) || 1;

      let resultHTML = `<div class="result-title">${question.text}</div>`;

      Object.entries(results).forEach(([option, count]) => {
        const percentage = ((count / totalResponses) * 100).toFixed(1);
        resultHTML += `
          <div class="result-stat">
            <div class="result-stat-label">${option}: ${count} (${percentage}%)</div>
            <div class="result-bar">
              <div class="result-bar-fill" style="width: ${percentage}%">${percentage}%</div>
            </div>
          </div>
        `;
      });

      resultDiv.innerHTML = resultHTML;
      container.appendChild(resultDiv);
    });
  }

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    // Crear encuesta
    document.getElementById('surveyForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('surveyTitle').value;
      const description = document.getElementById('surveyDescription').value;
      this.createSurvey(title, description);
    });

    // Modal principal
    document.getElementById('closeModal').addEventListener('click', () => {
      this.closeModal();
    });

    // Pestañas del modal
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabName = e.target.dataset.tab;
        document.querySelectorAll('.modal-tab').forEach(t => t.classList.add('hidden'));
        document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
        document.getElementById(tabName).classList.remove('hidden');
        e.target.classList.add('active');
      });
    });

    // Copiar enlace
    document.getElementById('copyLinkBtn').addEventListener('click', () => {
      const link = `${window.location.origin}/?survey=${this.currentSurveyId}`;
      navigator.clipboard.writeText(link).then(() => {
        this.showNotification('🔗 Enlace copiado al portapapeles');
      });
    });

    // Cambiar estado
    document.getElementById('toggleStatusBtn').addEventListener('click', () => {
      this.toggleStatus(this.currentSurveyId);
      this.openSurvey(this.currentSurveyId);
    });

    // Eliminar
    document.getElementById('deleteBtn').addEventListener('click', () => {
      this.deleteSurvey(this.currentSurveyId);
    });

    // Enviar respuesta
    document.getElementById('submitResponse').addEventListener('click', () => {
      const answers = {};
      const survey = this.surveys.find(s => s.id === this.currentSurveyId);
      
      survey.questions.forEach(q => {
        const input = document.querySelector(`[name="q${q.id}"]`);
        if (input) {
          answers[q.id] = input.value;
        }
      });

      this.submitResponse(this.currentSurveyId, answers);
      this.openSurvey(this.currentSurveyId);
    });

    // Exportar
    document.getElementById('exportBtn').addEventListener('click', () => {
      if (this.surveys.length === 0) {
        this.showNotification('⚠️ No hay encuestas para exportar');
        return;
      }
      const firstSurvey = this.surveys[0];
      this.exportResults(firstSurvey.id);
    });

    // Cerrar modal al hacer clic fuera
    document.getElementById('surveyModal').addEventListener('click', (e) => {
      if (e.target.id === 'surveyModal') this.closeModal();
    });
  }

  closeModal() {
    document.getElementById('surveyModal').classList.add('hidden');
    this.currentSurveyId = null;
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
  saveData() {
    localStorage.setItem(this.storage, JSON.stringify(this.surveys));
    localStorage.setItem(this.storageResponses, JSON.stringify(this.responses));
  }

  loadData() {
    const surveys = localStorage.getItem(this.storage);
    this.surveys = surveys ? JSON.parse(surveys) : [];
    const responses = localStorage.getItem(this.storageResponses);
    this.responses = responses ? JSON.parse(responses) : [];
  }

  // ===== RENDER =====
  render() {
    this.renderSurveys();
    this.updateStats();
  }
}

// Variable global
let encuestas;

document.addEventListener('DOMContentLoaded', () => {
  encuestas = new EncuestasOnline();
});
