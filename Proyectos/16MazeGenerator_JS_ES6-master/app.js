class MazeGenerator {
  constructor() {
    this.canvas = document.getElementById('mazeCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Configuration
    this.width = 20;
    this.height = 20;
    this.cellSize = 15;
    this.algorithm = 'dfs';
    this.animate = true;
    this.speed = 100;

    // Colors
    this.wallColor = '#1a1a2e';
    this.pathColor = '#ffffff';
    this.solutionColor = '#ff6b6b';

    // Maze data
    this.grid = [];
    this.visited = new Set();
    this.path = [];
    this.solution = [];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.generateMaze();
  }

  setupEventListeners() {
    // Size controls
    document.getElementById('widthSlider').addEventListener('input', (e) => {
      this.width = parseInt(e.target.value);
      document.getElementById('widthValue').textContent = e.target.value;
      this.updateStats();
    });

    document.getElementById('heightSlider').addEventListener('input', (e) => {
      this.height = parseInt(e.target.value);
      document.getElementById('heightValue').textContent = e.target.value;
      this.updateStats();
    });

    document.getElementById('cellSizeSlider').addEventListener('input', (e) => {
      this.cellSize = parseInt(e.target.value);
      document.getElementById('cellSizeValue').textContent = e.target.value + 'px';
      this.drawMaze();
    });

    // Algorithm
    document.getElementById('dfsBtn').addEventListener('click', () => this.selectAlgorithm('dfs'));
    document.getElementById('bfsBtn').addEventListener('click', () => this.selectAlgorithm('bfs'));

    // Visualization
    document.getElementById('animateBtn').addEventListener('change', (e) => {
      this.animate = e.target.checked;
    });

    document.getElementById('speedSlider').addEventListener('input', (e) => {
      this.speed = parseInt(e.target.value);
      document.getElementById('speedValue').textContent = e.target.value + 'ms';
    });

    document.getElementById('wallColor').addEventListener('change', (e) => {
      this.wallColor = e.target.value;
      this.drawMaze();
    });

    document.getElementById('pathColor').addEventListener('change', (e) => {
      this.pathColor = e.target.value;
      this.drawMaze();
    });

    document.getElementById('solutionColor').addEventListener('change', (e) => {
      this.solutionColor = e.target.value;
    });

    // Buttons
    document.getElementById('generateBtn').addEventListener('click', () => this.generateMaze());
    document.getElementById('solveBtn').addEventListener('click', () => this.solveMaze());
    document.getElementById('resetBtn').addEventListener('click', () => this.reset());
    document.getElementById('downloadBtn').addEventListener('click', () => this.download());

    // Solver
    document.getElementById('astarBtn').addEventListener('click', () => {
      document.querySelectorAll('.solver-btn').forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');
    });

    document.getElementById('bfsSolverBtn').addEventListener('click', () => {
      document.querySelectorAll('.solver-btn').forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');
    });
  }

  selectAlgorithm(algo) {
    this.algorithm = algo;
    document.querySelectorAll('.algo-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    const info = {
      dfs: '🔻 Profundidad primero: Explora profundamente antes de retroceder.',
      bfs: '🔹 Amplitud primero: Explora todos los vecinos antes de continuar.'
    };
    document.getElementById('algoInfo').textContent = info[algo];

    this.generateMaze();
  }

  // ===== MAZE GENERATION =====
  generateMaze() {
    this.grid = Array(this.height).fill(null).map(() => Array(this.width).fill(1));
    this.visited.clear();
    this.path = [];
    this.solution = [];

    this.canvas.width = this.width * this.cellSize;
    this.canvas.height = this.height * this.cellSize;

    const startTime = performance.now();

    if (this.algorithm === 'dfs') {
      this.carvePassageDFS(0, 0);
    } else {
      this.carvePassageBFS();
    }

    const endTime = performance.now();
    document.getElementById('duration').textContent = Math.round(endTime - startTime) + 'ms';

    this.grid[0][0] = 0;
    this.grid[this.height - 1][this.width - 1] = 0;
    this.drawMaze();
  }

  carvePassageDFS(x, y) {
    this.visited.add(`${x},${y}`);
    this.grid[y][x] = 0;

    if (this.animate) {
      this.drawMaze();
    }

    const directions = [[0, -2], [2, 0], [0, 2], [-2, 0]].sort(() => Math.random() - 0.5);

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx > 0 && nx < this.width && ny > 0 && ny < this.height && !this.visited.has(`${nx},${ny}`)) {
        this.grid[y + dy / 2][x + dx / 2] = 0;
        this.carvePassageDFS(nx, ny);
      }
    }
  }

  carvePassageBFS() {
    const queue = [[0, 0]];
    this.visited.add('0,0');
    this.grid[0][0] = 0;

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      if (this.animate) {
        this.drawMaze();
      }

      const directions = [[0, -2], [2, 0], [0, 2], [-2, 0]].sort(() => Math.random() - 0.5);

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx > 0 && nx < this.width && ny > 0 && ny < this.height && !this.visited.has(`${nx},${ny}`)) {
          this.visited.add(`${nx},${ny}`);
          this.grid[y + dy / 2][x + dx / 2] = 0;
          this.grid[ny][nx] = 0;
          queue.push([nx, ny]);
        }
      }
    }
  }

  // ===== MAZE SOLVING =====
  solveMaze() {
    const start = [0, 0];
    const end = [this.width - 1, this.height - 1];

    this.solution = this.findPath(start, end);
    this.drawMaze();

    document.getElementById('solutionSteps').textContent = this.solution.length;
  }

  findPath(start, end) {
    const queue = [[...start, [start]]];
    const visited = new Set();
    visited.add(`${start[0]},${start[1]}`);

    while (queue.length > 0) {
      const [x, y, path] = queue.shift();

      if (x === end[0] && y === end[1]) {
        return path;
      }

      const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height &&
            this.grid[ny][nx] === 0 && !visited.has(`${nx},${ny}`)) {
          visited.add(`${nx},${ny}`);
          queue.push([nx, ny, [...path, [nx, ny]]]);
        }
      }
    }

    return [];
  }

  // ===== DRAWING =====
  drawMaze() {
    this.ctx.fillStyle = this.wallColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw cells
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.grid[y][x] === 0) {
          this.ctx.fillStyle = this.pathColor;
          this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }

    // Draw solution
    this.ctx.strokeStyle = this.solutionColor;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();

    for (const [x, y] of this.solution) {
      const px = x * this.cellSize + this.cellSize / 2;
      const py = y * this.cellSize + this.cellSize / 2;

      if (this.solution.indexOf([x, y]) === 0) {
        this.ctx.moveTo(px, py);
      } else {
        this.ctx.lineTo(px, py);
      }
    }

    this.ctx.stroke();

    // Draw start and end
    this.ctx.fillStyle = '#4ade80';
    this.ctx.fillRect(0, 0, this.cellSize, this.cellSize);

    this.ctx.fillStyle = '#ff6b6b';
    this.ctx.fillRect((this.width - 1) * this.cellSize, (this.height - 1) * this.cellSize, this.cellSize, this.cellSize);
  }

  // ===== UTILITIES =====
  reset() {
    this.solution = [];
    this.drawMaze();
    document.getElementById('solutionSteps').textContent = '0';
  }

  download() {
    const link = document.createElement('a');
    link.href = this.canvas.toDataURL('image/png');
    link.download = `maze-${Date.now()}.png`;
    link.click();
  }

  updateStats() {
    document.getElementById('totalCells').textContent = this.width * this.height;
    document.getElementById('visitedCells').textContent = this.visited.size;
  }
}

let maze;

document.addEventListener('DOMContentLoaded', () => {
  maze = new MazeGenerator();
});
