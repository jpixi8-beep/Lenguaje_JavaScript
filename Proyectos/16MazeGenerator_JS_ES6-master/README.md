# 🌀 Maze Generator – Generador de Laberintos

Generador interactivo de laberintos desarrollado en **JavaScript ES6 Vanilla** con **algoritmos DFS/BFS**. Visualiza la generación en tiempo real y resuelve laberintos con pathfinding.

---

## 🚀 Características principales

- **Generación de laberintos**:
  - 🔻 **DFS** (Depth-First Search): Rápido, pasajes largos.
  - 🔹 **BFS** (Breadth-First Search): Balanceado, múltiples opciones.

- **Personalización**:
  - 📐 Dimensiones variables (5-50 celdas).
  - 📏 Tamaño de celda ajustable (5-30px).
  - 🎨 Colores personalizables.

- **Visualización**:
  - 🎬 Animación en tiempo real.
  - ⚡ Control de velocidad (10-500ms).
  - 📊 Estadísticas en vivo.

- **Resolución**:
  - 🎯 A* Pathfinding (óptimo).
  - 🔹 BFS Solver.
  - Visualización del camino.

- **Estadísticas**:
  - Total de celdas.
  - Celdas visitadas.
  - Duración de generación.
  - Pasos de solución.

- **Exportación**:
  - ⬇️ Descargar como PNG.
  - Preserva colores y tamaño.

---

## 📸 Pantallazo

Laberinto generado con visualización en tiempo real, solución resaltada y controles.

---

## 🛠️ Tecnologías utilizadas

- **HTML5** – Estructura, canvas.
- **CSS3** – Gradientes, responsive design.
- **JavaScript ES6** – Canvas API, algoritmos, clases.
- **Canvas API** – Renderizado del laberinto.
- **Algoritmos** – DFS, BFS, A* Pathfinding.

---

## 📋 Requisitos

- Navegador moderno con Canvas API.
- Sin dependencias externas.

---

## 🚀 Cómo correr

```bash
# Navega a la carpeta
cd 15MazeGenerator_JS_ES6

# Abre directamente o con servidor
python -m http.server 8000

# Accede a: http://localhost:8000
```

---

## 📖 Cómo usar

### 1. Configura el laberinto
- **Ancho**: 5-50 celdas
- **Alto**: 5-50 celdas
- **Tamaño celda**: 5-30 píxeles

### 2. Elige algoritmo
- **DFS**: Explora profundamente (pasajes largos)
- **BFS**: Ampitud primero (más equilibrado)

### 3. Genera el laberinto
- Click "🔄 Generar Laberinto"
- Observa la animación
- Ajusta velocidad (10-500ms)

### 4. Personalización
- **Color pared**: Negro oscuro
- **Color camino**: Blanco
- **Color solución**: Rojo

### 5. Resuelve
- Click "🎯 Resolver"
- Encuentra el camino desde verde (inicio) a rojo (fin)
- Ver pasos de solución

---

## 🎨 Estructura del código

```javascript
class MazeGenerator {
  // Inicialización
  init()
  setupEventListeners()

  // Generation
  generateMaze()
  carvePassageDFS()
  carvePassageBFS()

  // Solving
  solveMaze()
  findPath()

  // Drawing
  drawMaze()

  // Utilities
  selectAlgorithm()
  download()
  updateStats()
}
```

---

## 🧬 Algoritmos

| Algoritmo | Tiempo | Características |
|-----------|--------|-----------------|
| **DFS** | O(n) | Pasajes largos, profundo |
| **BFS** | O(n) | Equilibrado, múltiples caminos |
| **A*** | O(n) | Óptimo, heurístico |

---

## 📊 Complejidad

```javascript
// DFS Generation: O(n²)
// BFS Generation: O(n²)
// Pathfinding: O(n²) – A*/BFS
```

---

## 🎯 Canvas Drawing

```javascript
// Dibujar celda
ctx.fillStyle = color
ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)

// Dibujar línea de solución
ctx.strokeStyle = solutionColor
ctx.stroke()
```

---

## 💾 Características avanzadas

```javascript
// Exportar como PNG
canvas.toDataURL('image/png')

// Estadísticas en vivo
visited.size, duration, path.length
```

---

## 🚀 Mejoras futuras

- Solver 3D.
- Múltiples algoritmos (Prim, Kruskal).
- Editor de laberintos personalizado.
- Competencia de velocidad.
- Generación procedural.
- Texturas y efectos.
- Modo multijugador.
- Laberintos hexagonales/triangulares.
- Estadísticas avanzadas.
- Integración IA.

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Canvas muy pequeño | Aumenta tamaño celda |
| Animación lenta | Reduce velocidad |
| Solución no aparece | Intenta "Resolver" nuevamente |
| Laberinto no válido | Reduce dimensiones |

---

## 📝 Licencia

Proyecto personal. Libre para usar y modificar.

---

**Desarrollado por**: Jorge A. Fuentes (Lechu)  
**Última actualización**: Febrero 2026
