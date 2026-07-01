class MusicApp {
  constructor() {
    this.audio = document.getElementById('audioPlayer');
    this.canvas = document.getElementById('visualizer');
    this.ctx = this.canvas.getContext('2d');
    
    // Setup canvas
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    // Audio context
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;
    this.bufferLength = 0;

    // Playlist
    this.playlist = JSON.parse(localStorage.getItem('music-playlist')) || [];
    this.currentIndex = -1;

    // Visualizer
    this.vizType = 'bars';
    this.sensitivity = 100;
    this.vizColor = '#ff6b6b';
    this.darkMode = true;

    this.animationId = null;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initAudioContext();
    this.renderPlaylist();
    this.startAnimation();
  }

  setupEventListeners() {
    // Play/Pause
    document.getElementById('playBtn').addEventListener('click', () => this.togglePlay());
    document.getElementById('prevBtn').addEventListener('click', () => this.previousSong());
    document.getElementById('nextBtn').addEventListener('click', () => this.nextSong());

    // Progress
    document.getElementById('progressSlider').addEventListener('input', (e) => {
      this.audio.currentTime = (e.target.value / 100) * this.audio.duration;
    });

    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('ended', () => this.nextSong());
    this.audio.addEventListener('loadedmetadata', () => this.updateDuration());

    // Volume
    document.getElementById('volumeSlider').addEventListener('input', (e) => {
      this.audio.volume = e.target.value / 100;
      document.getElementById('volumePercent').textContent = e.target.value + '%';
    });

    // Speed
    document.getElementById('speedSelect').addEventListener('change', (e) => {
      this.audio.playbackRate = parseFloat(e.target.value);
    });

    // Playlist
    document.getElementById('addSongBtn').addEventListener('click', () => this.showModal());
    document.getElementById('addBtn').addEventListener('click', () => this.addSong());
    document.getElementById('clearPlaylistBtn').addEventListener('click', () => this.clearPlaylist());

    // Visualizer
    document.getElementById('visualizerType').addEventListener('change', (e) => {
      this.vizType = e.target.value;
    });

    document.getElementById('sensitivity').addEventListener('input', (e) => {
      this.sensitivity = parseInt(e.target.value);
      document.getElementById('sensitivityValue').textContent = e.target.value + '%';
    });

    document.getElementById('vizColor').addEventListener('change', (e) => {
      this.vizColor = e.target.value;
    });

    document.getElementById('darkMode').addEventListener('change', (e) => {
      this.darkMode = e.target.checked;
    });

    // Color presets
    document.querySelectorAll('.color-preset').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const color = e.target.dataset.color;
        this.vizColor = color;
        document.getElementById('vizColor').value = color;
      });
    });

    // EQ
    document.querySelectorAll('.eq-slider').forEach(slider => {
      slider.addEventListener('input', (e) => {
        // Simulated EQ effect
        console.log(`Band: ${e.target.closest('.eq-band').dataset.band}Hz, Value: ${e.target.value}`);
      });
    });

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlay();
      }
    });

    // Responsive canvas
    window.addEventListener('resize', () => {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    });
  }

  initAudioContext() {
    if (!this.audioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      
      const source = this.audioContext.createMediaElementAudioSource(this.audio);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;

      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);

      source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    }
  }

  // ===== PLAYBACK =====
  togglePlay() {
    if (!this.playlist.length) {
      alert('Agrega canciones a la playlist');
      return;
    }

    if (this.currentIndex === -1) {
      this.currentIndex = 0;
      this.playSong();
    } else if (this.audio.paused) {
      this.audio.play();
      document.getElementById('playBtn').textContent = '⏸️';
    } else {
      this.audio.pause();
      document.getElementById('playBtn').textContent = '▶️';
    }
  }

  playSong() {
    if (this.currentIndex < 0 || this.currentIndex >= this.playlist.length) {
      return;
    }

    const song = this.playlist[this.currentIndex];
    this.audio.src = song.url;
    this.audio.play();

    document.getElementById('playBtn').textContent = '⏸️';
    document.getElementById('songTitle').textContent = song.name;
    document.getElementById('songArtist').textContent = song.artist;

    this.updatePlaylistUI();
  }

  nextSong() {
    this.currentIndex++;
    if (this.currentIndex >= this.playlist.length) {
      this.currentIndex = 0;
    }
    this.playSong();
  }

  previousSong() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.playlist.length - 1;
    }
    this.playSong();
  }

  updateProgress() {
    if (this.audio.duration) {
      document.getElementById('progressSlider').value = (this.audio.currentTime / this.audio.duration) * 100;
      document.getElementById('currentTime').textContent = this.formatTime(this.audio.currentTime);
    }
  }

  updateDuration() {
    document.getElementById('duration').textContent = this.formatTime(this.audio.duration);
  }

  formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // ===== PLAYLIST =====
  addSong() {
    const url = document.getElementById('songUrl').value;
    const name = document.getElementById('songName').value || 'Sin nombre';
    const artist = document.getElementById('songAuthor').value || 'Artista desconocido';

    if (!url) {
      alert('Ingresa una URL válida');
      return;
    }

    this.playlist.push({ url, name, artist });
    this.savePlaylist();
    this.renderPlaylist();
    this.closeModal();

    // Clear form
    document.getElementById('songUrl').value = '';
    document.getElementById('songName').value = '';
    document.getElementById('songAuthor').value = '';
  }

  renderPlaylist() {
    const container = document.getElementById('playlist');
    
    if (this.playlist.length === 0) {
      container.innerHTML = '<div class="playlist-empty">La playlist está vacía</div>';
      document.getElementById('songCount').textContent = '0';
      return;
    }

    container.innerHTML = this.playlist.map((song, i) => `
      <div class="playlist-item ${i === this.currentIndex ? 'active' : ''}" onclick="player.selectSong(${i})">
        <div class="playlist-item-title">${song.name}</div>
        <div class="playlist-item-artist">${song.artist}</div>
      </div>
    `).join('');

    document.getElementById('songCount').textContent = this.playlist.length;
  }

  updatePlaylistUI() {
    const items = document.querySelectorAll('.playlist-item');
    items.forEach((item, i) => {
      item.classList.toggle('active', i === this.currentIndex);
    });
  }

  selectSong(index) {
    this.currentIndex = index;
    this.playSong();
  }

  clearPlaylist() {
    if (confirm('¿Eliminar todas las canciones?')) {
      this.playlist = [];
      this.currentIndex = -1;
      this.audio.src = '';
      this.savePlaylist();
      this.renderPlaylist();
      document.getElementById('playBtn').textContent = '▶️';
    }
  }

  savePlaylist() {
    localStorage.setItem('music-playlist', JSON.stringify(this.playlist));
  }

  // ===== VISUALIZER =====
  startAnimation() {
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this.draw();
    };
    animate();
  }

  draw() {
    if (!this.analyser) return;

    this.analyser.getByteFrequencyData(this.dataArray);

    // Clear canvas
    const bgColor = this.darkMode ? '#0f0f0f' : '#fff';
    this.ctx.fillStyle = bgColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    switch (this.vizType) {
      case 'bars':
        this.drawBars();
        break;
      case 'waveform':
        this.drawWaveform();
        break;
      case 'spiral':
        this.drawSpiral();
        break;
      case 'circles':
        this.drawCircles();
        break;
    }

    this.updateFrequency();
  }

  drawBars() {
    const barWidth = this.canvas.width / this.bufferLength * 2.5;
    let x = 0;

    this.ctx.fillStyle = this.vizColor;

    for (let i = 0; i < this.bufferLength; i++) {
      const barHeight = (this.dataArray[i] * this.sensitivity / 100) / 255 * this.canvas.height;

      this.ctx.fillRect(x, this.canvas.height - barHeight, barWidth - 1, barHeight);
      x += barWidth;
    }
  }

  drawWaveform() {
    this.ctx.strokeStyle = this.vizColor;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();

    const sliceWidth = this.canvas.width / this.bufferLength;
    let x = 0;

    for (let i = 0; i < this.bufferLength; i++) {
      const v = this.dataArray[i] / 128.0;
      const y = v * this.canvas.height / 2;

      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
    this.ctx.stroke();
  }

  drawSpiral() {
    this.ctx.strokeStyle = this.vizColor;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();

    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    for (let i = 0; i < this.bufferLength; i++) {
      const angle = (i / this.bufferLength) * Math.PI * 2;
      const radius = (this.dataArray[i] * this.sensitivity / 100) / 255 * Math.min(centerX, centerY);

      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }

    this.ctx.stroke();
  }

  drawCircles() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    for (let i = 0; i < this.bufferLength; i++) {
      const radius = (this.dataArray[i] * this.sensitivity / 100) / 255 * 150 + 20;

      this.ctx.strokeStyle = this.vizColor;
      this.ctx.globalAlpha = 0.3 + (i / this.bufferLength) * 0.7;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      this.ctx.stroke();
    }

    this.ctx.globalAlpha = 1;
  }

  updateFrequency() {
    if (this.dataArray.length) {
      const avg = this.dataArray.reduce((a, b) => a + b) / this.dataArray.length;
      const frequency = Math.round(avg * 2);
      document.getElementById('frequency').textContent = frequency + ' Hz';
      document.getElementById('volume').textContent = 'VOL: ' + Math.round(this.audio.volume * 100) + '%';
    }
  }

  // ===== MODAL =====
  showModal() {
    document.getElementById('addSongModal').classList.remove('hidden');
    document.getElementById('modalOverlay').classList.remove('hidden');
  }

  closeModal() {
    document.getElementById('addSongModal').classList.add('hidden');
    document.getElementById('modalOverlay').classList.add('hidden');
  }
}

let player;

document.addEventListener('DOMContentLoaded', () => {
  player = new MusicApp();
});
