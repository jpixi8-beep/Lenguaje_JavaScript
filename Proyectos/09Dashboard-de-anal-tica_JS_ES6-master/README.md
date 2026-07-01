# 📊 Dashboard de Analítica – Datos en Tiempo Real

Dashboard profesional desarrollado en **JavaScript ES6 Vanilla** que agregra datos en tiempo real de clima, criptomonedas y acciones del mercado. Ideal para ver información financiera y meteorológica de forma centralizada y visualmente atractiva.

---

## 🚀 Características principales

- **Clima en Tiempo Real**:
  - Búsqueda de ciudades.
  - Temperatura, humedad, condiciones.
  - Iconos emojis dinámicos.
  - Actualización automática.

- **Datos de Criptomonedas**:
  - 5 principales: Bitcoin, Ethereum, Cardano, Solana, Ripple.
  - Precios en USD.
  - Cambio 24h con indicadores.
  - Datos de mercado en tiempo real.

- **Gráficos visuales**:
  - Gráfico de barras para acciones tech.
  - Gráfico de líneas para Bitcoin.
  - Chart.js para visualización profesional.
  - Actualización dinámica.

- **Estadísticas del Mercado**:
  - Top 5 criptomonedas.
  - Capitalización total de mercado.
  - Cambio promedio 24h.
  - Mejor y peor performer.

- **Sistema de Alertas**:
  - Alertas de cambios significativos.
  - Notificaciones en tiempo real.
  - Historial de alertas.

- **Auto-actualización**:
  - Refresco automático cada 5 minutos.
  - Botón manual de actualización.
  - Timestamp de última actualización.

- **Diseño Responsivo**:
  - Layout adaptable.
  - Funciona en desktop, tablet y móvil.
  - Interfaz intuitiva.

---

## 📸 Pantallazo de ejemplo

![Dashboard Example](image.png)

---

## 🛠️ Tecnologías utilizadas

- **HTML5** – Estructura semántica.
- **CSS3** – Flexbox, Grid, Animaciones, Gradientes.
- **JavaScript ES6** – Clases, fetch API, async/await.
- **Chart.js** – Visualización de gráficos.
- **APIs Externas**:
  - OpenWeatherMap (clima)
  - CoinGecko API (criptomonedas)

---

## 📋 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexión a Internet (para APIs)
- No requiere servidor backend

---

## 🚀 Cómo correr localmente

### Opción 1: Abrir directamente
1. Descarga o clona el repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo! El dashboard se cargará con datos en vivo

### Opción 2: Con servidor local (recomendado)
```bash
# Navega a la carpeta del proyecto
cd 08DashboardAnalitca_JS_ES6

# Con Python 3
python -m http.server 8000

# O con Node.js + http-server
npx http-server

# Accede a: http://localhost:8000
```

---

## 📖 Cómo usar

### 1. Ver el Clima
1. Por defecto muestra "Madrid".
2. Escribe una ciudad en el buscador.
3. Presiona Enter para actualizar.
4. Verás temperatura, humedad y condición.

### 2. Monitorear Criptomonedas
1. Visualiza 5 principales cripto.
2. Mira precios actuales en USD.
3. Observa cambios de 24h (verde/rojo).
4. Consulta el Top 5 con ranking.

### 3. Analizar Mercado de Acciones
1. Gráfico de barras con tech stocks.
2. Precios de AAPL, GOOGL, MSFT, TESLA, META.
3. Colores indican alza (verde) o baja (rojo).
4. Gráfico de líneas para Bitcoin.

### 4. Estadísticas del Mercado
1. Cap. de Mercado Total.
2. Cambio Promedio 24h.
3. Mejor y Peor Performer.
4. Actualiza automáticamente cada 5 min.

### 5. Recibir Alertas
1. Sistema de alertas automático.
2. Notificaciones de cambios significativos.
3. Historial visible en panel.

---

## 🎨 Estructura del código

```javascript
class DashboardAnalitca {
  // Inicialización
  init()

  // Eventos
  setupEventListeners()

  // Datos
  fetchWeather()
  fetchCryptoData()
  fetchStockData()

  // Renderización
  renderWeather()
  renderCrypto()
  renderTopCrypto()
  renderMarketStats()
  renderStockChart()

  // Gráficos
  updateCharts()

  // Utilidades
  showNotification()
  showLoader()
  setupAutoRefresh()
}
```

---

## 🔄 Flujo de datos

```
┌─────────────────────────────────────┐
│   Inicialización del Dashboard      │
└─────────────────────────────────────┘
           │
    ┌──────┴──────────────────────────┐
    │                                 │
    ▼                                 ▼
┌──────────────────┐      ┌──────────────────────┐
│ OpenWeatherMap   │      │  CoinGecko API       │
│ (Clima)          │      │  (Criptomonedas)     │
└──────────────────┘      └──────────────────────┘
    │                                 │
    ▼                                 ▼
┌──────────────────┐      ┌──────────────────────┐
│ Renderizar       │      │ Renderizar Crypto    │
│ Clima            │      │ + Gráficos           │
└──────────────────┘      └──────────────────────┘
           │
    ┌──────┴──────────┐
    │                 │
    ▼                 ▼
┌──────────────┐ ┌──────────────┐
│ Notificaciones│ │ Auto-refresh │
│ (cada 5 min)  │ │ (Timer)       │
└──────────────┘ └──────────────┘
```

---

## 📊 APIs Utilizadas

### OpenWeatherMap API
```
Endpoint: https://api.open-meteo.com/v1/forecast
Parámetros: latitude, longitude, current, timezone
Sin autenticación requerida
```

### CoinGecko API
```
Endpoint: https://api.coingecko.com/api/v3/simple/price
Parámetros: ids, vs_currencies, include_market_cap, include_24hr_change
Gratuita, sin límite de llamadas
```

---

## 📊 Datos mostrados

| Widget | Datos | Fuente |
|--------|-------|--------|
| Clima | Temp, Humedad, Condición | OpenWeatherMap |
| Crypto Top 5 | Precio, Cambio 24h | CoinGecko |
| Stock Chart | Precios AAPL, GOOGL, MSFT, TESLA, META | Simulado |
| Bitcoin Chart | Histórico 6h | CoinGecko + Simulado |
| Market Stats | Cap Global, Avg Change | CoinGecko |

---

## 🔄 Auto-actualización

- **Intervalo**: 5 minutos (300,000 ms)
- **Botón manual**: Refresh inmediato
- **Timestamp**: Última actualización visible

---

## ⚠️ Limitaciones

- Stock data es simulado (requeriría API key pagada)
- Límites de rate en CoinGecko (generoso)
- Geolocalización manual por ciudad
- Weather solo por coordinate

---

## 🚀 Mejoras futuras

- Integración con datos de acciones reales
- Predicciones de clima con IA
- Alertas personalizables por precio
- Historial de cambios (gráficos históricos)
- Exportación de datos a CSV
- Comparativa de múltiples criptos
- Trading signals automáticos
- Base de datos para persistencia
- Dark/Light mode toggle
- Notaciones científicas para números grandes

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Datos no cargan | Verifica conexión a Internet |
| CORS errors | Usa servidor local (no abras archivo directo) |
| Gráficos en blanco | Recarga la página |
| Clima no actualiza | Verifica el nombre de ciudad |
| API no responde | CoinGecko puede tener delays |

---

## 📝 Licencia

Proyecto personal para portfolio. Libre para usar y modificar.

---

**Desarrollado por**: Jorge A. Fuentes (Lechu)  
**Última actualización**: Febrero 2026
