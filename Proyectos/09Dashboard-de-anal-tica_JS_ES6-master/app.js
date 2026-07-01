class DashboardAnalitca {
  constructor() {
    this.city = 'Madrid';
    this.weatherData = null;
    this.cryptoData = [];
    this.stockData = [];
    this.charts = {};
    this.config = {
      weatherAPI: 'https://api.open-meteo.com/v1/forecast',
      cryptoAPI: 'https://api.coingecko.com/api/v3',
      refreshInterval: 300000 // 5 minutos
    };

    this.init();
  }

  init() {
    console.log('Inicializando Dashboard de Analítica...');
    this.setupEventListeners();
    this.loadDashboard();
    this.setupAutoRefresh();
  }

  setupEventListeners() {
    document.getElementById('refreshBtn').addEventListener('click', () => this.loadDashboard());
    document.getElementById('cityInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.city = e.target.value || 'Madrid';
        this.loadDashboard();
      }
    });
  }

  // ===== DATOS =====
  async loadDashboard() {
    this.showLoader('weatherLoader', true);
    this.showLoader('cryptoLoader', true);
    this.showLoader('stockLoader', true);
    this.showLoader('btcChartLoader', true);
    this.showLoader('topCryptoLoader', true);
    this.showLoader('marketLoader', true);

    await Promise.all([
      this.fetchWeather(),
      this.fetchCryptoData(),
      this.fetchStockData()
    ]);

    this.updateLastUpdate();
  }

  async fetchWeather() {
    try {
      // Obtener coordenadas (simulado con ciudades conocidas)
      const coordinates = {
        'madrid': { lat: 40.4168, lon: -3.7038 },
        'barcelona': { lat: 41.3874, lon: 2.1686 },
        'nueva york': { lat: 40.7128, lon: -74.0060 },
        'Londres': { lat: 51.5074, lon: -0.1278 },
        'tokio': { lat: 35.6762, lon: 139.6503 }
      };

      const coords = coordinates[this.city.toLowerCase()] || coordinates['madrid'];

      const response = await fetch(
        `${this.config.weatherAPI}?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,weather_code,relative_humidity_2m,weather_code&timezone=auto`
      );
      const data = await response.json();
      
      this.weatherData = {
        city: this.city,
        temperature: Math.round(data.current.temperature_2m),
        humidity: data.current.relative_humidity_2m,
        condition: this.getWeatherCondition(data.current.weather_code)
      };

      this.renderWeather();
    } catch (error) {
      console.error('Error fetching weather:', error);
      this.showNotification('⚠️ Error al cargar datos del clima');
    } finally {
      this.showLoader('weatherLoader', false);
    }
  }

  async fetchCryptoData() {
    try {
      const response = await fetch(
        `${this.config.cryptoAPI}/simple/price?ids=bitcoin,ethereum,cardano,solana,ripple&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
      );
      const data = await response.json();

      this.cryptoData = [
        { name: 'Bitcoin', symbol: 'BTC', ...data.bitcoin },
        { name: 'Ethereum', symbol: 'ETH', ...data.ethereum },
        { name: 'Cardano', symbol: 'ADA', ...data.cardano },
        { name: 'Solana', symbol: 'SOL', ...data.solana },
        { name: 'Ripple', symbol: 'XRP', ...data.ripple }
      ];

      this.renderCrypto();
      this.renderTopCrypto();
      this.updateCharts();
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      this.showNotification('⚠️ Error al cargar datos de criptomonedas');
    } finally {
      this.showLoader('cryptoLoader', false);
      this.showLoader('topCryptoLoader', false);
    }
  }

  async fetchStockData() {
    try {
      // Datos simulados de acciones tech (ya que requeriría API key pagada)
      this.stockData = {
        companies: ['AAPL', 'GOOGL', 'MSFT', 'TESLA', 'META'],
        prices: [195.42, 141.23, 425.51, 242.84, 312.67],
        changes: [2.5, -1.2, 3.1, -0.8, 4.2]
      };

      this.renderStockChart();
      this.renderMarketStats();
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      this.showLoader('stockLoader', false);
      this.showLoader('marketLoader', false);
    }
  }

  // ===== RENDERIZACIÓN =====
  renderWeather() {
    const icons = {
      'Soleado': '☀️',
      'Parcialmente nublado': '⛅',
      'Nublado': '☁️',
      'Lluvioso': '🌧️',
      'Tormenta': '⛈️',
      'Nieve': '❄️'
    };

    const content = document.getElementById('weatherContent');
    content.innerHTML = `
      <div class="weather-icon">${icons[this.weatherData.condition] || '🌤️'}</div>
      <div class="weather-info">
        <h3>${this.weatherData.city}</h3>
        <div class="weather-temp">${this.weatherData.temperature}°C</div>
        <div class="weather-details">
          <div class="weather-detail-item">
            <span>Condición:</span>
            <strong>${this.weatherData.condition}</strong>
          </div>
          <div class="weather-detail-item">
            <span>Humedad:</span>
            <strong>${this.weatherData.humidity}%</strong>
          </div>
        </div>
      </div>
    `;
  }

  renderCrypto() {
    const container = document.querySelector('.crypto-list');
    container.innerHTML = this.cryptoData.slice(0, 3).map(crypto => {
      const change = crypto.usd_24h_change || 0;
      const isPositive = change >= 0;
      return `
        <div class="crypto-item">
          <div class="crypto-name">${crypto.symbol} - ${crypto.name}</div>
          <div class="crypto-price">$${crypto.usd?.toLocaleString('es-ES', { maximumFractionDigits: 2 })}</div>
          <div class="crypto-change ${isPositive ? 'positive' : 'negative'}">
            ${isPositive ? '📈' : '📉'} ${Math.abs(change).toFixed(2)}%
          </div>
        </div>
      `;
    }).join('');
  }

  renderTopCrypto() {
    const container = document.getElementById('topCryptoList');
    container.innerHTML = this.cryptoData.map((crypto, index) => {
      const change = crypto.usd_24h_change || 0;
      const isPositive = change >= 0;
      return `
        <div class="stat-item">
          <div class="stat-rank">#${index + 1}</div>
          <div class="stat-label">
            <span class="stat-name">${crypto.symbol} - ${crypto.name}</span>
            <span class="stat-value">$${crypto.usd?.toLocaleString('es-ES', { maximumFractionDigits: 2 })}</span>
          </div>
          <div class="crypto-change ${isPositive ? 'positive' : 'negative'}">
            ${isPositive ? '📈' : '📉'} ${Math.abs(change).toFixed(2)}%
          </div>
        </div>
      `;
    }).join('');
  }

  renderMarketStats() {
    const container = document.getElementById('marketStats');
    const totalMarketCap = this.cryptoData.reduce((acc, c) => acc + (c.usd_market_cap || 0), 0);
    const avgChange = (this.cryptoData.reduce((acc, c) => acc + (c.usd_24h_change || 0), 0) / this.cryptoData.length).toFixed(2);

    container.innerHTML = `
      <div class="stat-item">
        <span class="stat-name">📊 Cap. de Mercado Total</span>
        <span class="stat-value">$${(totalMarketCap / 1e9).toFixed(2)}B</span>
      </div>
      <div class="stat-item">
        <span class="stat-name">📈 Cambio Promedio 24h</span>
        <span class="stat-value" style="color: ${avgChange >= 0 ? '#4ade80' : '#ff6b6b'}">${avgChange}%</span>
      </div>
      <div class="stat-item">
        <span class="stat-name">🔝 Mejor Performer</span>
        <span class="stat-value">${this.cryptoData.reduce((a, b) => 
          (a.usd_24h_change || 0) > (b.usd_24h_change || 0) ? a : b
        ).symbol}</span>
      </div>
      <div class="stat-item">
        <span class="stat-name">📍 Peor Performer</span>
        <span class="stat-value">${this.cryptoData.reduce((a, b) => 
          (a.usd_24h_change || 0) < (b.usd_24h_change || 0) ? a : b
        ).symbol}</span>
      </div>
    `;
  }

  renderStockChart() {
    const ctx = document.getElementById('stockChart')?.getContext('2d');
    if (!ctx) return;

    if (this.charts.stock) this.charts.stock.destroy();

    this.charts.stock = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.stockData.companies,
        datasets: [{
          label: 'Precio (USD)',
          data: this.stockData.prices,
          backgroundColor: this.stockData.changes.map(c => c >= 0 ? 'rgba(74, 222, 128, 0.6)' : 'rgba(255, 107, 107, 0.6)'),
          borderColor: this.stockData.changes.map(c => c >= 0 ? '#4ade80' : '#ff6b6b'),
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            labels: { color: '#e0e0e0' }
          }
        },
        scales: {
          y: {
            ticks: { color: '#aaa' },
            grid: { color: '#1a4d7a' }
          },
          x: {
            ticks: { color: '#aaa' },
            grid: { color: '#1a4d7a' }
          }
        }
      }
    });

    this.showLoader('stockLoader', false);
  }

  updateCharts() {
    const ctx = document.getElementById('btcChart')?.getContext('2d');
    if (!ctx) return;

    if (this.charts.btc) this.charts.btc.destroy();

    const bitcoinPrice = this.cryptoData[0].usd;
    const simulatedData = {
      labels: ['Hace 5h', 'Hace 4h', 'Hace 3h', 'Hace 2h', 'Hace 1h', 'Ahora'],
      data: [
        bitcoinPrice * 0.995,
        bitcoinPrice * 0.992,
        bitcoinPrice * 0.998,
        bitcoinPrice * 1.002,
        bitcoinPrice * 1.001,
        bitcoinPrice
      ]
    };

    this.charts.btc = new Chart(ctx, {
      type: 'line',
      data: {
        labels: simulatedData.labels,
        datasets: [{
          label: 'Bitcoin (USD)',
          data: simulatedData.data,
          borderColor: '#fbbf24',
          backgroundColor: 'rgba(251, 191, 36, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            labels: { color: '#e0e0e0' }
          }
        },
        scales: {
          y: {
            ticks: { color: '#aaa' },
            grid: { color: '#1a4d7a' }
          },
          x: {
            ticks: { color: '#aaa' },
            grid: { color: '#1a4d7a' }
          }
        }
      }
    });

    this.showLoader('btcChartLoader', false);
  }

  // ===== UTILIDADES =====
  getWeatherCondition(code) {
    const conditions = {
      0: 'Soleado',
      1: 'Parcialmente nublado',
      2: 'Nublado',
      3: 'Tormenta',
      45: 'Brumoso',
      48: 'Brumoso',
      51: 'Llovizna',
      61: 'Lluvia',
      80: 'Lluvia'
    };
    return conditions[code] || 'Variable';
  }

  updateLastUpdate() {
    const now = new Date();
    const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('lastUpdate').textContent = time;
  }

  showLoader(id, show) {
    const loader = document.getElementById(id);
    if (loader) {
      if (show) {
        loader.classList.remove('hidden');
      } else {
        loader.classList.add('hidden');
      }
    }
  }

  showNotification(message) {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notificationText');
    text.textContent = message;
    notification.classList.remove('hidden');

    setTimeout(() => {
      notification.classList.add('hidden');
    }, 3000);
  }

  setupAutoRefresh() {
    setInterval(() => this.loadDashboard(), this.config.refreshInterval);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DashboardAnalitca();
});
