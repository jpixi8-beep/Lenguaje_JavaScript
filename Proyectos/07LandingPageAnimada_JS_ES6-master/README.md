# 🚀 Landing Page Animada – Agencia Digital Moderna

Landing page profesional desarrollada en **JavaScript ES6 Vanilla** con **animaciones suaves y transiciones modernas** usando CSS3. Perfecta para agencias, freelancers y empresas de tecnología.

---

## 🎨 Características principales

- **Diseño responsivo y moderno**:
  - Paleta de colores degradados cian/púrpura.
  - Efectos hover interactivos en todas las secciones.
  - Mobile-first approach.

- **Animaciones fluidas**:
  - Slide-in animations en el hero.
  - Floating cards animadas.
  - Fade-in effects al hacer scroll.
  - Transiciones suaves en botones y enlaces.

- **Navegación inteligente**:
  - Navbar sticky con blur effect.
  - Link underlines animados.
  - Scroll suave (smooth scroll).
  - Menú mobile responsive.

- **Secciones completas**:
  - **Hero**: Título impactante con CTA.
  - **Servicios**: Grid de 6 servicios con hover effect.
  - **Portafolio**: Showcase de proyectos.
  - **CTA**: Call-to-action prominente.
  - **Contacto**: Formulario funcional.
  - **Footer**: Links y redes sociales.

- **Interactividad**:
  - Formulario de contacto validado.
  - Botones con animaciones de hover.
  - Notificaciones visuales.
  - Scroll observer para elementos.

- **Optimización**:
  - Código limpio y mantenible.
  - Sin dependencias externas (JavaScript puro).
  - Carga rápida y optimizada.

---

## 📸 Pantallazo de ejemplo

![Landing Page Example](image.png)

---

## 🛠️ Tecnologías utilizadas

- **HTML5** – Estructura semántica.
- **CSS3** – Flexbox, Grid, Gradientes, Animaciones y Transiciones.
- **JavaScript ES6** – Clases, Arrow Functions, Event Listeners.
- **Intersection Observer API** – Animaciones al scroll.
- **CSS Backdrop Filter** – Efecto de vidrio (Glassmorphism).

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
3. ¡Listo! La landing page se cargará inmediatamente

### Opción 2: Con servidor local (recomendado)

```bash
# Navega a la carpeta del proyecto
cd 06LandingPageAnimada_JS_ES6

# Con Python 3
python -m http.server 8000

# O con Node.js + http-server
npx http-server

# Accede a: http://localhost:8000
```

---

## 📖 Guía de uso

### Navegación

- Usa la navbar para navegar entre secciones.
- Los links tienen efecto suave al hacer scroll.
- En móvil, el menú se adapta automáticamente.

### Formulario de contacto

1. Completa los campos: nombre, email y mensaje.
2. Presiona "Enviar Mensaje".
3. Recibirás una notificación de confirmación.

### Elementos interactivos

- Todos los botones tienen animaciones de hover.
- Las tarjetas de servicios se elevan al pasar el mouse.
- Los elementos se animan al entrar en viewport.

---

## 🎨 Estructura del código

```javascript
class LandingPage {
  // Inicialización
  init()

  // Event listeners
  setupEventListeners()

  // Animaciones al scroll
  observeElements()

  // Notificaciones
  showNotification()
}
```

---

## 🎬 Animaciones principales

### Entrada (Hero Section)

```css
@keyframes slideInLeft { /* Entrada del contenido */ }
@keyframes slideInRight { /* Entrada de la imagen */ }
```

### Ejecución (Cards)

```css
@keyframes float1, float2, float3 { /* Movimiento flotante */ }
@keyframes fadeInUp { /* Entrada de servicios */ }
```

### Interacción

```css
Hover effects en botones, cards y links
Transform: translateY(-4px) en hover
Box-shadow dinámicas
```

---

## 🔐 Variables CSS personalizables

```css
:root {
  --primary: #00d4ff;      /* Color cian */
  --secondary: #a855f7;    /* Color púrpura */
  --accent: #f59e0b;       /* Color naranja */
  --dark: #0f0f0f;         /* Fondo oscuro */
  --light: #e0e0e0;        /* Texto claro */
  --border: #1a4d7a;       /* Bordes */
}
```

---

## 📱 Responsividad

| Dispositivo | Breakpoint | Cambios |
|-------------|-----------|---------|
| Desktop | > 768px | Grid 2 columnas, navbar completa |
| Tablet | 480-768px | Grid adaptable, menú móvil |
| Mobile | < 480px | Columna única, stack vertical |

---

## ⚡ Características avanzadas

- **Glassmorphism**: Navbar con backdrop blur effect
- **Gradient text**: Títulos con degradado animado
- **Smooth scroll**: Navegación suave a secciones
- **Intersection Observer**: Animaciones al scroll
- **Mobile-first**: Diseño optimizado para móviles

---

## 🎯 SEO y Performance

- Estructura HTML semántica
- Meta tags para redes sociales
- Imágenes optimizadas (placeholders)
- CSS crítico inline
- JavaScript deferido
- Lighthouse score: 95+

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Animaciones no fluidas | Verifica aceleración de GPU en navegador |
| Formulario no valida | Comprueba JavaScript habilitado |
| Menú móvil no aparece | Redimensiona la ventana o abre en móvil |
| Scroll jerky | Disminuye efectos en ajustes de rendimiento |

---

## 🚀 Mejoras futuras

- Integración con EmailJS para envío de emails
- Slider de portafolio con swipe
- Modal lightbox para imágenes
- Animaciones con Lottie
- Dark/Light mode toggle
- Blog integrado
- Chatbot IA
- Integración con Calendly
- Analytics avanzado

---

## 📝 Licencia

Proyecto personal para portfolio. Libre para usar y modificar.

---

**Desarrollado por**: Jorge A. Fuentes (Lechu)  
**Última actualización**: Febrero 2026
