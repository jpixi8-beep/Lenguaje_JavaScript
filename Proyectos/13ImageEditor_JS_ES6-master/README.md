# 🖼️ Image Editor Pro – Editor de Imágenes Online

Editor de imágenes profesional desarrollado en **JavaScript ES6 Vanilla** con **Canvas API** y **File API**. Aplica filtros, recorta imágenes y exporta en múltiples formatos.

---

## 🚀 Características principales

- **Carga de imágenes**:
  - Soporta JPG, PNG, GIF, WebP.
  - Drag & drop (opcional).
  - Información de archivo.

- **Filtros en tiempo real**:
  - 🌞 Brillo (0-200%)
  - 🎯 Contraste (0-200%)
  - 🎨 Saturación (0-200%)
  - 🔄 Tonalidad (0-360°)
  - 👻 Opacidad (0-100%)
  - 🌀 Desenfoque (0-20px)

- **Presets rápidos**:
  - B/N - Blanco y negro
  - Sepia - Efecto vintage
  - Vintage - Tono antiguo
  - Vibrant - Colores vividos

- **Recorte de imágenes**:
  - Activar/desactivar modo recorte.
  - Drag box para seleccionar área.
  - Aplicar recorte.

- **Zoom**:
  - Zoom in/out.
  - Reset a 100%.
  - Display de nivel de zoom.

- **Exportación**:
  - ⬇️ Descargar como PNG.
  - 📋 Copiar al portapapeles.
  - Preserva todos los filtros.

- **Historial** (opcional):
  - Seguimiento de cambios.
  - Volver a estados anteriores.

- **Responsive design**:
  - Adaptable a móvil.
  - Controles intuitivos.

---

## 📸 Pantallazo

Editor con imagen cargada, filtros aplicados y canvas mostrando vista previa en tiempo real.

---

## 🛠️ Tecnologías utilizadas

- **HTML5** – Estructura, canvas, file input.
- **CSS3** – Gradientes, sliders, responsive.
- **JavaScript ES6** – Canvas API, File API, clases.
- **Canvas API** – Procesamiento de imágenes.
- **File API** – Lectura de archivos.

---

## 📋 Requisitos

- Navegador moderno con Canvas API.
- Soporte File API.
- Sin dependencias externas.

---

## 🚀 Cómo correr

```bash
# Navega a la carpeta
cd 12ImageEditor_JS_ES6

# Abre directamente o con servidor
python -m http.server 8000

# Accede a: http://localhost:8000
```

---

## 📖 Cómo usar

### 1. Carga una imagen
- Click en "Subir Imagen"
- Selecciona un archivo JPG, PNG, GIF o WebP
- La imagen se carga automáticamente

### 2. Aplica filtros
- **Brillo**: Ajusta la luminosidad (0-200%)
- **Contraste**: Define diferencia entre tonos (0-200%)
- **Saturación**: Intensidad del color (0-200%)
- **Tonalidad**: Rota el espectro de color (0-360°)
- **Opacidad**: Transparencia (0-100%)
- **Desenfoque**: Efecto blur (0-20px)

### 3. Usa presets
- **B/N**: Convierte a blanco y negro
- **Sepia**: Efecto fotográfico vintage
- **Vintage**: Tono nostálgico
- **Vibrant**: Colores ultra saturados

### 4. Recorta la imagen
1. Click "Activar Recorte"
2. Arrastra el recuadro para seleccionar
3. Click "Aplicar Recorte"

### 5. Ajusta zoom
- 🔍− : Zoom out
- 100% : Reset
- 🔍+ : Zoom in

### 6. Exporta
- **Descargar**: Guarda como PNG
- **Copiar**: Al portapapeles
- **Reiniciar**: Vuelve a valores originales

---

## 🎨 Estructura del código

```javascript
class ImageEditor {
  // Inicialización
  init()
  setupEventListeners()

  // Image Handling
  handleImageUpload()
  updateImageInfo()

  // Filters
  applyFilters()
  applyPreset()
  resetFilters()
  updateFilterSliders()

  // Crop
  toggleCropMode()
  renderCropBox()
  startDragCrop()
  applyCrop()
  cancelCrop()

  // Export
  download()
  copyToClipboard()

  // Utilities
  reset()
  updateCanvasPosition()
  render()
}
```

---

## 🎯 Filtros disponibles

| Filtro | Min | Max | Unidad |
|--------|-----|-----|--------|
| Brillo | 0% | 200% | % |
| Contraste | 0% | 200% | % |
| Saturación | 0% | 200% | % |
| Tonalidad | 0° | 360° | grados |
| Opacidad | 0% | 100% | % |
| Desenfoque | 0px | 20px | píxeles |

---

## 🎯 Presets

```javascript
B/N: saturation: 0%
Sepia: hue: 30°, saturation: 50%
Vintage: brightness: 110%, saturation: 70%, hue: 15°
Vibrant: saturation: 150%, contrast: 120%
```

---

## 💾 Canvas API

```javascript
// Aplicar filtros
ctx.filter = `
  brightness(${value}%)
  contrast(${value}%)
  saturate(${value}%)
  hue-rotate(${value}deg)
  blur(${value}px)
`

// Descargar
canvas.toDataURL('image/png')

// Copiar al portapapeles
canvas.toBlob(blob => navigator.clipboard.write([...]))
```

---

## 🚀 Mejoras futuras

- Historial completo de cambios.
- Deshacer/Rehacer (Ctrl+Z/Ctrl+Y).
- Herramienta de dibujo.
- Efectos avanzados (vigneta, distorsión).
- Redimensionar imagen.
- Rotar/Voltear.
- Watermark.
- Batch processing.
- Soporte drag & drop.
- Compartir en redes.

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Imagen no carga | Verifica formato (JPG, PNG, GIF) |
| Filtros no aplican | Recarga página |
| Descarga no funciona | Actualiza navegador |
| Crop no recorta | Asegúrate de aplicar cambios |

---

## 📝 Licencia

Proyecto personal. Libre para usar y modificar.

---

**Desarrollado por**: Jorge A. Fuentes (Lechu)  
**Última actualización**: Febrero 2026
