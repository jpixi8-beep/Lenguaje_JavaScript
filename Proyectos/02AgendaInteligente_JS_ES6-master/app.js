class AgendaInteligente {
  constructor() {
    this.currentDate = new Date();
    this.events = [];
    this.storage = 'agenda-events';
    this.selectedDate = null;
    this.reminders = new Map();

    this.init();
  }

  init() {
    console.log('Inicializando Agenda Inteligente...');
    this.loadEvents();
    this.setupEventListeners();
    this.render();
    this.checkReminders();
    // Verificar recordatorios cada minuto
    setInterval(() => this.checkReminders(), 60000);
  }

  // ===== GESTIÓN DE EVENTOS =====
  addEvent(title, description, date, time, reminderTime) {
    if (!title.trim()) {
      this.showNotification('⚠️ El título del evento es requerido');
      return;
    }

    const event = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      date: date,
      time: time,
      reminderTime: reminderTime,
      createdAt: new Date().toISOString()
    };

    this.events.push(event);
    this.events.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });

    this.saveEvents();
    this.render();
    this.clearInputs();
    this.showNotification('✅ Evento agregado correctamente');
  }

  deleteEvent(id) {
    this.events = this.events.filter(e => e.id !== id);
    this.saveEvents();
    this.render();
    this.showNotification('🗑️ Evento eliminado');
  }

  getEventsByDate(date) {
    const dateStr = this.formatDate(date);
    return this.events.filter(event => event.date === dateStr);
  }

  getTodayEvents() {
    return this.getEventsByDate(new Date());
  }

  getNextEvents(limit = 5) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.events
      .filter(event => {
        const eventDate = new Date(`${event.date}T${event.time}`);
        return eventDate >= today;
      })
      .slice(0, limit);
  }

  // ===== CALENDARIO =====
  getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  renderCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysInMonth = this.getDaysInMonth(this.currentDate);
    const firstDay = this.getFirstDayOfMonth(this.currentDate);

    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Actualizar encabezado
    const monthHeader = document.getElementById('currentMonth');
    monthHeader.textContent = `${monthNames[month]} ${year}`;

    // Limpiar calendario
    const calendarGrid = document.getElementById('calendarDays');
    calendarGrid.innerHTML = '';

    // Días del mes anterior
    const prevMonthDays = this.getDaysInMonth(
      new Date(year, month - 1)
    );

    for (let i = firstDay - 1; i >= 0; i--) {
      const dayElement = document.createElement('div');
      dayElement.className = 'calendar-day other-month';
      dayElement.textContent = prevMonthDays - i;
      calendarGrid.appendChild(dayElement);
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'calendar-day';

      const date = new Date(year, month, day);
      const dateStr = this.formatDate(date);
      const dayEvents = this.getEventsByDate(date);

      // Verificar si es hoy
      const today = new Date();
      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        dayElement.classList.add('today');
      }

      // Verificar si está seleccionado
      if (this.selectedDate && this.selectedDate === dateStr) {
        dayElement.classList.add('selected');
      }

      const dayNumber = document.createElement('div');
      dayNumber.className = 'day-number';
      dayNumber.textContent = day;
      dayElement.appendChild(dayNumber);

      if (dayEvents.length > 0) {
        const indicator = document.createElement('div');
        indicator.className = 'event-indicator';
        dayElement.appendChild(indicator);
      }

      dayElement.addEventListener('click', () => {
        this.selectedDate = dateStr;
        this.render();
      });

      calendarGrid.appendChild(dayElement);
    }

    // Días del próximo mes
    const nextMonthDays = 42 - (firstDay + daysInMonth);
    for (let day = 1; day <= nextMonthDays; day++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'calendar-day other-month';
      dayElement.textContent = day;
      calendarGrid.appendChild(dayElement);
    }
  }

  // ===== VISTA DE EVENTOS =====
  renderTodayEvents() {
    const container = document.getElementById('todayEvents');
    const todayEvents = this.getTodayEvents();

    container.innerHTML = '';

    if (todayEvents.length === 0) {
      container.innerHTML = '<p class="empty-state">Sin eventos hoy</p>';
      return;
    }

    todayEvents.forEach(event => {
      const eventEl = this.createEventElement(event);
      container.appendChild(eventEl);
    });
  }

  renderNextEvents() {
    const container = document.getElementById('nextEvents');
    const nextEvents = this.getNextEvents(5);

    container.innerHTML = '';

    if (nextEvents.length === 0) {
      container.innerHTML = '<p class="empty-state">Sin próximos eventos</p>';
      return;
    }

    nextEvents.forEach(event => {
      const eventEl = this.createEventElement(event);
      container.appendChild(eventEl);
    });
  }

  createEventElement(event) {
    const eventEl = document.createElement('div');
    eventEl.className = 'event-item';

    const contentEl = document.createElement('div');
    contentEl.className = 'event-content';

    const titleEl = document.createElement('div');
    titleEl.className = 'event-title';
    titleEl.textContent = event.title;

    const timeEl = document.createElement('div');
    timeEl.className = 'event-time';
    const dateTime = new Date(`${event.date}T${event.time}`);
    timeEl.textContent = `${event.date} - ${event.time}`;

    const descEl = document.createElement('div');
    descEl.className = 'event-description';
    descEl.textContent = event.description || 'Sin descripción';

    contentEl.appendChild(titleEl);
    contentEl.appendChild(timeEl);
    if (event.description) {
      contentEl.appendChild(descEl);
    }

    const actionsEl = document.createElement('div');
    actionsEl.className = 'event-actions';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = '🗑️';
    deleteBtn.addEventListener('click', () => this.deleteEvent(event.id));

    actionsEl.appendChild(deleteBtn);

    eventEl.appendChild(contentEl);
    eventEl.appendChild(actionsEl);

    return eventEl;
  }

  // ===== RECORDATORIOS =====
  checkReminders() {
    const now = new Date();

    this.events.forEach(event => {
      const eventDateTime = new Date(`${event.date}T${event.time}`);
      const reminderMinutes = parseInt(event.reminderTime);
      const reminderTime = new Date(eventDateTime.getTime() - reminderMinutes * 60000);

      const timeDiff = Math.abs(now.getTime() - reminderTime.getTime());
      const minutes = Math.floor(timeDiff / 60000);

      // Si el recordatorio está dentro de 1 minuto
      if (minutes <= 1 && minutes >= 0 && !this.reminders.has(event.id)) {
        this.showReminder(event);
        this.reminders.set(event.id, true);
        
        // Limpiar el recordatorio después de 2 minutos
        setTimeout(() => this.reminders.delete(event.id), 120000);
      }
    });
  }

  showReminder(event) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`📅 Recordatorio: ${event.title}`, {
        body: `${event.date} - ${event.time}`,
        icon: '📅'
      });
    }
    this.showNotification(`🔔 Recordatorio: ${event.title}`);
  }

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    // Navegación del calendario
    document.getElementById('prevMonth').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.render();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.render();
    });

    // Agregar evento
    document.getElementById('addEventBtn').addEventListener('click', () => {
      const title = document.getElementById('eventTitle').value;
      const description = document.getElementById('eventDescription').value;
      const date = document.getElementById('eventDate').value;
      const time = document.getElementById('eventTime').value;
      const reminderTime = document.getElementById('reminderTime').value;

      if (!date || !time) {
        this.showNotification('⚠️ Completa fecha y hora');
        return;
      }

      this.addEvent(title, description, date, time, reminderTime);
    });

    // Solicitar permisos de notificación
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Set today's date as default in input
    const today = this.formatDate(new Date());
    document.getElementById('eventDate').value = today;
    document.getElementById('eventDate').min = today;
  }

  // ===== UTILIDADES =====
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  clearInputs() {
    document.getElementById('eventTitle').value = '';
    document.getElementById('eventDescription').value = '';
    document.getElementById('eventTime').value = '';
    document.getElementById('reminderTime').value = '0';
    const today = this.formatDate(new Date());
    document.getElementById('eventDate').value = today;
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
  saveEvents() {
    localStorage.setItem(this.storage, JSON.stringify(this.events));
  }

  loadEvents() {
    const data = localStorage.getItem(this.storage);
    this.events = data ? JSON.parse(data) : [];
  }

  // ===== RENDER =====
  render() {
    this.renderCalendar();
    this.renderTodayEvents();
    this.renderNextEvents();
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new AgendaInteligente();
});
