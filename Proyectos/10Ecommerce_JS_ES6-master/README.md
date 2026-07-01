# 🛍️ E-Commerce Simple – Tienda Online Funcional

E-commerce completo desarrollado en **JavaScript ES6 Vanilla** con carrito de compras, checkout simulado y persistencia de datos. Ideal para mostrar un caso de uso real de desarrollo frontend.

---

## 🚀 Características principales

- **Catálogo de Productos**:
  - 9 productos distribuidos en 3 categorías.
  - Laptops, Celulares, Accesorios.
  - Con descripciones, precios y ratings.

- **Gestión de Carrito**:
  - Agregar/remover productos.
  - Aumentar/disminuir cantidad.
  - Persistencia en localStorage.
  - Contador actualizado en tiempo real.

- **Sistema de Filtros**:
  - Filtrar por categoría.
  - Filtrar por rango de precio (slider).
  - Ordenar: Nuevos, Menor/Mayor precio, Popularidad.
  - Búsqueda por nombre/descripción.

- **Checkout Completo**:
  - Formulario con datos personales.
  - Dirección de envío.
  - Opciones de envío (Estándar, Express, Overnight).
  - Métodos de pago (Tarjeta, PayPal, Transferencia).
  - Validación de formulario.

- **Confirmación de Orden**:
  - Número de orden único.
  - Detalles de compra.
  - Email de confirmación.
  - Opción continuar comprando.

- **Interfaz Responsiva**:
  - Grid de productos adaptable.
  - Funciona en todos los dispositivos.
  - Navbar sticky con carrito.

- **Cálculo de Totales**:
  - Subtotal de productos.
  - Impuestos (10%).
  - Costo de envío variable.
  - Total final automático.

---

## 📸 Pantallazo de ejemplo

![Ecommerce Example](image.png)

---

## 🛠️ Tecnologías utilizadas

- **HTML5** – Estructura semántica y forms.
- **CSS3** – Grid, Flexbox, Animaciones, Gradientes.
- **JavaScript ES6** – Clases, localStorage, eventos.

---

## 📋 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- No requiere dependencias externas
- No requiere servidor backend

---

## 🚀 Cómo correr localmente

### Opción 1: Abrir directamente
1. Descarga o clona el repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo! La tienda está lista para usar

### Opción 2: Con servidor local (recomendado)
```bash
# Navega a la carpeta del proyecto
cd 09Ecommerce_JS_ES6

# Con Python 3
python -m http.server 8000

# O con Node.js
npx http-server

# Accede a: http://localhost:8000
```

---

## 📖 Cómo usar

### 1. Explorar Catálogo
1. Verás 9 productos en la página principal.
2. Cada producto muestra: nombre, descripción, precio, rating.
3. Usa el ícono emoji para identificar cada producto.

### 2. Filtrar Productos
1. **Categoría**: Laptops, Celulares, Accesorios, Todos.
2. **Precio**: Arrastra el slider para establecer rango.
3. **Ordenar**: Más nuevos, Menor/Mayor precio, Popularidad.
4. **Buscar**: Escribe en la barra de búsqueda.

### 3. Agregar al Carrito
1. Presiona "Agregar" en cualquier producto.
2. Usa los botones +/- para cambiar cantidad.
3. El carrito actualiza automáticamente.
4. El contador en la navbar muestra total items.

### 4. Ver Carrito
1. Presiona el botón "🛒 Carrito" en la navbar.
2. Visualiza los productos agregados.
3. Ve el subtotal, impuestos y total.
4. Puedes remover productos desde aquí.

### 5. Checkout
1. Presiona "Proceder al Checkout".
2. Completa información personal:
   - Nombre, Email, Dirección, Ciudad, CP
3. Selecciona tipo de envío:
   - Estándar (gratis), Express (+$10), Overnight (+$25)
4. Elige método de pago:
   - Tarjeta, PayPal, Transferencia
5. Presiona "Completar Compra".

### 6. Confirmación
1. Recibirás confirmación con:
   - Número de orden único
   - Total de compra
   - Email confirmación
