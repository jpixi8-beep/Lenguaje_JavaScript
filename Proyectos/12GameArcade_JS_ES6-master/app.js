class GameArcade {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Setup canvas
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    // Game state
    this.state = 'menu'; // menu, playing, paused, gameOver
    this.score = 0;
    this.lives = 3;
    this.distance = 0;
    this.speed = 1;
    this.maxSpeed = 3;

    // Player
    this.player = {
      x: this.canvas.width / 2,
      y: this.canvas.height - 60,
      width: 30,
      height: 40,
      velocityY: 0,
      jumping: false,
      shield: false,
      shieldDuration: 0
    };

    this.gravity = 0.6;
    this.keys = {};
    this.gameObjects = [];
    this.particles = [];
    this.scores = JSON.parse(localStorage.getItem('arcade-scores')) || [];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.gameLoop();
  }

  setupEventListeners() {
    // Game buttons
    document.getElementById('startBtn').addEventListener('click', () => this.startGame());
    document.getElementById('restartBtn').addEventListener('click', () => this.startGame());
    document.getElementById('menuBtn').addEventListener('click', () => this.goToMenu());
    document.getElementById('instructionsBtn').addEventListener('click', () => this.showInstructions());
    document.getElementById('scoresBtn').addEventListener('click', () => this.showScores());

    // Keyboard
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      if (e.key === ' ') {
        e.preventDefault();
        this.jump();
      }
      if (e.key.toLowerCase() === 'p') {
        this.togglePause();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    // Responsive canvas
    window.addEventListener('resize', () => {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    });
  }

  // ===== GAME LOOP =====
  gameLoop = () => {
    this.update();
    this.draw();
    requestAnimationFrame(this.gameLoop);
  }

  update() {
    if (this.state !== 'playing') return;

    // Player movement
    if (this.keys['arrowleft'] || this.keys['a']) {
      this.player.x = Math.max(0, this.player.x - 5);
    }
    if (this.keys['arrowright'] || this.keys['d']) {
      this.player.x = Math.min(this.canvas.width - this.player.width, this.player.x + 5);
    }

    // Gravity
    this.player.velocityY += this.gravity;
    this.player.y += this.player.velocityY;

    // Ground collision
    if (this.player.y + this.player.height >= this.canvas.height - 10) {
      this.player.y = this.canvas.height - this.player.height - 10;
      this.player.velocityY = 0;
      this.player.jumping = false;
    }

    // Shield duration
    if (this.player.shield) {
      this.player.shieldDuration--;
      if (this.player.shieldDuration <= 0) {
        this.player.shield = false;
      }
    }

    // Spawn objects
    if (Math.random() < 0.02 + this.speed * 0.005) {
      this.spawnObject();
    }

    // Update objects
    this.gameObjects = this.gameObjects.filter(obj => {
      obj.x -= this.speed * 2;

      // Collision detection
      if (this.checkCollision(this.player, obj)) {
        if (obj.type === 'coin') {
          this.score += 10;
          this.createParticles(obj.x, obj.y, '#FFD700');
        } else if (obj.type === 'shield') {
          this.player.shield = true;
          this.player.shieldDuration = 300;
          this.createParticles(obj.x, obj.y, '#00FF00');
        } else if (obj.type === 'boost') {
          this.speed = Math.min(this.maxSpeed, this.speed + 0.2);
          this.createParticles(obj.x, obj.y, '#FF6B6B');
        } else if (obj.type === 'zombie') {
          if (this.player.shield) {
            this.player.shield = false;
            this.createParticles(obj.x, obj.y, '#FF0000');
          } else {
            this.lives--;
            this.createParticles(obj.x, obj.y, '#FF0000');
          }
        }
        return false;
      }

      return obj.x > -50;
    });

    // Update particles
    this.particles = this.particles.filter(p => {
      p.life--;
      return p.life > 0;
    });

    // Distance and speed
    this.distance = Math.floor(this.distance + this.speed);

    // Increase speed
    if (Math.floor(this.score / 500) > Math.floor((this.score - 10) / 500)) {
      this.speed = Math.min(this.maxSpeed, this.speed + 0.1);
    }

    // Game over
    if (this.lives <= 0) {
      this.endGame();
    }
  }

  draw() {
    // Clear canvas
    this.ctx.fillStyle = 'rgba(10, 37, 64, 0.2)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.state !== 'playing') return;

    // Draw ground
    this.ctx.fillStyle = '#1a4d7a';
    this.ctx.fillRect(0, this.canvas.height - 10, this.canvas.width, 10);

    // Draw player
    this.drawPlayer();

    // Draw objects
    this.gameObjects.forEach(obj => this.drawObject(obj));

    // Draw particles
    this.particles.forEach(p => this.drawParticle(p));
  }

  drawPlayer() {
    const { x, y, width, height, shield } = this.player;

    // Shield
    if (shield) {
      this.ctx.strokeStyle = '#00FF00';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(x + width / 2, y + height / 2, width, 0, Math.PI * 2);
      this.ctx.stroke();
    }

    // Player body
    this.ctx.fillStyle = '#00d4ff';
    this.ctx.fillRect(x, y, width, height);

    // Eyes
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(x + 8, y + 10, 6, 6);
    this.ctx.fillRect(x + 16, y + 10, 6, 6);
  }

  drawObject(obj) {
    const icons = {
      coin: '🪙',
      shield: '⭐',
      boost: '🚀',
      zombie: '👿'
    };

    this.ctx.font = '30px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(icons[obj.type], obj.x, obj.y);
  }

  drawParticle(p) {
    this.ctx.fillStyle = p.color;
    this.ctx.globalAlpha = p.life / 50;
    this.ctx.fillRect(p.x, p.y, 5, 5);
    this.ctx.globalAlpha = 1;
  }

  // ===== GAME MECHANICS =====
  jump() {
    if (!this.player.jumping && this.state === 'playing') {
      this.player.velocityY = -12;
      this.player.jumping = true;
    }
  }

  spawnObject() {
    const types = ['coin', 'zombie', 'shield', 'boost'];
    const weights = [0.6, 0.2, 0.1, 0.1];
    const random = Math.random();
    let type = 'coin';
    let cumulative = 0;

    for (let i = 0; i < types.length; i++) {
      cumulative += weights[i];
      if (random < cumulative) {
        type = types[i];
        break;
      }
    }

    const y = type === 'zombie' ? this.canvas.height - 50 : Math.random() * (this.canvas.height - 100);

    this.gameObjects.push({
      type,
      x: this.canvas.width,
      y,
      width: 30,
      height: 30
    });
  }

  checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }

  createParticles(x, y, color) {
    for (let i = 0; i < 8; i++) {
      this.particles.push({
        x,
        y,
        color,
        life: 50,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4
      });
    }
  }

  // ===== GAME STATE =====
  startGame() {
    this.state = 'playing';
    this.score = 0;
    this.lives = 3;
    this.distance = 0;
    this.speed = 1;
    this.gameObjects = [];
    this.particles = [];
    this.player.y = this.canvas.height - 60;
    this.player.velocityY = 0;
    this.player.shield = false;

    document.getElementById('startMenu').classList.remove('active');
    document.getElementById('gameOverMenu').classList.add('hidden');
    document.getElementById('gameContainer').classList.add('active');
    this.updateHUD();
  }

  endGame() {
    this.state = 'gameOver';
    this.addScore(this.score);

    document.getElementById('finalScore').textContent = this.score;
    document.getElementById('finalDistance').textContent = Math.floor(this.distance / 10) + 'm';
    document.getElementById('finalCoins').textContent = Math.floor(this.score / 10);

    document.getElementById('gameContainer').classList.remove('active');
    document.getElementById('gameOverMenu').classList.remove('hidden');
  }

  goToMenu() {
    this.state = 'menu';
    document.getElementById('gameContainer').classList.remove('active');
    document.getElementById('gameOverMenu').classList.add('hidden');
    document.getElementById('startMenu').classList.add('active');
  }

  togglePause() {
    if (this.state === 'playing') {
      this.state = 'paused';
      document.getElementById('pauseOverlay').classList.add('active');
    } else if (this.state === 'paused') {
      this.state = 'playing';
      document.getElementById('pauseOverlay').classList.remove('active');
    }
  }

  updateHUD() {
    document.getElementById('score').textContent = this.score;
    document.getElementById('lives').textContent = this.lives;
    document.getElementById('distance').textContent = Math.floor(this.distance / 10) + 'm';
    document.getElementById('speed').textContent = this.speed.toFixed(1) + 'x';
  }

  // ===== SCORES =====
  addScore(score) {
    this.scores.push(score);
    this.scores.sort((a, b) => b - a);
    this.scores = this.scores.slice(0, 10);
    localStorage.setItem('arcade-scores', JSON.stringify(this.scores));
  }

  showScores() {
    const list = document.getElementById('scoresList');
    if (this.scores.length === 0) {
      list.innerHTML = '<p class="empty">No hay puntuaciones aún</p>';
    } else {
      list.innerHTML = this.scores.map((score, i) => `
        <div class="score-item">
          <span class="score-rank">#${i + 1}</span>
          <span class="score-value">Puntuación</span>
          <span class="score-points">${score}</span>
        </div>
      `).join('');
    }
    document.getElementById('scoresModal').classList.remove('hidden');
  }

  closeScores() {
    document.getElementById('scoresModal').classList.add('hidden');
  }

  showInstructions() {
    document.getElementById('instructionsModal').classList.remove('hidden');
  }

  closeInstructions() {
    document.getElementById('instructionsModal').classList.add('hidden');
  }
}

let game;

document.addEventListener('DOMContentLoaded', () => {
  game = new GameArcade();
  game.updateHUD();
});
