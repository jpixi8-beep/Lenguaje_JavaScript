# 🎮 Game Arcade – Runner/Zombie Escape Game

Juego arcade clásico tipo runner desarrollado en **JavaScript ES6 Vanilla** con **Canvas API**. Evita zombies, recolecta monedas y alcanza la máxima distancia posible en un juego dinámico y desafiante.

---

## 🚀 Características principales

- **Gameplay Arcade**:
  - Personaje corredizo automático.
  - Control de movimiento izquierda/derecha.
  - Sistema de salto con física realista.
  - Dificultad progresiva.

- **Mecánicas de juego**:
  - 🪙 **Monedas**: Recolecta +10 puntos.
  - 👿 **Zombies**: Evita -1 vida.
  - ⭐ **Escudo**: Protección temporal.
  - 🚀 **Boost**: Aumento de velocidad.

- **Sistema de vidas y puntuación**:
  - Comienza con 3 vidas.
  - Puntuación en tiempo real.
  - Distancia recorrida en metros.
  - Velocidad aumenta progresivamente.

- **Efectos visuales**:
  - Partículas dinámicas.
  - Escudo visual.
  - HUD informativo.
  - Tema cyberpunk.

- **Controles**:
  - **← →** o **A/D**: Movimiento.
  - **ESPACIO**: Saltar.
  - **P**: Pausar/Reanudar.

- **Persistencia**:
  - Top 10 mejores puntuaciones.
  - Guardado en localStorage.
  - Estadísticas del juego.

- **Menús completos**:
  - Menú principal.
  - Instrucciones.
  - Tabla de puntuaciones.
  - Game Over detallado.

---

## 📸 Pantallazo

Juego en acción con zombies, monedas y boosters volando por la pantalla.

---

## 🛠️ Tecnologías utilizadas

- **HTML5** – Estructura y Canvas.
- **CSS3** – Gradientes, animaciones, diseño responsivo.
- **JavaScript ES6** – Canvas API, clases, requestAnimationFrame.
- **localStorage** – Persistencia de puntuaciones.

---

## 📋 Requisitos

- Navegador moderno con soporte Canvas.
- Sin dependencias externas.

---

## 🚀 Cómo correr

```bash
# Navega a la carpeta
cd 11GameArcade_JS_ES6

# Abre directamente o con servidor
python -m http.server 8000

# Accede a: http://localhost:8000
```

---

## 📖 Cómo jugar

### 1. Comienza el juego
1. Presiona "▶️ Jugar"
2. El personaje corre automáticamente.
3. Controla tu movimiento con flechas o A/D.

### 2. Recolecta items
- **🪙 Monedas**: +10 puntos
- **⭐ Escudo**: Protección temporal
- **🚀 Boost**: Velocidad aumentada

### 3. Evita peligros
- **👿 Zombies**: -1 vida
- Si tienes escudo, absorbe el golpe.

### 4. Aumenta la dificultad
- Cada 500 puntos, la velocidad aumenta.
- Los zombies aparecen más frecuentemente.

### 5. Game Over
- Ves tus estadísticas finales.
- Compare con el top 10.
- Juega de nuevo.

---

## 🎨 Estructura del código

```javascript
class GameArcade {
  // Inicialización
  init()
  setupEventListeners()

  // Game Loop
  gameLoop()
  update()
  draw()

  // Rendering
  drawPlayer()
  drawObject()
  drawParticle()

  // Mecánicas
  jump()
  spawnObject()
  checkCollision()
  createParticles()

  // Estado
  startGame()
  endGame()
  togglePause()

  // Scores
  addScore()
  showScores()
}
```

---

## 🎮 Objetos del juego

| Objeto | Icono | Efecto |
|--------|-------|--------|
| Moneda | 🪙 | +10 puntos |
| Zombie | 👿 | -1 vida |
| Escudo | ⭐ | 300 frames protección |
| Boost | 🚀 | +0.2 velocidad |

---

## 📊 Fórmula de dificultad

```javascript
// Velocidad base: 1.0x
// Velocidad máxima: 3.0x
// Aumento: +0.1x cada 500 puntos
// Spawn rate: ~2% + (speed * 0.5%)
```

---

## 💾 localStorage

```javascript
// Mejores puntuaciones (Top 10)
localStorage.setItem('arcade-scores', JSON.stringify([1000, 950, 900, ...]))
```

---

## 🎯 Controles

| Acción | Tecla |
|--------|-------|
| Mover izquierda | ← o **A** |
| Mover derecha | → o **D** |
| Saltar | **ESPACIO** |
| Pausar | **P** |

---

## 🚀 Mejoras futuras

- Múltiples tipos de enemigos.
- Power-ups adicionales.
- Sistema de combos.
- Sonidos y música.
- Leaderboard online.
- Diferentes mapas.
- Modo multijugador local.
- Selección de personajes.
- Skinns y customización.
- Tutorial interactivo.

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Canvas no se renderiza | Actualiza navegador |
| Controles lentos | Verifica FPS |
| Scores no guardan | Habilita localStorage |
| Juego muy fácil/difícil | Ajusta velocidad en código |

---

## 📝 Licencia

Proyecto personal. Libre para usar y modificar.

---

**Desarrollado por**: Jorge A. Fuentes (Lechu)  
**Última actualización**: Febrero 2026
