class GestorGastos {
  constructor() {
    this.expenses = [];
    this.budget = 0;
    this.storage = 'gestor-gastos';
    this.storeBudget = 'gestor-presupuesto';
    this.charts = {};

    this.init();
  }

  init() {
    console.log('Inicializando Gestor de Gastos...');
    this.loadData();
    this.setupEventListeners();
    this.setTodayDate();
    this.render();
    this.initializeCharts();
  }

  // ===== GESTIÓN DE GASTOS =====
  addExpense(category, description, amount, date) {
    if (!description.trim() || !amount || amount <= 0) {
      this.showNotification('⚠️ Completa todos los campos correctamente');
      return;
    }

    const expense = {
      id: Date.now(),
      category,
      description: description.trim(),
      amount: parseFloat(amount),
      date,
      createdAt: new Date().toISOString()
    };

    this.expenses.push(expense);
    this.expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

    this.saveData();
    this.render();
    this.showNotification('✅ Gasto agregado correctamente');
  }

  deleteExpense(id) {
    this.expenses = this.expenses.filter(e => e.id !== id);
    this.saveData();
    this.render();
    this.showNotification('🗑️ Gasto eliminado');
  }

  // ===== CÁLCULOS FINANCIEROS =====
  getTotalExpenses() {
    return this.expenses.reduce((sum, e) => sum + e.amount, 0);
  }

  getExpensesByCategory() {
    const categories = {};
    this.expenses.forEach(expense => {
      categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
    });
    return categories;
  }

  getBalance() {
    return this.budget - this.getTotalExpenses();
  }

  getPercentExpense() {
    if (this.budget === 0) return 0;
    return ((this.getTotalExpenses() / this.budget) * 100).toFixed(2);
  }

  getMonthlyData() {
    const monthlyExpenses = {};
    const today = new Date();
    const last12Months = {};

    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      last12Months[monthKey] = 0;
    }

    this.expenses.forEach(expense => {
      const [year, month] = expense.date.split('-').slice(0, 2);
      const monthKey = `${year}-${month}`;
      if (monthKey in last12Months) {
        last12Months[monthKey] += expense.amount;
      }
    });

