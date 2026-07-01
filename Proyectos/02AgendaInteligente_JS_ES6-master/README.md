# 📅 Agenda Inteligente – Calendario y Recordatorios

Aplicación web interactiva desarrollada en **JavaScript ES6 Vanilla** que permite gestionar eventos con un calendario visual intuitivo, recordatorios automáticos y notificaciones en tiempo real.

---

## 🚀 Características principales

- **Calendario interactivo**:
  - Vista mensual con navegación anterior/siguiente.
  - Indicadores visuales de días con eventos.
  - Selector de fechas para crear eventos.

- **Gestión de eventos**:
  - Crear, visualizar y eliminar eventos.
  - Descripción detallada para cada evento.
  - Persistencia en `localStorage`.

- **Sistema de recordatorios**:
  - Recordatorios en diferentes momentos (5 min, 15 min, 30 min, 1 hora, 1 día).
  - Notificaciones del navegador (si está permitido).
  - Verificación automática cada minuto.

- **Vistas dinámicas**:
  - **Eventos de hoy**: Muestra todos los compromisos del día actual.
  - **Próximos eventos**: Listado de los 5 próximos eventos ordenados.
  - Selección de fecha para ver eventos específicos.

- **Diseño moderno y responsive**:
  - Paleta oscura con acentos cian/azul.
  - Layout responsive para móviles y escritorio.
  - Animaciones suaves y transiciones.

---

## 📸 Pantallazo de ejemplo

![Calendar Example](image.png)

---

## 🛠️ Tecnologías utilizadas

- **HTML5** – Estructura semántica y accesibilidad.
- **CSS3** – Diseño responsive con Flexbox/Grid, gradientes y animaciones.
- **JavaScript ES6** – Clases, métodos, gestión de eventos, localStorage.
- **Notification API** – Recordatorios del navegador (opcional).
- **LocalStorage** – Persistencia de datos en el cliente.

---

## 📋 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Soporte para ES6+ y Notifications API
- No requiere servidor backend

---

## 🚀 Cómo correr localmente

### Opción 1: Abrir directamente
1. Descarga o clona el repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo! La aplicación está lista para usar

### Opción 2: Con un servidor local (recomendado)
```bash
# Navega a la carpeta del proyecto
cd 02AgendaInteligente

# Con Python 3
python -m http.server 8000

# O con Node.js + http-server
npx http-server

# Accede a: http://localhost:8000
```

---

## 📖 Cómo usar

1. **Ver calendario**: Navega entre meses con los botones de anterior/siguiente.
2. **Crear evento**: Completa fecha, hora, título y descripción, luego presiona "Agregar Evento".
3. **Configurar recordatorio**: Selecciona cuándo quieres ser notificado antes del evento.
4. **Ver eventos**: Los eventos aparecen en "Eventos de hoy" y "Próximos eventos".
5. **Eliminar evento**: Presiona el botón 🗑️ en cualquier evento.

---

## 🎨 Estructura del código

```javascript
class AgendaInteligente {
  // Gestión de eventos
  addEvent()
  deleteEvent()
  getEventsByDate()

  // Calendario
  renderCalendar()
  getDaysInMonth()

  // Recordatorios
  checkReminders()
  showReminder()

  // Almacenamiento
  saveEvents()
  loadEvents()
}
```

---

## 🔐 Almacenamiento de datos

Todos los eventos se guardan en `localStorage` del navegador:
- Clave: `agenda-events`
- Formato: JSON serializado
- Los datos persisten incluso después de cerrar la pestaña

---

## ⚡ Características avanzadas

- **Notificaciones del navegador**: Si das permiso, recibirás notificaciones automáticas del SO
- **Recordatorios inteligentes**: Se validan una sola vez por evento
- **Diseño accesible**: Colores contrastantes y estructura semántica

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| No aparecen las notificaciones | Verifica que permitiste las notificaciones del navegador |
| Los eventos no se guardan | Limpia el localStorage: `localStorage.clear()` |
| Calendario desalineado | Recarga la página (F5) |

---

## 📝 Licencia

Proyecto personal para portfolio. Libre para usar y modificar.

---

**Desarrollado por**: Jorge A. Fuentes (Lechu)  
**Última actualización**: Febrero 2026
