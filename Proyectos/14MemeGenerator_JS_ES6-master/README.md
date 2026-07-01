# 😂 Meme Generator – Creador de Memes Online

Generador de memes profesional desarrollado en **JavaScript ES6 Vanilla** con **Canvas API** y **File API**. Crea, customiza y comparte memes en segundos.

---

## 🚀 Características principales

- **Carga de imágenes**:
  - Subir imagen personalizada.
  - Presets de memes populares.
  - Soporte JPG, PNG, GIF, WebP.

- **Customización de texto**:
  - Texto superior e inferior.
  - Colores personalizables.
  - Tamaño variable (10-80px).
  - Posición Y ajustable.

- **Efectos de texto**:
  - ✓ Contorno negro (outline).
  - ✓ Sombra.
  - ✓ Mayúsculas automáticas.
  - ✓ Opacidad de fondo.

- **Presets incorporados**:
  - 👨 Distracted Boyfriend
  - 👶 Success Kid
  - 😤 Bad Luck Brian
  - 🐢 Drake

- **Exportación**:
  - ⬇️ Descargar como PNG.
  - 📋 Copiar al portapapeles.
  - 📤 Compartir (ShareAPI).

- **Historial**:
  - Últimos 8 memes.
  - Guardado en localStorage.
  - Cargar memes previos.

- **Interfaz intuitiva**:
  - Vista previa en tiempo real.
  - Controles sliders.
  - Diseño responsivo.

---

## 📸 Pantallazo

Editor con imagen de fondo, texto superior/inferior con efectos y controles de customización.

---

## 🛠️ Tecnologías utilizadas

- **HTML5** – Estructura, canvas, file input.
- **CSS3** – Gradientes, responsive design, sliders.
- **JavaScript ES6** – Canvas API, File API, localStorage, clases.
- **Canvas API** – Renderizado de imágenes y texto.
- **localStorage** – Historial de memes.

---

## 📋 Requisitos

- Navegador moderno con Canvas API.
- Soporte File API.
- Sin dependencias externas.

---

## 🚀 Cómo correr

```bash
# Navega a la carpeta
cd 13MemeGenerator_JS_ES6

# Abre directamente o con servidor
python -m http.server 8000

# Accede a: http://localhost:8000
```

---

## 📖 Cómo usar

### 1. Elige una imagen
- **Subir imagen**: Carga tu propia.
- **Presets**: Usa memes populares (Distracted, Success Kid, etc).

### 2. Agrega texto
- **Superior**: Escribe el texto superior (máx. 120 caracteres).
- **Inferior**: Escribe el texto inferior (máx. 120 caracteres).

### 3. Customiza
- **Color**: Selecciona el color del texto.
- **Tamaño**: Ajusta de 10px a 80px.
- **Posición**: Mueve el texto con sliders.

### 4. Aplica efectos
- **Contorno**: Agrega línea negra al texto.
- **Sombra**: Sombra bajo el texto.
- **Mayúsculas**: Convierte automáticamente.
- **Opacidad Fondo**: Hace la imagen más/menos transparente.

### 5. Exporta
- **Descargar**: Guarda como PNG.
- **Copiar**: Al portapapeles.
- **Compartir**: Vía Share API (móvil).

---

## 🎨 Estructura del código

```javascript
class MemeGenerator {
  // Inicialización
  init()
  setupEventListeners()

  // Image Handling
  handleImageUpload()
  setCanvasSize()
  loadPreset()

  // Rendering
  updateMeme()
  drawText()

  // Export
  download()
  copyToClipboard()
  share()

  // History
  addToRecent()
  renderRecent()
  loadRecent()

  // Utilities
  reset()
}
```

---

## 🎯 Opciones de texto

| Propiedad | Min | Max | Unidad |
|-----------|-----|-----|--------|
| Tamaño | 10 | 80 | px |
| Posición Y Superior | 0 | 60 | % |
| Posición Y Inferior | 40 | 100 | % |

---

## 🎨 Canvas Drawing

```javascript
// Dibujar texto con outline
ctx.strokeStyle = '#000'
ctx.lineWidth = 4
ctx.strokeText(text, x, y)
ctx.fillStyle = color
ctx.fillText(text, x, y)

// Exportar
canvas.toDataURL('image/png')
```

---

## 💾 localStorage

```javascript
// Historial de memes (últimos 8)
localStorage.setItem('meme-recent', JSON.stringify([...]))
```

---

## 🚀 Mejoras futuras

- Filtros de imagen integrados.
- Herramienta de dibujo.
- Stickers/emojis.
- Rotación de imagen.
- Bordes/marcos decorativos.
- Templates premium.
- Animaciones de texto.
- Comparativa before/after.
- Leaderboard de memes.
- Integración con redes sociales.

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Imagen no carga | Verifica formato (JPG, PNG, GIF) |
| Texto no visible | Cambia color o ajusta tamaño |
| Descarga lenta | Intenta con imagen más pequeña |
| Share no funciona | Solo disponible en navegadores modernos |

---

## 📝 Licencia

Proyecto personal. Libre para usar y modificar.

---

**Desarrollado por**: Jorge A. Fuentes (Lechu)  
**Última actualización**: Febrero 2026
