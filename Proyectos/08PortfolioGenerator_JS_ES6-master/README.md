# 🎨 Portfolio Generator – Crea tu Portafolio sin Código

Aplicación web potente desarrollada en **JavaScript ES6 Vanilla** que permite crear y personalizar un portafolio profesional en segundos sin escribir una línea de código. Perfecto para developers, diseñadores y creadores.

---

## 🚀 Características principales

- **Editor intuitivo**:
  - Formulario lateral fácil de usar.
  - Vista previa en tiempo real.
  - Guardado automático en localStorage.

- **Información personal**:
  - Nombre completo, profesión, biografía.
  - Contacto: email, teléfono, ubicación.
  - Completamente personalizable.

- **Gestión de proyectos**:
  - Agregar múltiples proyectos.
  - Descripción, tecnologías y enlace.
  - Eliminar proyectos fácilmente.
  - Modal para agregar proyectos.

- **Habilidades**:
  - Agregar habilidades separadas por comas.
  - Visualización en grid responsivo.
  - Actualización en tiempo real.

- **Redes Sociales**:
  - GitHub, LinkedIn, Twitter.
  - Enlaces a tus perfiles.
  - Iconos en la presentación.

- **Temas personalizables**:
  - 🌙 Oscuro (predeterminado)
  - ☀️ Claro
  - 💜 Púrpura
  - 💚 Verde
  - Cambio instantáneo de tema.

- **Vista previa profesional**:
  - Renderizado en tiempo real.
  - Diseño limpio y moderno.
  - Totalmente responsivo.

- **Persistencia de datos**:
  - Todos los datos guardados en localStorage.
  - Se recuperan automáticamente al cargar.
  - No se pierden al cerrar la sesión.

---

## 📸 Pantallazo de ejemplo

![Portfolio Generator Example](image.png)

---

## 🛠️ Tecnologías utilizadas

- **HTML5** – Estructura semántica.
- **CSS3** – Flexbox, Grid, Gradientes y Animaciones.
- **JavaScript ES6** – Clases, método, arrow functions, destructuring.
- **LocalStorage** – Persistencia de datos en cliente.
- **Modal System** – Para agregar proyectos.

---

## 📋 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- No requiere dependencias externas
- No requiere servidor backend

---

## 🚀 Cómo correr localmente

### Opción 1: Abrir directamente
1. Descarga o clona el repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo! Comienza a crear tu portafolio

### Opción 2: Con servidor local (recomendado)
```bash
# Navega a la carpeta del proyecto
cd 07PortfolioGenerator_JS_ES6

# Con Python 3
python -m http.server 8000

# O con Node.js + http-server
npx http-server

# Accede a: http://localhost:8000
```

---

## 📖 Cómo usar

### 1. Completa tu información
1. Ingresa tu nombre, profesión y biografía.
2. Agrega tu contacto (email, teléfono, ubicación).
3. Los cambios se ven en tiempo real.

### 2. Agrega tus habilidades
1. Escribe tus habilidades separadas por comas.
2. Ejemplo: `JavaScript, React, Node.js, CSS3`
3. Se mostrarán como badges en tu portafolio.

### 3. Agrega tus proyectos
1. Presiona "+ Agregar Proyecto".
2. Completa el formulario del proyecto.
3. Presiona "Guardar Proyecto".
4. Aparecerá en la vista previa.

### 4. Conecta tus redes
1. Agrega los enlaces a tus perfiles.
2. GitHub, LinkedIn, Twitter.
3. Aparecerán como iconos en el pie de página.

### 5. Elige tu tema
1. Selecciona uno de los 4 temas disponibles.
2. El cambio es instantáneo.
3. Se guarda en localStorage.

### 6. Comparte tu portafolio
1. Descarga el archivo HTML generado.
2. O comparte el enlace local si está en servidor.
3. ¡Tu portafolio está listo para mostrar!

---

## 🎨 Estructura del código

```javascript
class PortfolioGenerator {
  // Inicialización
  init()

  // Event listeners
  setupEventListeners()

  // Proyectos
  addProject()
  deleteProject()

  // Renderización
  render()
  generatePortfolioHTML()

  // Modal
  openProjectModal()
  closeProjectModal()

  // Almacenamiento
  savePortfolio()
  loadPortfolio()
}
```

---

## 📊 Estructura de datos

```json
{
  "fullName": "Tu Nombre",
  "title": "tu Profesión",
  "bio": "Tu biografía",
  "email": "email@ejemplo.com",
  "phone": "+1 234 567 8900",
  "location": "Ciudad, País",
  "projects": [
    {
      "id": 1234567890,
      "title": "Nombre del Proyecto",
      "description": "Descripción",
      "technologies": ["React", "Node.js"],
      "link": "https://proyecto.com"
    }
  ],
  "skills": ["JavaScript", "React", "CSS3"],
  "github": "https://github.com/usuario",
  "linkedin": "https://linkedin.com/in/usuario",
  "twitter": "https://twitter.com/usuario",
  "theme": "dark"
}
```

---

## 🎨 Temas disponibles

| Tema | Estilo | Uso |
|------|--------|-----|
| 🌙 Oscuro | Gradiente oscuro | Desarrolladores, Tech |
| ☀️ Claro | Fondo blanco | Diseñadores, Creadores |
| 💜 Púrpura | Gradiente púrpura | Creativo, Moderno |
| 💚 Verde | Gradiente verde | Startup, Innovador |

---

## 🔐 Almacenamiento de datos

Todos los datos se guardan en `localStorage`:
- Clave: `portfolio-generator`
- Formato: JSON serializado
- Los datos persisten entre sesiones

---

## 💾 Exportación

Para descargar tu portafolio completo:
1. Abre la consola (F12)
2. Ejecuta: `copy(document.documentElement.outerHTML)`
3. Crea un archivo `portafolio.html`
4. Pega el contenido
5. ¡Listo para compartir!

---

## ⚡ Características avanzadas

- **Vista previa en tiempo real**: Cambios instantáneos.
- **Guardado automático**: No pierdes tu trabajo.
- **Temas personalizables**: 4 temas profesionales.
- **Responsive design**: Funciona en todos los dispositivos.
- **Sin dependencias**: Solo JavaScript puro.

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Los datos no se guardan | Habilita localStorage en navegador |
| Tema no cambia | Recarga la página |
| Proyectos no aparecen | Asegúrate de llenar el título |
| Datos perdidos | Abre localStorage en DevTools: F12 > Application |

---

## 🚀 Mejoras futuras

- Exportación a PDF
- Exportación a HTML descargable
- Más temas personalizables
- Editor de colores personalizado
- Plantillas de portafolio
- Integración con APIs (GitHub, LinkedIn)
- Generador de QR
- Estadísticas de visitas
- Dominio personalizado
- Versión cloud con base de datos

---

## 📝 Licencia

Proyecto personal para portfolio. Libre para usar y modificar.

---

**Desarrollado por**: Jorge A. Fuentes (Lechu)  
**Última actualización**: Febrero 2026
