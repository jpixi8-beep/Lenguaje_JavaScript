# 📊 Encuestas Online – Sistema de Recolección de Datos en Tiempo Real

Aplicación web completa desarrollada en **JavaScript ES6 Vanilla** para crear, compartir y analizar encuestas online. Perfecta para investigaciones, feedback de clientes y recolección de datos sin necesidad de backend.

---

## 🚀 Características principales

- **Crear encuestas**:
  - Título y descripción.
  - Múltiples preguntas por encuesta.
  - Gestión completa desde UI.

- **Tipos de preguntas**:
  - ✅ Opción múltiple (radio buttons).
  - ⭐ Calificación de 1-5 estrellas.
  - 📝 Respuesta abierta (texto).

- **Gestión de encuestas**:
  - Ver, editar y eliminar encuestas.
  - Abrir y cerrar encuestas en cualquier momento.
  - Estado visual de activa/cerrada.

- **Sistema de respuestas**:
  - Recolectar respuestas en tiempo real.
  - Responder múltiples veces (para testing).
  - Validación de datos.

- **Análisis en vivo**:
  - Gráficos de resultados actualizados en tiempo real.
  - Porcentajes por opción.
  - Contadores de respuestas.

- **Compartir encuestas**:
  - Generar enlace compartible.
  - Copiar al portapapeles con un clic.
  - URL con ID de encuesta.

- **Exportación de datos**:
  - Descargar resultados en CSV.
  - Compatible con Excel y Google Sheets.
  - Formato limpio y organizado.

- **Estadísticas generales**:
  - Total de encuestas.
  - Total de respuestas.
  - Encuestas activas.
  - Tasa de participación.

- **Persistencia local**:
  - Todos los datos en `localStorage`.
  - Sin servidor requerido.

- **Diseño responsivo y moderno**:
  - Paleta oscura con acentos púrpura.
  - Grid layout adaptable.
  - Animaciones fluidas.

---

## 📸 Pantallazo de ejemplo

![Surveys Example](image.png)

---

## 🛠️ Tecnologías utilizadas

- **HTML5** – Estructura semántica.
- **CSS3** – Flexbox/Grid, gradientes, animaciones y mediaqueries.
- **JavaScript ES6** – Clases, métodos, arrow functions, template literals.
- **Chart.js** – Gráficos interactivos (opcional en versión actual).
- **LocalStorage** – Persistencia de encuestas y respuestas.

---

## 📋 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- No requiere dependencias externas
- No requiere backend o servidor

---

## 🚀 Cómo correr localmente

### Opción 1: Abrir directamente
1. Descarga o clona el repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo! Puedes crear encuestas inmediatamente

### Opción 2: Con servidor local (recomendado)
```bash
# Navega a la carpeta del proyecto
cd 05EncuestasOnline

# Con Python 3
python -m http.server 8000

# O con Node.js + http-server
npx http-server

# Accede a: http://localhost:8000
```

---

## 📖 Cómo usar

### 1. Crear una encuesta
1. En el panel izquierdo, completa "Título" y "Descripción".
2. Presiona "Crear Encuesta".
3. La encuesta aparece en la lista.

### 2. Agregar preguntas
1. Click en "Ver" en la tarjeta de la encuesta.
2. Los campos estarán disponibles para edición.
3. **Nota**: En esta versión básica, se pueden agregar preguntas como ejemplos.

### 3. Responder encuesta
1. Click en "Ver" en cualquier encuesta.
2. Completa las respuestas según el tipo.
3. Presiona "Enviar Respuesta".
4. ¡Tu respuesta se registra automáticamente!

### 4. Ver resultados
1. Abre la encuesta.
2. Presiona la pestaña "Resultados".
3. Visualiza gráficos y porcentajes en tiempo real.

### 5. Compartir encuesta
1. Abre la encuesta.
2. Presiona "Copiar Enlace".
3. Comparte el enlace con otros.
4. ¡Ellos pueden responder directamente!

