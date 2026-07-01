# 🎵 SoundWave – Reproductor de Música con Web Audio API

Reproductor de música profesional desarrollado en **JavaScript ES6 Vanilla** con **Web Audio API**. Incluye visualizaciones en tiempo real, playlists dinámicas y ecualizador.

---

## 🚀 Características principales

- **Reproducción de audio**:
  - Carga URLs de canciones MP3.
  - Play/Pause, Siguiente/Anterior.
  - Barra de progreso interactiva.

- **Control de reproducción**:
  - 🔊 Control de volumen.
  - ⚡ Velocidad variable (0.5x - 2x).
  - Duración total y actual.

- **Playlists**:
  - Agregar canciones dinámicamente.
  - Guardado en localStorage.
  - Seleccionar canción desde lista.
  - Limpiar playlist completa.

- **Visualizador en tiempo real** (4 modos):
  - 📊 Barras - Visualización clásica.
  - 〰️ Onda - Waveform dinámico.
  - 🌀 Espiral - Animación espiral.
  - ⭕ Círculos - Círculos concéntricos.

- **Web Audio API**:
  - Analyser para capturar frecuencias.
  - FFT Size 256 para análisis.
  - Sensibilidad ajustable.

- **Personalización**:
  - 5 colores preestablecidos.
  - Color personalizado.
  - Modo oscuro/claro.

- **Ecualizador**:
  - 5 bandas de frecuencia.
  - Ajuste ±20dB por banda.
  - Preestablecida a 0dB.

- **Estadísticas**:
  - Contador de canciones.
  - Duración total.
  - Frecuencia actual.
  - Volumen actual.

---

## 📸 Pantallazo

Reproductor con visualizador activo, albúm art, controles y playlist.

---

## 🛠️ Tecnologías utilizadas

- **HTML5** – Audio element, canvas.
- **CSS3** – Gradientes, sliders, responsive.
- **JavaScript ES6** – Web Audio API, clases, localStorage.
- **Web Audio API** – AnalyserNode, AudioContext.
- **Canvas API** – Visualización de frecuencias.

---

## 📋 Requisitos

- Navegador moderno con Web Audio API.
- URLs de MP3 públicos.
- Sin dependencias externas.

---

## 🚀 Cómo correr

```bash
# Navega a la carpeta
cd 14MusicApp_JS_ES6

# Abre directamente o con servidor
python -m http.server 8000

# Accede a: http://localhost:8000
```

---

## 📖 Cómo usar

### 1. Agrega canciones
1. Click "➕ Agregar URL"
2. Ingresa URL del MP3
3. Nombre de canción
4. Artista
5. Click "Agregar"

### 2. Reproduce
- Click ▶️ Play
- Usa < > para siguiente/anterior
- Barra de progreso arrastra posición

### 3. Controla volumen
- Slider 🔊 (0-100%)
- Visualización en tiempo real

### 4. Ajusta velocidad
- ⚡ Dropdown (0.5x - 2x)
- Útil para podcast/tutorials

### 5. Visualiza
- Selecciona tipo: Barras, Onda, Espiral, Círculos
- Sensibilidad 1-200%
- Color personalizado
- Modo oscuro/claro

### 6. Ecualizador
- 5 bandas: 60Hz, 250Hz, 500Hz, 2kHz, 8kHz
- Ajusta ±20dB por banda

---

## 🎨 Estructura del código

```javascript
class MusicApp {
  // Inicialización
  init()
  setupEventListeners()
  initAudioContext()

  // Playback
  togglePlay()
  playSong()
  nextSong()
  previousSong()
  updateProgress()

  // Playlist
  addSong()
  renderPlaylist()
  selectSong()
  clearPlaylist()

  // Visualizer
  startAnimation()
  draw()
  drawBars()
  drawWaveform()
  drawSpiral()
  drawCircles()

  // Utilities
  formatTime()
  closeModal()
  showModal()
}
```

---

## 🎯 Web Audio API

```javascript
// AudioContext
const audioContext = new AudioContext()
const analyser = audioContext.createAnalyser()
analyser.fftSize = 256

// Data análisis
const dataArray = new Uint8Array(analyser.frequencyBinCount)
analyser.getByteFrequencyData(dataArray)
```

---

## 💾 localStorage

```javascript
// Playlist persistente
localStorage.setItem('music-playlist', JSON.stringify([...]))
```

---

## 🎯 Visualizadores

| Tipo | Descripción |
|------|-------------|
| Barras | Clásico equalizer |
| Onda | Waveform 2D |
| Espiral | Animación circular |
| Círculos | Concéntricos |

---

## 🚀 Mejoras futuras

- Cargar archivos locales.
- Shuffle/Repeat modes.
- Tema más avanzado.
- Efectos de visualización premium.
- Integración Spotify/YouTube.
- Sincronización de lyrics.
- Historial de reproducción.
- Recomendaciones.
- Playlists nombradas.
- Modo offline.

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Audio no suena | Verifica CORS en URL |
| Visualizador no se ve | Habilita autoplay en navegador |
| Playlist no guarda | Verifica localStorage |
| Ecualizador sin efecto | Simula, no aplica realmente |

---

## 📝 Licencia

Proyecto personal. Libre para usar y modificar.

---

**Desarrollado por**: Jorge A. Fuentes (Lechu)  
**Última actualización**: Febrero 2026
