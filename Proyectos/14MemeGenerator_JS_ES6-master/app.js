class MemeGenerator {
  constructor() {
    this.canvas = document.getElementById('memeCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.backgroundImage = null;
    this.recentMemes = JSON.parse(localStorage.getItem('meme-recent')) || [];

    this.config = {
      topText: '',
      bottomText: '',
      topColor: '#ffffff',
      bottomColor: '#ffffff',
      topSize: 40,
      bottomSize: 40,
      topY: 10,
      bottomY: 90,
      outline: true,
      shadow: false,
      uppercase: false,
      bgOpacity: 100
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setCanvasSize();
    this.updateMeme();
  }

  setupEventListeners() {
    // Image upload
    document.getElementById('imageInput').addEventListener('change', (e) => this.handleImageUpload(e));

    // Text inputs
    document.getElementById('topText').addEventListener('input', (e) => {
      this.config.topText = e.target.value;
      this.updateMeme();
    });

    document.getElementById('bottomText').addEventListener('input', (e) => {
      this.config.bottomText = e.target.value;
      this.updateMeme();
    });

    // Colors
    document.getElementById('topColor').addEventListener('change', (e) => {
      this.config.topColor = e.target.value;
      this.updateMeme();
    });

    document.getElementById('bottomColor').addEventListener('change', (e) => {
      this.config.bottomColor = e.target.value;
      this.updateMeme();
    });

    // Sizes
    document.getElementById('topSize').addEventListener('input', (e) => {
      this.config.topSize = parseInt(e.target.value);
      document.getElementById('topSizeValue').textContent = e.target.value + 'px';
      this.updateMeme();
    });

    document.getElementById('bottomSize').addEventListener('input', (e) => {
      this.config.bottomSize = parseInt(e.target.value);
      document.getElementById('bottomSizeValue').textContent = e.target.value + 'px';
      this.updateMeme();
    });

    // Positions
    document.getElementById('topY').addEventListener('input', (e) => {
      this.config.topY = parseInt(e.target.value);
      document.getElementById('topYValue').textContent = e.target.value + '%';
      this.updateMeme();
    });

    document.getElementById('bottomY').addEventListener('input', (e) => {
      this.config.bottomY = parseInt(e.target.value);
      document.getElementById('bottomYValue').textContent = e.target.value + '%';
      this.updateMeme();
    });

    // Effects
    document.getElementById('outlineToggle').addEventListener('change', (e) => {
      this.config.outline = e.target.checked;
      this.updateMeme();
    });

    document.getElementById('shadowToggle').addEventListener('change', (e) => {
      this.config.shadow = e.target.checked;
      this.updateMeme();
    });

    document.getElementById('uppercaseToggle').addEventListener('change', (e) => {
      this.config.uppercase = e.target.checked;
      this.updateMeme();
    });

    document.getElementById('bgOpacity').addEventListener('input', (e) => {
      this.config.bgOpacity = parseInt(e.target.value);
      document.getElementById('bgOpacityValue').textContent = e.target.value + '%';
      this.updateMeme();
    });

    // Buttons
    document.getElementById('resetBtn').addEventListener('click', () => this.reset());
    document.getElementById('downloadBtn').addEventListener('click', () => this.download());
    document.getElementById('shareBtn').addEventListener('click', () => this.share());
    document.getElementById('copyBtn').addEventListener('click', () => this.copyToClipboard());

    // Preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.loadPreset(e.target.closest('.preset-btn').dataset.meme));
    });
  }

  // ===== IMAGE HANDLING =====
  handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        this.backgroundImage = img;
        this.setCanvasSize();
        this.updateMeme();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  setCanvasSize() {
    if (this.backgroundImage) {
      this.canvas.width = this.backgroundImage.width;
      this.canvas.height = this.backgroundImage.height;
    } else {
      this.canvas.width = 800;
      this.canvas.height = 600;
    }
  }

  loadPreset(preset) {
    const presets = {
      'distracted-boyfriend': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 600%22%3E%3Crect fill=%22%23333%22 width=%22800%22 height=%22600%22/%3E%3Ctext x=%22400%22 y=%22300%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2248%22%3EDistracted%3C/text%3E%3C/svg%3E',
      'success-kid': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 600%22%3E%3Crect fill=%22%23444%22 width=%22800%22 height=%22600%22/%3E%3C/svg%3E',
      'bad-luck-brian': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 600%22%3E%3Crect fill=%22%23555%22 width=%22800%22 height=%22600%22/%3E%3C/svg%3E',
      'drake': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 600%22%3E%3Crect fill=%22%23666%22 width=%22800%22 height=%22600%22/%3E%3C/svg%3E'
    };

    const img = new Image();
    img.onload = () => {
      this.backgroundImage = img;
      this.setCanvasSize();
      this.updateMeme();
    };
    img.src = presets[preset];
  }

  // ===== RENDERING =====
  updateMeme() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw background
    if (this.backgroundImage) {
      this.ctx.globalAlpha = this.config.bgOpacity / 100;
      this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.globalAlpha = 1;
    } else {
      this.ctx.fillStyle = '#333';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Draw text
    this.drawText(
      this.config.uppercase ? this.config.topText.toUpperCase() : this.config.topText,
      this.config.topColor,
      this.config.topSize,
      this.config.topY
    );

    this.drawText(
      this.config.uppercase ? this.config.bottomText.toUpperCase() : this.config.bottomText,
      this.config.bottomColor,
      this.config.bottomSize,
      this.config.bottomY
    );
  }

  drawText(text, color, size, yPercent) {
    if (!text) return;

    const x = this.canvas.width / 2;
    const y = (yPercent / 100) * this.canvas.height;

    this.ctx.font = `bold ${size}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    // Shadow
    if (this.config.shadow) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillText(text, x + 3, y + 3);
    }

    // Outline
    if (this.config.outline) {
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 4;
      this.ctx.strokeText(text, x, y);
    }

    // Text
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);
  }

  // ===== EXPORT =====
  download() {
    if (!this.backgroundImage && !this.config.topText && !this.config.bottomText) {
      alert('Crea un meme primero');
      return;
    }

    const link = document.createElement('a');
    link.href = this.canvas.toDataURL('image/png');
    link.download = `meme-${Date.now()}.png`;
    link.click();

    this.addToRecent();
  }

  copyToClipboard() {
    this.canvas.toBlob((blob) => {
      navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]).then(() => {
        alert('✅ Meme copiado al portapapeles');
      }).catch(() => {
        alert('❌ Error al copiar');
      });
    });
  }

  share() {
    if (navigator.share) {
      navigator.share({
        title: 'Mi Meme',
        text: '¡Mira este meme que creé!',
        url: window.location.href
      }).catch(err => console.log('Error al compartir:', err));
    } else {
      alert('Compartir no es soportado en este navegador');
    }
  }

  addToRecent() {
    const dataUrl = this.canvas.toDataURL('image/png');
    this.recentMemes.unshift(dataUrl);
    this.recentMemes = this.recentMemes.slice(0, 8);
    localStorage.setItem('meme-recent', JSON.stringify(this.recentMemes));
    this.renderRecent();
  }

  renderRecent() {
    const container = document.getElementById('recentMemes');
    if (this.recentMemes.length === 0) {
      container.innerHTML = '<p class="empty">No hay memes recientes</p>';
      return;
    }

    container.innerHTML = this.recentMemes.map((meme, i) => `
      <div class="recent-meme" onclick="meme.loadRecent(${i})" title="Cargar meme #${i + 1}">
        <img src="${meme}" alt="Meme ${i + 1}">
      </div>
    `).join('');
  }

  loadRecent(index) {
    const dataUrl = this.recentMemes[index];
    const img = new Image();
    img.onload = () => {
      this.backgroundImage = img;
      this.setCanvasSize();
      this.updateMeme();
    };
    img.src = dataUrl;
  }

  // ===== UTILITIES =====
  reset() {
    this.config = {
      topText: '',
      bottomText: '',
      topColor: '#ffffff',
      bottomColor: '#ffffff',
      topSize: 40,
      bottomSize: 40,
      topY: 10,
      bottomY: 90,
      outline: true,
      shadow: false,
      uppercase: false,
      bgOpacity: 100
    };

    // Reset form
    document.getElementById('topText').value = '';
    document.getElementById('bottomText').value = '';
    document.getElementById('topColor').value = '#ffffff';
    document.getElementById('bottomColor').value = '#ffffff';
    document.getElementById('topSize').value = 40;
    document.getElementById('bottomSize').value = 40;
    document.getElementById('topY').value = 10;
    document.getElementById('bottomY').value = 90;
    document.getElementById('outlineToggle').checked = true;
    document.getElementById('shadowToggle').checked = false;
    document.getElementById('uppercaseToggle').checked = false;
    document.getElementById('bgOpacity').value = 100;

    document.getElementById('topSizeValue').textContent = '40px';
    document.getElementById('bottomSizeValue').textContent = '40px';
    document.getElementById('topYValue').textContent = '10%';
    document.getElementById('bottomYValue').textContent = '90%';
    document.getElementById('bgOpacityValue').textContent = '100%';

    this.updateMeme();
  }
}

let meme;

document.addEventListener('DOMContentLoaded', () => {
  meme = new MemeGenerator();
  meme.renderRecent();
});
