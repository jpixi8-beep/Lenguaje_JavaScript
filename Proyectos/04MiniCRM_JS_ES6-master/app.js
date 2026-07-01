class MiniCRM {
  constructor() {
    this.clients = [];
    this.storage = 'mini-crm-clients';
    this.currentClientId = null;
    this.filteredClients = [];

    this.init();
  }

  init() {
    console.log('Inicializando Mini CRM...');
    this.loadClients();
    this.setupEventListeners();
    this.render();
  }

  // ===== GESTIÓN DE CLIENTES =====
  addClient(name, email, phone, company, status) {
    if (!name.trim() || !email.trim()) {
      this.showNotification('⚠️ El nombre y email son requeridos');
      return;
    }

    const client = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      status,
      notes: [],
      createdAt: new Date().toISOString()
    };

    this.clients.push(client);
    this.clients.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    this.saveClients();
    this.render();
    this.clearForm();
    this.showNotification(`✅ Cliente ${name} agregado correctamente`);
  }

  updateClient(id, name, email, phone, company, status) {
    const client = this.clients.find(c => c.id === id);
    if (client) {
      client.name = name.trim();
      client.email = email.trim();
      client.phone = phone.trim();
      client.company = company.trim();
      client.status = status;
      
      this.saveClients();
      this.render();
      this.closeEditModal();
      this.showNotification('✅ Cliente actualizado correctamente');
    }
  }

  deleteClient(id) {
    const client = this.clients.find(c => c.id === id);
    if (confirm(`¿Confirmar eliminación de ${client.name}?`)) {
      this.clients = this.clients.filter(c => c.id !== id);
      this.saveClients();
      this.render();
      this.closeModal();
      this.showNotification('🗑️ Cliente eliminado');
    }
  }

  // ===== NOTAS =====
  addNote(clientId, noteText) {
    const client = this.clients.find(c => c.id === clientId);
    if (client && noteText.trim()) {
      const note = {
        id: Date.now(),
        text: noteText.trim(),
        createdAt: new Date().toISOString()
      };
      client.notes.push(note);
      this.saveClients();
      this.openClientModal(clientId);
      this.showNotification('📝 Nota agregada correctamente');
    }
  }

  deleteNote(clientId, noteId) {
    const client = this.clients.find(c => c.id === clientId);
    if (client) {
      client.notes = client.notes.filter(n => n.id !== noteId);
      this.saveClients();
      this.openClientModal(clientId);
      this.showNotification('🗑️ Nota eliminada');
    }
  }

  // ===== FILTROS Y BÚSQUEDA =====
  filterClients(searchTerm = '', statusFilter = '') {
    this.filteredClients = this.clients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !statusFilter || client.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    this.renderClients();
  }

  // ===== ESTADÍSTICAS =====
  updateStats() {
    const total = this.clients.length;
    const active = this.clients.filter(c => c.status === 'Cliente Activo').length;
    const potential = this.clients.filter(c => c.status === 'Potencial').length;
    const conversation = this.clients.filter(c => c.status === 'En Conversación').length;

    document.getElementById('totalClients').textContent = total;
    document.getElementById('activeClients').textContent = active;
    document.getElementById('potentialClients').textContent = potential;
    document.getElementById('conversationClients').textContent = conversation;
  }

  // ===== EXPORTACIÓN =====
  exportToCSV() {
    if (this.clients.length === 0) {
      this.showNotification('⚠️ No hay clientes para exportar');
      return;
    }

    let csv = 'Nombre,Email,Teléfono,Empresa,Estado,Fecha de Registro\n';
    
    this.clients.forEach(client => {
      const date = new Date(client.createdAt).toLocaleDateString('es-ES');
      csv += `"${client.name}","${client.email}","${client.phone}","${client.company}","${client.status}","${date}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clientes_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    this.showNotification('📥 Clientes exportados a CSV');
  }

  // ===== RENDERIZACIÓN =====
  renderClients() {
    const list = document.getElementById('clientsList');
    const noClients = document.getElementById('noClients');
    const displayClients = this.filteredClients.length > 0 ? this.filteredClients : this.clients;

    list.innerHTML = '';

    if (displayClients.length === 0) {
      noClients.style.display = 'block';
      return;
    }

    noClients.style.display = 'none';

    displayClients.forEach(client => {
      const card = document.createElement('div');
      card.className = 'client-card';

      const statusClass = this.getStatusClass(client.status);
      const date = new Date(client.createdAt).toLocaleDateString('es-ES');

      card.innerHTML = `
        <div class="client-card-header">
          <div class="client-name">${client.name}</div>
          <span class="client-status ${statusClass}">${client.status}</span>
        </div>
        <div class="client-info">
          <div class="info-row">
            <strong>📧</strong>
            <span>${client.email}</span>
          </div>
          ${client.phone ? `
            <div class="info-row">
              <strong>📱</strong>
              <span>${client.phone}</span>
            </div>
          ` : ''}
          ${client.company ? `
            <div class="info-row">
              <strong>🏢</strong>
              <span>${client.company}</span>
            </div>
          ` : ''}
          <div class="info-row">
            <strong>📅</strong>
            <span>${date}</span>
          </div>
        </div>
        <div class="client-actions">
          <button class="btn-icon" onclick="crm.openClientModal(${client.id})">Ver</button>
          <button class="btn-icon delete" onclick="crm.deleteClient(${client.id})">Eliminar</button>
        </div>
      `;

      list.appendChild(card);
    });
  }

  // ===== MODALES =====
  openClientModal(id) {
    const client = this.clients.find(c => c.id === id);
    if (!client) return;

    this.currentClientId = id;
    const modal = document.getElementById('clientModal');

    document.getElementById('modalClientName').textContent = client.name;
    document.getElementById('modalEmail').textContent = client.email;
    document.getElementById('modalPhone').textContent = client.phone || 'No registrado';
    document.getElementById('modalCompany').textContent = client.company || 'No registrado';
    document.getElementById('modalStatus').textContent = client.status;
    document.getElementById('modalDate').textContent = new Date(client.createdAt).toLocaleDateString('es-ES');

    this.renderNotes(client.notes);
    modal.classList.remove('hidden');
  }

  renderNotes(notes) {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    if (notes.length === 0) {
      notesList.innerHTML = '<p class="empty-state">Sin notas aún</p>';
      return;
    }

    notes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.className = 'note-item';
      const date = new Date(note.createdAt).toLocaleDateString('es-ES');

      noteEl.innerHTML = `
        <button class="note-delete" onclick="crm.deleteNote(${this.currentClientId}, ${note.id})">✕</button>
        <div class="note-text">${note.text}</div>
        <div class="note-date">${date}</div>
      `;

      notesList.appendChild(noteEl);
    });
  }

  openEditModal() {
    const client = this.clients.find(c => c.id === this.currentClientId);
    if (!client) return;

    document.getElementById('editName').value = client.name;
    document.getElementById('editEmail').value = client.email;
    document.getElementById('editPhone').value = client.phone;
    document.getElementById('editCompany').value = client.company;
    document.getElementById('editStatus').value = client.status;

    document.getElementById('clientModal').classList.add('hidden');
    document.getElementById('editModal').classList.remove('hidden');
  }

  closeModal() {
    document.getElementById('clientModal').classList.add('hidden');
    this.currentClientId = null;
  }

  closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
    this.openClientModal(this.currentClientId);
  }

  // ===== UTILIDADES =====
  getStatusClass(status) {
    const classes = {
      'Potencial': 'status-potencial',
      'Cliente Activo': 'status-activo',
      'En Conversación': 'status-conversacion',
      'Inactivo': 'status-inactivo'
    };
    return classes[status] || '';
  }

  clearForm() {
    document.getElementById('clientForm').reset();
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

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    // Agregar cliente
    document.getElementById('clientForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName').value;
      const email = document.getElementById('clientEmail').value;
      const phone = document.getElementById('clientPhone').value;
      const company = document.getElementById('clientCompany').value;
      const status = document.getElementById('clientStatus').value;

      this.addClient(name, email, phone, company, status);
    });

    // Búsqueda y filtrado
    document.getElementById('searchInput').addEventListener('input', (e) => {
      const search = e.target.value;
      const status = document.getElementById('filterStatus').value;
      this.filterClients(search, status);
    });

    document.getElementById('filterStatus').addEventListener('change', (e) => {
      const search = document.getElementById('searchInput').value;
      const status = e.target.value;
      this.filterClients(search, status);
    });

    // Exportar
    document.getElementById('exportBtn').addEventListener('click', () => {
      this.exportToCSV();
    });

    // Limpiar todo
    document.getElementById('resetBtn').addEventListener('click', () => {
      if (confirm('¿Eliminar todos los clientes?')) {
        this.clients = [];
        this.saveClients();
        this.render();
        this.showNotification('🗑️ Todos los clientes han sido eliminados');
      }
    });

    // Modal de detalles
    document.getElementById('closeModal').addEventListener('click', () => {
      this.closeModal();
    });

    document.getElementById('addNoteBtn').addEventListener('click', () => {
      const noteText = document.getElementById('noteInput').value;
      this.addNote(this.currentClientId, noteText);
      document.getElementById('noteInput').value = '';
    });

    document.getElementById('editClientBtn').addEventListener('click', () => {
      this.openEditModal();
    });

    document.getElementById('deleteClientBtn').addEventListener('click', () => {
      this.deleteClient(this.currentClientId);
    });

    // Modal de edición
    document.getElementById('closeEditModal').addEventListener('click', () => {
      this.closeEditModal();
    });

    document.getElementById('cancelEditBtn').addEventListener('click', () => {
      this.closeEditModal();
    });

    document.getElementById('editForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('editName').value;
      const email = document.getElementById('editEmail').value;
      const phone = document.getElementById('editPhone').value;
      const company = document.getElementById('editCompany').value;
      const status = document.getElementById('editStatus').value;

      this.updateClient(this.currentClientId, name, email, phone, company, status);
    });

    // Cerrar modales al hacer clic fuera
    document.getElementById('clientModal').addEventListener('click', (e) => {
      if (e.target.id === 'clientModal') this.closeModal();
    });

    document.getElementById('editModal').addEventListener('click', (e) => {
      if (e.target.id === 'editModal') this.closeEditModal();
    });
  }

  // ===== ALMACENAMIENTO =====
  saveClients() {
    localStorage.setItem(this.storage, JSON.stringify(this.clients));
  }

  loadClients() {
    const data = localStorage.getItem(this.storage);
    this.clients = data ? JSON.parse(data) : [];
  }

  // ===== RENDER PRINCIPAL =====
  render() {
    this.renderClients();
    this.updateStats();
  }
}

// Variable global
let crm;

document.addEventListener('DOMContentLoaded', () => {
  crm = new MiniCRM();
});