2. Presiona "Continuar Comprando" para volver.

---

## 🎨 Estructura del código

```javascript
class Ecommerce {
  // Inicialización
  init()

  // Eventos
  setupEventListeners()

  // Productos
  getFilteredProducts()
  searchProducts()
  renderProducts()
  createProductCard()

  // Carrito
  addToCart()
  removeFromCart()
  updateCartUI()

  // Modal Carrito
  openCartModal()
  closeCartModal()

  // Checkout
  openCheckoutModal()
  closeCheckoutModal()
  handleCheckout()

  // Almacenamiento
  saveCart()
  loadCart()
}
```

---

## 💾 Estructura de datos

```javascript
// Producto
{
  id: 1,
  name: 'MacBook Pro 16"',
  category: 'laptops',
  price: 2499,
  image: '💻',
  description: 'Laptop potente con M3 Max',
  rating: 5
}

// Carrito
{
  id: 1,
  name: 'MacBook Pro 16"',
  category: 'laptops',
  price: 2499,
  quantity: 1,
  ...
}
```

---

## 📊 Productos Incluidos

| ID | Producto | Categoría | Precio |
|----|---------|---------|----|
| 1 | MacBook Pro 16" | Laptops | $2499 |
| 2 | Dell XPS 13 | Laptops | $1299 |
| 3 | ASUS ROG Gaming | Laptops | $1899 |
| 4 | iPhone 15 Pro | Phones | $999 |
| 5 | Samsung Galaxy S24 | Phones | $899 |
| 6 | Google Pixel 8 | Phones | $799 |
| 7 | AirPods Pro | Accessories | $249 |
| 8 | Magic Mouse | Accessories | $79 |
| 9 | USB-C Hub Pro | Accessories | $79 |

---

## 🔄 Flujo de Compra

```
┌─────────────────┐
│ Explorar Catalog│
│   + Filtrar     │
└────────┬────────┘
         │
    ┌────▼────┐
    │ Buscar  │
    └────┬────┘
         │
    ┌────▼──────────────┐
    │ Agregar a Carrito │
    └────┬──────────────┘
         │
   ┌─────▼──────┐
   │ Ver Carrito│
   │ (Modal)    │
   └─────┬──────┘
         │
    ┌────▼──────────┐
    │    Checkout   │
    │  (Formulario) │
    └─────┬─────────┘
         │
   ┌─────▼──────────────┐
   │   Confirmación     │
   │  (Orden creada)    │
   └────────────────────┘
```

---

## 💳 Métodos de Pago

- **Tarjeta de Crédito**: Solicita datos de tarjeta
- **PayPal**: Opción de pago integrado
- **Transferencia**: Método bancario

*Nota: Los datos de pago son simulados, no se procesa realmente*

---

## 📦 Opciones de Envío

| Opción | Tiempo | Costo |
|--------|--------|-------|
| Estándar | 3-5 días | Gratis |
| Express | 1-2 días | $10.00 |
| Overnight | Next Day | $25.00 |

---

## 💾 Persistencia de datos

El carrito se guarda automáticamente en localStorage:
- Clave: `ecommerce-cart`
- Formato: JSON array
- Los productos se recuperan al recargar

---

## 🚀 Mejoras futuras

- Integración real de pagos (Stripe, PayPal)
- Gestión de inventario
- Reseñas y comentarios de productos
- Wishlist/Favoritos
- Código de promoción/Cupones
- Historial de órdenes
- Login de usuario
- Dashboard de admin
- Más categorías y productos
- Recomendaciones personalizadas
- Integración con base de datos

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Carrito no persiste | Habilita localStorage |
| Filtros no funcionan | Recarga la página |
| Modal no cierra | Presiona el botón X |
| Datos perdidos | Abre DevTools y revisa localStorage |

---

## 📝 Licencia

Proyecto personal para portfolio. Libre para usar y modificar.

---

**Desarrollado por**: Jorge A. Fuentes (Lechu)  
**Última actualización**: Febrero 2026
