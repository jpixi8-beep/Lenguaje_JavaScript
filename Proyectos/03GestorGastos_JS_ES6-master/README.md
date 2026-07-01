# 💰 Gestor de Gastos Personal – Análisis Financiero Interactivo

Aplicación web moderna desarrollada en **JavaScript ES6 Vanilla** para gestionar y visualizar gastos personales con gráficos interactivos en tiempo real usando **Chart.js**. Ideal para controlar tu presupuesto y analizar patrones de gasto.

---

## 🚀 Características principales

- **Panel de resumen**:
  - Presupuesto total establecido.
  - Gastos totales acumulados.
  - Balance disponible (presupuesto - gastos).
  - Porcentaje de gasto vs presupuesto.

- **Gestión de gastos**:
  - Agregar gastos por categoría con descripción.
  - Eliminar gastos individuales.
  - Persistencia automática en `localStorage`.

- **8 Categorías principales**:
  - 🍔 Comida
  - 🚗 Transporte
  - 🎮 Entretenimiento
  - ⚕️ Salud
  - 📚 Educación
  - 💡 Servicios
  - 🛍️ Compras
  - 📦 Otros

- **Visualización con gráficos**:
  - **Gráfico de pastel**: Distribución de gastos por categoría.
  - **Gráfico de línea**: Progresión mensual de gastos (últimos 12 meses).
  - Leyendas interactivas y responsive.

- **Historial completo**:
  - Tabla con todos los gastos registrados.
  - Filtrado por categoría.
  - **Exportación a CSV** para análisis en Excel/Sheets.

- **Presupuesto inteligente**:
  - Establece tu presupuesto mensual.
  - Indicador visual de alerta si excedes el presupuesto.
  - Balance en tiempo real.

- **Diseño moderno y responsive**:
  - Paleta oscura con acentos verdes.
  - Grid layout adaptable a móviles y tablet.
  - Animaciones suaves.

---

## 📸 Pantallazo de ejemplo

![Expense Manager Example](image.png)

---

## 🛠️ Tecnologías utilizadas

- **HTML5** – Estructura semántica.
- **CSS3** – Flexbox/Grid, gradientes, animaciones y mediaqueries.
- **JavaScript ES6** – Clases, métodos, arrow functions, destructuring.
- **Chart.js** – Gráficos interactivos (https://cdn.jsdelivr.net/npm/chart.js).
- **LocalStorage** – Persistencia de datos en navegador.

---

## 📋 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para CDN de Chart.js)
- No requiere servidor backend

---

## 🚀 Cómo correr localmente

### Opción 1: Abrir directamente
1. Descarga o clona el repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo! La aplicación está lista para usar

### Opción 2: Con servidor local (recomendado)
```bash
# Navega a la carpeta del proyecto
cd 03GestorGastos

# Con Python 3
python -m http.server 8000

# O con Node.js + http-server
npx http-server

# Accede a: http://localhost:8000
```

---

## 📖 Cómo usar

1. **Establecer presupuesto**: Ingresa tu presupuesto mensual en la sección "Establecer Presupuesto".
2. **Agregar gastos**: Completa la categoría, descripción, monto y fecha.
3. **Ver análisis**: Los gráficos se actualizan automáticamente.
4. **Filtrar gastos**: Usa el selector de categoría en el historial.
5. **Exportar datos**: Descarga un archivo CSV para análisis en Excel.

---

## 🎨 Estructura del código

```javascript
class GestorGastos {
  // Gestión de gastos
  addExpense()
  deleteExpense()

  // Cálculos financieros
  getTotalExpenses()
  getExpensesByCategory()
  getBalance()
  getPercentExpense()
  getMonthlyData()

  // Gráficos
  updateCategoryChart()
  updateMonthlyChart()

  // Exportación
  exportToCSV()

  // Almacenamiento
  saveData()
  loadData()
}
```

---

## 📊 Datos y cálculos

### Fórmulas utilizadas

- **Balance**: `Presupuesto - Gastos Totales`
- **Porcentaje gasto**: `(Gastos Totales / Presupuesto) × 100`
- **Gastos por categoría**: Suma de todos los gastos de esa categoría
- **Progresión mensual**: Suma de gastos por mes (últimos 12 meses)

---

## 🔐 Almacenamiento de datos

Todos los gastos se guardan en `localStorage`:
- Clave de expenses: `gestor-gastos`
- Clave de presupuesto: `gestor-presupuesto`
- Formato: JSON serializado
- Los datos persisten entre sesiones

---

## 💾 Exportación CSV

Descarga tus gastos en formato CSV con columnas:
- Fecha
- Categoría
- Descripción
- Monto

Compatible con:
- Microsoft Excel
- Google Sheets
- Numbers (Mac)
- Cualquier editor de hojas de cálculo

---

## ⚡ Características avanzadas

- **Gráficos responsivos**: Se adaptan al tamaño de pantalla
- **Cálculos en tiempo real**: Los totales se actualizan instantáneamente
- **Validación de formularios**: Evita datos inválidos
- **Últimos 12 meses**: La progresión muestra automáticamente el año completo

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Los gráficos no aparecen | Verifica tu conexión a internet (CDN Chart.js) |
| Los gastos no se guardan | Limpia localStorage: `localStorage.clear()` |
| Números negativos en gasto | Verifica que ingreses un monto positivo |
| Gráfico desalineado | Recarga la página (F5) |

---

## 🚀 Mejoras futuras

- Exportación a PDF con gráficos
- Categorías personalizadas
- Metas de gasto por categoría con alerta
- Sincronización con Google Drive
- Modo multimoneda
- Análisis de tendencias de gastos

---

## 📝 Licencia

Proyecto personal para portfolio. Libre para usar y modificar.

---

**Desarrollado por**: Jorge A. Fuentes (Lechu)  
**Última actualización**: Febrero 2026