    return last12Months;
  }

  // ===== ACTUALIZACIÓN DE UI =====
  updateSummaryCards() {
    const totalBudget = this.budget;
    const totalExpenses = this.getTotalExpenses();
    const balance = this.getBalance();
    const percent = this.getPercentExpense();

    document.getElementById('totalBudget').textContent = `$${totalBudget.toFixed(2)}`;
    document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
    
    const balanceEl = document.getElementById('balance');
    balanceEl.textContent = `$${balance.toFixed(2)}`;
    balanceEl.style.color = balance >= 0 ? '#86efac' : '#ff6b6b';

    const percentEl = document.getElementById('percentExpense');
    percentEl.textContent = `${percent}%`;
    percentEl.style.color = percent <= 100 ? '#86efac' : '#ff6b6b';
  }

  renderExpensesTable(filter = '') {
    const tbody = document.querySelector('.expenses-table tbody');
    const noExpenses = document.getElementById('noExpenses');
    tbody.innerHTML = '';

    let filteredExpenses = this.expenses;
    if (filter) {
      filteredExpenses = this.expenses.filter(e => e.category === filter);
    }

    if (filteredExpenses.length === 0) {
      noExpenses.style.display = 'block';
      return;
    }

    noExpenses.style.display = 'none';

    filteredExpenses.forEach(expense => {
      const row = document.createElement('tr');
      
      const categoryEmoji = {
        'Comida': '🍔',
        'Transporte': '🚗',
        'Entretenimiento': '🎮',
        'Salud': '⚕️',
        'Educación': '📚',
        'Servicios': '💡',
        'Compras': '🛍️',
        'Otros': '📦'
      };

      row.innerHTML = `
        <td>${expense.date}</td>
        <td class="category">${categoryEmoji[expense.category]} ${expense.category}</td>
        <td>${expense.description}</td>
        <td class="amount">$${expense.amount.toFixed(2)}</td>
        <td>
          <button class="btn-delete" onclick="gastos.deleteExpense(${expense.id})">🗑️</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  // ===== GRÁFICOS =====
  initializeCharts() {
    this.updateCategoryChart();
    this.updateMonthlyChart();
  }

  updateCategoryChart() {
    const ctx = document.getElementById('categoryChart')?.getContext('2d');
    if (!ctx) return;

    const categoryData = this.getExpensesByCategory();
    const labels = Object.keys(categoryData);
    const data = Object.values(categoryData);

    const colors = [
      '#ff6b6b',
      '#4ecdc4',
      '#45b7d1',
      '#f9ca24',
      '#6c5ce7',
      '#a29bfe',
      '#fd79a8',
      '#fdcb6e'
    ];

    if (this.charts.category) {
      this.charts.category.destroy();
    }

    this.charts.category = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors.slice(0, labels.length),
            borderColor: '#16213e',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#e0e0e0',
              padding: 15,
              font: {
                size: 12
              }
            }
          }
        }
      }
    });
  }

  updateMonthlyChart() {
    const ctx = document.getElementById('monthlyChart')?.getContext('2d');
    if (!ctx) return;

    const monthlyData = this.getMonthlyData();
    const labels = Object.keys(monthlyData).map(m => {
      const [year, month] = m.split('-');
      const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      return monthNames[parseInt(month) - 1];
    });
    const data = Object.values(monthlyData);

    if (this.charts.monthly) {
      this.charts.monthly.destroy();
    }

    this.charts.monthly = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Gastos Mensuales',
            data,
            borderColor: '#4ade80',
            backgroundColor: 'rgba(74, 222, 128, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#4ade80',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            labels: {
              color: '#e0e0e0'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#aaa',
              callback: function(value) {
                return '$' + value;
              }
            },
            grid: {
              color: '#1a4d7a'
            }
          },
          x: {
            ticks: {
              color: '#aaa'
            },
            grid: {
              color: '#1a4d7a'
            }
          }
        }
      }
    });
  }

  // ===== EXPORTAR DATOS =====
  exportToCSV() {
    if (this.expenses.length === 0) {
      this.showNotification('⚠️ No hay gastos para exportar');
      return;
    }

    let csv = 'Fecha,Categoría,Descripción,Monto\n';
    
    this.expenses.forEach(expense => {
      csv += `${expense.date},"${expense.category}","${expense.description}",${expense.amount}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gastos_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    this.showNotification('📥 Gastos exportados a CSV');
  }

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    // Agregar gasto
    document.getElementById('expenseForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const category = document.getElementById('expenseCategory').value;
      const description = document.getElementById('expenseDescription').value;
      const amount = document.getElementById('expenseAmount').value;
      const date = document.getElementById('expenseDate').value;

      this.addExpense(category, description, amount, date);
      document.getElementById('expenseForm').reset();
      document.getElementById('expenseCategory').value = '';
      this.setTodayDate();
    });

    // Presupuesto
    document.getElementById('setBudgetBtn').addEventListener('click', () => {
      const amount = parseFloat(document.getElementById('budgetAmount').value);
      if (amount > 0) {
        this.budget = amount;
        this.saveData();
        this.render();
        this.showNotification(`💰 Presupuesto establecido en $${amount.toFixed(2)}`);
        document.getElementById('budgetAmount').value = '';
      } else {
        this.showNotification('⚠️ Ingresa un monto válido');
      }
    });

    // Filtro de categoría
    document.getElementById('filterCategory').addEventListener('change', (e) => {
      this.renderExpensesTable(e.target.value);
    });

    // Exportar CSV
    document.getElementById('exportBtn').addEventListener('click', () => {
      this.exportToCSV();
    });
  }

  setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('expenseDate').value = today;
    document.getElementById('expenseDate').min = '2020-01-01';
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
    localStorage.setItem(this.storage, JSON.stringify(this.expenses));
    localStorage.setItem(this.storeBudget, this.budget);
  }

  loadData() {
    const data = localStorage.getItem(this.storage);
    this.expenses = data ? JSON.parse(data) : [];
    const budget = localStorage.getItem(this.storeBudget);
    this.budget = budget ? parseFloat(budget) : 0;
  }

  // ===== RENDER =====
  render() {
    this.updateSummaryCards();
    this.renderExpensesTable();
    this.updateCategoryChart();
    this.updateMonthlyChart();
  }
}

// Variable global para acceder desde HTML
let gastos;

document.addEventListener('DOMContentLoaded', () => {
  gastos = new GestorGastos();
});
