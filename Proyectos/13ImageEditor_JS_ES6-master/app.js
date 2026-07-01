class ImageEditor {
  constructor() {
    this.canvas = document.getElementById('mainCanvas');
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    
    this.originalImage = null;
    this.currentImage = null;
    this.zoom = 1;
    this.history = [];
    this.cropMode = false;
    this.cropBox = null;

    // Filters
    this.filters = {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
      opacity: 100,
      blur: 0
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // File input
    document.getElementById('imageInput').addEventListener('change', (e) => this.handleImageUpload(e));

    // Filters
    document.getElementById('brightnessSlider').addEventListener('input', (e) => {
      this.filters.brightness = parseInt(e.target.value);
      document.getElementById('brightnessValue').textContent = e.target.value + '%';
      this.applyFilters();
    });

    document.getElementById('contrastSlider').addEventListener('input', (e) => {
      this.filters.contrast = parseInt(e.target.value);
      document.getElementById('contrastValue').textContent = e.target.value + '%';
      this.applyFilters();
    });

    document.getElementById('saturationSlider').addEventListener('input', (e) => {
      this.filters.saturation = parseInt(e.target.value);
      document.getElementById('saturationValue').textContent = e.target.value + '%';
      this.applyFilters();
    });

    document.getElementById('hueSlider').addEventListener('input', (e) => {
      this.filters.hue = parseInt(e.target.value);
      document.getElementById('hueValue').textContent = e.target.value + '°';
      this.applyFilters();
    });

    document.getElementById('opacitySlider').addEventListener('input', (e) => {
      this.filters.opacity = parseInt(e.target.value);
      document.getElementById('opacityValue').textContent = e.target.value + '%';
      this.applyFilters();
    });

    document.getElementById('blurSlider').addEventListener('input', (e) => {
      this.filters.blur = parseInt(e.target.value);
      document.getElementById('blurValue').textContent = e.target.value + 'px';
      this.applyFilters();
    });

    // Crop
    document.getElementById('cropBtn').addEventListener('click', () => this.toggleCropMode());
    document.getElementById('applyCropBtn').addEventListener('click', () => this.applyCrop());
    document.getElementById('cancelCropBtn').addEventListener('click', () => this.cancelCrop());

    // Presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.applyPreset(e.target.dataset.preset));
    });

    // Actions
    document.getElementById('resetBtn').addEventListener('click', () => this.reset());
    document.getElementById('downloadBtn').addEventListener('click', () => this.download());
    document.getElementById('copyBtn').addEventListener('click', () => this.copyToClipboard());

    // Zoom
    document.getElementById('zoomInBtn').addEventListener('click', () => this.zoom += 0.2);
    document.getElementById('zoomOutBtn').addEventListener('click', () => {
      if (this.zoom > 0.5) this.zoom -= 0.2;
    });
    document.getElementById('zoomResetBtn').addEventListener('click', () => this.zoom = 1);

    // Crop overlay
    document.getElementById('cropBox').addEventListener('mousedown', (e) => this.startDragCrop(e));

    // Canvas wrapper scroll
    const wrapper = document.querySelector('.canvas-wrapper');
    wrapper.addEventListener('scroll', () => this.updateCanvasPosition());
  }

  // ===== IMAGE HANDLING =====
  handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        this.originalImage = img;
        this.currentImage = img;
        this.resetFilters();
        this.render();
        this.updateImageInfo(file, img);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  updateImageInfo(file, img) {
    const kb = (file.size / 1024).toFixed(2);
    const info = `
      <p><strong>Nombre:</strong> ${file.name}</p>
      <p><strong>Tamaño:</strong> ${kb} KB</p>
      <p><strong>Dimensiones:</strong> ${img.width}x${img.height}px</p>
      <p><strong>Tipo:</strong> ${file.type}</p>
    `;
    document.getElementById('imageInfo').innerHTML = info;
  }

  // ===== FILTERS =====
  applyFilters() {
    if (!this.originalImage) return;

    this.canvas.width = this.originalImage.width;
    this.canvas.height = this.originalImage.height;

    // Draw image with filters
    const f = this.filters;
    this.ctx.filter = `
      brightness(${f.brightness}%)
      contrast(${f.contrast}%)
      saturate(${f.saturation}%)
      hue-rotate(${f.hue}deg)
      blur(${f.blur}px)
    `;

    this.ctx.globalAlpha = f.opacity / 100;
    this.ctx.drawImage(this.originalImage, 0, 0);
    this.ctx.globalAlpha = 1;
    this.ctx.filter = 'none';
  }

  applyPreset(preset) {
    switch (preset) {
      case 'bw':
        this.resetFilters();
        this.filters.saturation = 0;
        break;
      case 'sepia':
        this.resetFilters();
        this.filters.hue = 30;
        this.filters.saturation = 50;
        break;
      case 'vintage':
        this.resetFilters();
        this.filters.brightness = 110;
        this.filters.saturation = 70;
        this.filters.hue = 15;
        break;
      case 'vibrant':
        this.resetFilters();
        this.filters.saturation = 150;
        this.filters.contrast = 120;
        break;
    }

    this.updateFilterSliders();
    this.applyFilters();
  }

  resetFilters() {
    this.filters = {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
      opacity: 100,
      blur: 0
    };
  }

  updateFilterSliders() {
    document.getElementById('brightnessSlider').value = this.filters.brightness;
    document.getElementById('contrastSlider').value = this.filters.contrast;
    document.getElementById('saturationSlider').value = this.filters.saturation;
    document.getElementById('hueSlider').value = this.filters.hue;
    document.getElementById('opacitySlider').value = this.filters.opacity;
    document.getElementById('blurSlider').value = this.filters.blur;

    document.getElementById('brightnessValue').textContent = this.filters.brightness + '%';
    document.getElementById('contrastValue').textContent = this.filters.contrast + '%';
    document.getElementById('saturationValue').textContent = this.filters.saturation + '%';
    document.getElementById('hueValue').textContent = this.filters.hue + '°';
    document.getElementById('opacityValue').textContent = this.filters.opacity + '%';
    document.getElementById('blurValue').textContent = this.filters.blur + 'px';
  }

  // ===== CROP =====
  toggleCropMode() {
    if (!this.originalImage) {
      alert('Carga una imagen primero');
      return;
    }

    this.cropMode = !this.cropMode;
    const overlay = document.getElementById('cropOverlay');
    const cropBtn = document.getElementById('cropBtn');
    const applyCropBtn = document.getElementById('applyCropBtn');
    const cancelCropBtn = document.getElementById('cancelCropBtn');

    if (this.cropMode) {
      overlay.classList.add('active');
      cropBtn.classList.add('hidden');
      applyCropBtn.classList.remove('hidden');
      cancelCropBtn.classList.remove('hidden');

      // Initialize crop box
      this.cropBox = {
        x: 50,
        y: 50,
        width: 200,
        height: 200
      };
      this.renderCropBox();
    } else {
      this.cancelCrop();
    }
  }

  renderCropBox() {
    const box = document.getElementById('cropBox');
    box.style.left = this.cropBox.x + 'px';
    box.style.top = this.cropBox.y + 'px';
    box.style.width = this.cropBox.width + 'px';
    box.style.height = this.cropBox.height + 'px';
  }

  startDragCrop(e) {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startBoxX = this.cropBox.x;
    const startBoxY = this.cropBox.y;

    const handleMouseMove = (moveEvent) => {
      this.cropBox.x = startBoxX + (moveEvent.clientX - startX);
      this.cropBox.y = startBoxY + (moveEvent.clientY - startY);
      this.renderCropBox();
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  applyCrop() {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.cropBox.width;
    tempCanvas.height = this.cropBox.height;
    const tempCtx = tempCanvas.getContext('2d');

    tempCtx.drawImage(
      this.originalImage,
      this.cropBox.x,
      this.cropBox.y,
      this.cropBox.width,
      this.cropBox.height,
      0,
      0,
      this.cropBox.width,
      this.cropBox.height
    );

    const croppedImg = new Image();
    croppedImg.onload = () => {
      this.originalImage = croppedImg;
      this.currentImage = croppedImg;
      this.cancelCrop();
      this.applyFilters();
    };
    croppedImg.src = tempCanvas.toDataURL();
  }

  cancelCrop() {
    this.cropMode = false;
    document.getElementById('cropOverlay').classList.remove('active');
    document.getElementById('cropBtn').classList.remove('hidden');
    document.getElementById('applyCropBtn').classList.add('hidden');
    document.getElementById('cancelCropBtn').classList.add('hidden');
  }

  // ===== EXPORT =====
  download() {
    if (!this.originalImage) {
      alert('No hay imagen para descargar');
      return;
    }

    const link = document.createElement('a');
    link.href = this.canvas.toDataURL('image/png');
    link.download = `edited-image-${Date.now()}.png`;
    link.click();
  }

  copyToClipboard() {
    if (!this.originalImage) return;

    this.canvas.toBlob((blob) => {
      navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]).then(() => {
        alert('✅ Imagen copiada al portapapeles');
      }).catch(() => {
        alert('❌ Error al copiar');
      });
    });
  }

  // ===== UTILITIES =====
  reset() {
    if (!this.originalImage) return;
    this.resetFilters();
    this.updateFilterSliders();
    this.applyFilters();
  }

  updateCanvasPosition() {
    document.getElementById('zoomLevel').textContent = Math.round(this.zoom * 100) + '%';
    this.render();
  }

  render() {
    this.canvas.style.transform = `scale(${this.zoom})`;
    this.applyFilters();
  }
}

let editor;

document.addEventListener('DOMContentLoaded', () => {
  editor = new ImageEditor();
});