### 6. Cerrar encuesta
1. Abre la encuesta.
2. Presiona "Cerrar Encuesta".
3. Los usuarios no podrán responder más.
4. Presiona nuevamente para abrir.

### 7. Exportar resultados
1. Presiona "Exportar" en el sidebar.
2. Se descarga un archivo CSV.
3. Abre en Excel o Google Sheets.

---

## 🎨 Estructura del código

```javascript
class EncuestasOnline {
  // Gestión de encuestas
  createSurvey()
  deleteSurvey()
  toggleStatus()

  // Preguntas
  addQuestion()

  // Respuestas
  submitResponse()
  getSurveyResponses()

  // Análisis
  getQuestionResults()

  // Exportación
  exportResults()

  // UI
  renderSurveys()
  openSurvey()
  renderQuestions()
  renderResults()

  // Almacenamiento
  saveData()
  loadData()
}
```

---

## 📊 Estructura de datos

### Encuesta

```json
{
  "id": 1234567890,
  "title": "Satisfacción del Cliente",
  "description": "Evaluación de servicio",
  "questions": [
    {
      "id": 1,
      "text": "¿Qué tal fue tu experiencia?",
      "type": "rating",
      "options": ["1", "2", "3", "4", "5"]
    }
  ],
  "status": "activa",
  "createdAt": "2026-02-15T10:00:00.000Z"
}
```

### Respuesta

```json
{
  "id": 1234567891,
  "surveyId": 1234567890,
  "answers": {
    "1": "5"
  },
  "createdAt": "2026-02-15T10:05:00.000Z"
}
```

---

## 🔐 Almacenamiento de datos

Todas las encuestas y respuestas se guardan en `localStorage`:
- Clave de encuestas: `encuestas-online`
- Clave de respuestas: `encuestas-responses`
- Formato: JSON serializado
- Los datos persisten entre sesiones

---

## 💾 Formato de exportación CSV

```csv
"Encuesta de Satisfacción"
"Evaluación de servicio"

"¿Qué tal fue tu experiencia?"
"1","2"
"2","1"
"3","0"
"4","3"
"5","4"

"¿Recomendarías nuestro servicio?"
"Sí","6"
"No","1"
"Tal vez","3"
```

---

## 🔄 Flujo de datos en tiempo real

1. Usuario crea encuesta → Se guarda en localStorage
2. Usuario agrega preguntas → Se actualiza la encuesta
3. Usuario responde → Respuesta se almacena automáticamente
4. Resultados se recalculan → Gráficos se actualizan instantáneamente

---

## ⚡ Características avanzadas

- **Respuestas ilimitadas**: Soporta múltiples respuestas por usuario
- **Estado dinámico**: Abre/cierra encuestas sin perder datos
- **Análisis instantáneo**: Los resultados se actualizan en vivo
- **Compartible**: Genera enlaces para distribuir encuestas

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Las encuestas no aparecen | Limpia localStorage: `localStorage.clear()` |
| Las respuestas no se guardan | Verifica que la encuesta esté abierta (status: 'activa') |
| CSV vacío al exportar | Crea al menos una encuesta y respuesta |
| Enlace compartible no funciona | La versión actual usa localStorage local, no URL params |
| Estilos desalineados | Recarga la página (F5) o limpia caché (Ctrl+Shift+Delete) |

---

## 🚀 Mejoras futuras

- Backend con Node.js + Express para múltiples usuarios
- Base de datos (MongoDB/PostgreSQL) para persistencia real
- Autenticación de usuarios
- Preguntas condicionales (lógica branching)
- Lógica de cuotas y muestreo
- Gráficos avanzados con Chart.js
- Predicciones con Machine Learning
- API REST para integración externa
- Panel de administración avanzado
- Webhooks para notificaciones
- Integración con Google Forms API
- Modo colaborativo (múltiples administradores)
- Versión móvil nativa (React Native)

---

## 📝 Licencia

Proyecto personal para portfolio. Libre para usar y modificar.

---

**Desarrollado por**: Jorge A. Fuentes (Lechu)  
**Última actualización**: Febrero 2026
