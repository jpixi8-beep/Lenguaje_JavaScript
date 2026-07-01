class KanbanBoard {
    constructor() {
        this.tasks = [];
        this.draggingTask = null;
        this.storage = 'kanban-tasks';
        
        // Propiedades del Pomodoro Timer
        this.timer = null;
        this.timeLeft = .2 * 60; // 25 minutos
        this.running = false;
        
        this.init();
    }

    init() {
        console.log('Inicializando Kanban Board...');
        this.loadTasks();
        this.renderTasks();
        this.setupEventListeners();
        this.setupDragAndDrop();
        this.initializeTimer();
        this.updateTimerDisplay();
    }

    // ===== GESTIÓN DE TAREAS =====
    addTask(text, status = 'todo') {
        const task = {
            id: Date.now(),
            text: text.trim(),
            status: status,
            createdAt: new Date().toLocaleDateString('es-ES')
        };

        if (task.text.length > 0) {
            this.tasks.push(task);
            this.saveTasks();
            this.renderTasks();
            this.clearInput('todo-input');
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            const newText = prompt('Editar tarea:', task.text);
            if (newText && newText.trim()) {
                task.text = newText.trim();
                this.saveTasks();
                this.renderTasks();
            }
        }
    }

    moveTask(id, newStatus) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.status = newStatus;
            this.saveTasks();
            this.renderTasks();
        }
    }

    // ===== ALMACENAMIENTO =====
    saveTasks() {
        localStorage.setItem(this.storage, JSON.stringify(this.tasks));
    }

    loadTasks() {
        const stored = localStorage.getItem(this.storage);
        this.tasks = stored ? JSON.parse(stored) : [];
    }

    clearAllTasks() {
        if (confirm('¿Está seguro de que desea eliminar todas las tareas?')) {
            this.tasks = [];
            this.saveTasks();
            this.renderTasks();
        }
    }

    // ===== POMODORO TIMER =====
    updateTimerDisplay() {
        const timerDisplay = document.getElementById('timer');
        if (timerDisplay) {
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    startTimer() {
        if (this.running) return;
        this.running = true;
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.running = false;
                this.endSession();
            }
        }, 1000);
    }

    pauseTimer() {
        clearInterval(this.timer);
        this.running = false;
    }

    resetTimer() {
        clearInterval(this.timer);
        this.running = false;
        this.timeLeft = 25 * 60;
        this.updateTimerDisplay();
    }

    endSession() {
        // Recolectar tareas de la columna "Done"
        const doneContainer = document.querySelector('[data-status="done"]');
        const doneTasks = doneContainer 
            ? [...doneContainer.querySelectorAll('.task-text')].map(t => t.textContent).join(', ')
            : 'Ninguna';

        // Registrar sesión en tabla
        const logBody = document.getElementById('logBody');
        if (logBody) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${new Date().toLocaleTimeString()}</td>
                           <td>${doneTasks || 'Ninguna'}</td>`;
            logBody.appendChild(row);
        }

        // Reset para nueva sesión
        this.resetTimer();
        alert('¡Sesión Pomodoro completada!');
    }

    initializeTimer() {
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');

        if (startBtn) startBtn.addEventListener('click', () => this.startTimer());
        if (pauseBtn) pauseBtn.addEventListener('click', () => this.pauseTimer());
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetTimer());
    }

    // ===== RENDERIZADO =====
    renderTasks() {
        this.clearAllContainers();
        this.updateCounters();

        this.tasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            const container = document.querySelector(
                `.droppable[data-status="${task.status}"]`
            );
            if (container) {
                container.appendChild(taskElement);
            }
        });
    }

    createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.draggable = true;
        taskDiv.dataset.taskId = task.id;

        taskDiv.innerHTML = `
            <div class="task-content">
                <div class="task-text">${this.escapeHTML(task.text)}</div>
                <div class="task-date">📅 ${task.createdAt}</div>
            </div>
            <div class="task-actions">
                <button class="task-btn btn-edit" title="Editar">✏️</button>
                <button class="task-btn btn-delete" title="Eliminar">🗑️</button>
            </div>
        `;

        // Event listeners para los botones
        taskDiv.querySelector('.btn-edit').addEventListener('click', () => {
            this.editTask(task.id);
        });

        taskDiv.querySelector('.btn-delete').addEventListener('click', () => {
            this.deleteTask(task.id);
        });

        return taskDiv;
    }

    updateCounters() {
        const todoCount = this.tasks.filter(t => t.status === 'todo').length;
        const progressCount = this.tasks.filter(t => t.status === 'progress').length;
        const doneCount = this.tasks.filter(t => t.status === 'done').length;

        document.getElementById('todo-count').textContent = todoCount;
        document.getElementById('progress-count').textContent = progressCount;
        document.getElementById('done-count').textContent = doneCount;
    }

    clearAllContainers() {
        document.querySelectorAll('.droppable').forEach(container => {
            container.innerHTML = '';
        });
    }

    clearInput(inputId) {
        document.getElementById(inputId).value = '';
    }

    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ===== DRAG AND DROP =====
    setupDragAndDrop() {
        const draggables = document.querySelectorAll('.task');
        const droppables = document.querySelectorAll('.droppable');

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', (e) => this.handleDragStart(e));
            draggable.addEventListener('dragend', (e) => this.handleDragEnd(e));
        });

        droppables.forEach(droppable => {
            droppable.addEventListener('dragover', (e) => this.handleDragOver(e));
            droppable.addEventListener('drop', (e) => this.handleDrop(e));
            droppable.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        });
    }

    handleDragStart(e) {
        this.draggingTask = e.target.closest('.task');
        this.draggingTask.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.draggingTask.innerHTML);
    }

    handleDragEnd(e) {
        if (this.draggingTask) {
            this.draggingTask.classList.remove('dragging');
            this.draggingTask = null;
        }
        document.querySelectorAll('.droppable').forEach(zone => {
            zone.classList.remove('drag-over-zone');
        });
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        e.target.closest('.droppable')?.classList.add('drag-over-zone');
    }

    handleDragLeave(e) {
        const droppable = e.target.closest('.droppable');
        if (droppable && e.target === droppable) {
            droppable.classList.remove('drag-over-zone');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        const droppable = e.target.closest('.droppable');
        if (droppable && this.draggingTask) {
            const newStatus = droppable.dataset.status;
            const taskId = parseInt(this.draggingTask.dataset.taskId);
            this.moveTask(taskId, newStatus);
            droppable.classList.remove('drag-over-zone');
        }
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        const todoBtn = document.getElementById('todo-btn');
        const todoInput = document.getElementById('todo-input');

        // Agregar tarea al hacer click en botón
        if (todoBtn) todoBtn.addEventListener('click', () => {
            const text = todoInput.value;
            this.addTask(text, 'todo');
        });

        // Agregar tarea al presionar Enter
        if (todoInput) todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const text = todoInput.value;
                this.addTask(text, 'todo');
            }
        });

        // Limpiar todas las tareas
        const clearAllBtn = document.getElementById('clearAll');
        if (clearAllBtn) clearAllBtn.addEventListener('click', () => {
            this.clearAllTasks();
        });

        // Re-inicializar drag and drop después de renderizar
        const observer = new MutationObserver(() => {
            this.setupDragAndDrop();
        });

        observer.observe(document.querySelector('.kanban-board'), {
            childList: true,
            subtree: true
        });
    }
}

// ===== INICIALIZAR APLICACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    const kanban = new KanbanBoard();
});
