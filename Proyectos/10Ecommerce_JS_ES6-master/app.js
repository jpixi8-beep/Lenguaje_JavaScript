class Ecommerce {
  constructor() {
    this.products = [
      // Laptops
      {
        id: 1,
        name: 'MacBook Pro 16"',
        category: 'laptops',
        price: 2499,
        image: '💻',
        description: 'Laptop potente con M3 Max',
        rating: 5
      },
      {
        id: 2,
        name: 'Dell XPS 13',
        category: 'laptops',
        price: 1299,
        image: '💻',
        description: 'Ultrabook compacto y ligero',
        rating: 4.5
      },
      {
        id: 3,
        name: 'ASUS ROG Gaming',
        category: 'laptops',
        price: 1899,
        image: '💻',
        description: 'Gaming laptop de alto rendimiento',
        rating: 4.8
      },
      // Phones
      {
        id: 4,
        name: 'iPhone 15 Pro',
        category: 'phones',
        price: 999,
        image: '📱',
        description: 'Último modelo con A17 Pro',
        rating: 5
      },
      {
        id: 5,
        name: 'Samsung Galaxy S24',
        category: 'phones',
        price: 899,
        image: '📱',
        description: 'Android flagship con IA',
        rating: 4.7
      },
      {
        id: 6,
        name: 'Google Pixel 8',
        category: 'phones',
        price: 799,
        image: '📱',
        description: 'Excelente cámara y software',
        rating: 4.6
      },
      // Accessories
      {
        id: 7,
        name: 'AirPods Pro',
        category: 'accessories',
        price: 249,
        image: '🎧',
        description: 'Audífonos inalámbricos premium',
        rating: 4.8
      },
      {
        id: 8,
        name: 'Magic Mouse',
        category: 'accessories',
        price: 79,
        image: '🖱️',
        description: 'Ratón táctil inalámbrico',
        rating: 4.4
      },
      {
        id: 9,
        name: 'USB-C Hub Pro',
        category: 'accessories',
        price: 79,
        image: '🔌',
        description: '7 puertos USB-C de alta velocidad',
        rating: 4.5
      }
    ];

    this.cart = [];
    this.filters = {
      category: 'all',
      maxPrice: 2000,
      sortBy: 'newest'
    };

    this.init();
  }

  init() {
    console.log('Inicializando E-commerce...');
    this.loadCart();
    this.setupEventListeners();
    this.renderProducts();
  }

  setupEventListeners() {
    // Carrito
    document.getElementById('cartBtn').addEventListener('click', () => this.openCartModal());
    document.getElementById('closeCartModal').addEventListener('click', () => this.closeCartModal());
    document.getElementById('checkoutBtn').addEventListener('click', () => this.openCheckoutModal());

    // Checkout
    document.getElementById('closeCheckoutModal').addEventListener('click', () => this.closeCheckoutModal());
    document.getElementById('checkoutForm').addEventListener('submit', (e) => this.handleCheckout(e));
    document.getElementById('continueShoppingBtn').addEventListener('click', () => this.continueShopping());

    // Filtros
    document.querySelectorAll('input[name="category"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.filters.category = e.target.value;
        this.renderProducts();
      });
    });

    document.getElementById('priceRange').addEventListener('input', (e) => {
      this.filters.maxPrice = parseFloat(e.target.value);
      document.getElementById('maxPrice').textContent = e.target.value;
      this.renderProducts();
    });

    document.getElementById('sortBy').addEventListener('change', (e) => {
      this.filters.sortBy = e.target.value;
      this.renderProducts();
    });

    document.getElementById('clearFilters').addEventListener('click', () => this.clearFilters());

    // Búsqueda
    document.getElementById('searchBox').addEventListener('input', (e) => {
      this.searchProducts(e.target.value);
    });
  }

  // ===== PRODUCTOS =====
  getFilteredProducts() {
    let filtered = this.products.filter(p => {
      const categoryMatch = this.filters.category === 'all' || p.category === this.filters.category;
      const priceMatch = p.price <= this.filters.maxPrice;
      return categoryMatch && priceMatch;
    });

    // Ordenar
    switch (this.filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }

  searchProducts(query) {
    const grid = document.getElementById('productsGrid');
    const filtered = this.products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );

    grid.innerHTML = filtered.map(p => this.createProductCard(p)).join('');
  }

  renderProducts() {
    const grid = document.getElementById('productsGrid');
    const products = this.getFilteredProducts();

    grid.innerHTML = products.map(p => this.createProductCard(p)).join('');
  }

  createProductCard(product) {
    const cartItem = this.cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return `
      <div class="product-card">
        <div class="product-image">${product.image}</div>
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>

          <div class="product-footer">
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-rating">${'⭐'.repeat(Math.floor(product.rating))}</div>
          </div>

          <div class="product-controls">
            ${quantity > 0 ?
      `<div class="quantity-control">
                <button class="qty-btn" onclick="ecommerce.removeFromCart(${product.id})">−</button>
                <div class="qty-display">${quantity}</div>
                <button class="qty-btn" onclick="ecommerce.addToCart(${product.id})">+</button>
              </div>` :
      `<div></div>`
            }
            <button class="btn-add-cart" onclick="ecommerce.addToCart(${product.id})">
              ${quantity > 0 ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  clearFilters() {
    this.filters = {
      category: 'all',
      maxPrice: 2000,
      sortBy: 'newest'
    };

    document.getElementById('priceRange').value = 2000;
    document.getElementById('maxPrice').textContent = '2000';
    document.querySelector('input[name="category"][value="all"]').checked = true;
    document.getElementById('sortBy').value = 'newest';

    this.renderProducts();
    this.showNotification('✅ Filtros limpiados');
  }

  // ===== CARRITO =====
  addToCart(productId) {
    const product = this.products.find(p => p.id === productId);
    const cartItem = this.cart.find(item => item.id === productId);

    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.saveCart();
    this.updateCartUI();
    this.renderProducts();
    this.showNotification(`✅ ${product.name} agregado al carrito`);
  }

  removeFromCart(productId) {
    const cartItem = this.cart.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity--;
      if (cartItem.quantity === 0) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.showNotification('🗑️ Producto removido del carrito');
      }
    }

    this.saveCart();
    this.updateCartUI();
    this.renderProducts();
  }

  updateCartUI() {
    const cartCount = this.cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
  }

  openCartModal() {
    const modal = document.getElementById('cartModal');
    const itemsContainer = document.getElementById('cartItems');
    const summary = document.getElementById('cartSummary');

    if (this.cart.length === 0) {
      itemsContainer.innerHTML = '<p class="empty-state">Tu carrito está vacío</p>';
      summary.classList.add('hidden');
    } else {
      itemsContainer.innerHTML = this.cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p>Cantidad: ${item.quantity}</p>
            <p>Precio unitario: $${item.price.toFixed(2)}</p>
          </div>
          <div class="cart-item-price">
            <div class="cart-item-subtotal">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="btn-remove" onclick="ecommerce.removeFromCart(${item.id})">Eliminar</button>
          </div>
        </div>
      `).join('');

      const subtotal = this.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const taxes = subtotal * 0.1;
      const total = subtotal + taxes;

      document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
      document.getElementById('taxes').textContent = `$${taxes.toFixed(2)}`;
      document.getElementById('total').textContent = `$${total.toFixed(2)}`;

      summary.classList.remove('hidden');
    }

    modal.classList.remove('hidden');
  }

  closeCartModal() {
    document.getElementById('cartModal').classList.add('hidden');
  }

  // ===== CHECKOUT =====
  openCheckoutModal() {
    document.getElementById('cartModal').classList.add('hidden');
    document.getElementById('checkoutModal').classList.remove('hidden');
  }

  closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.add('hidden');
  }

  handleCheckout(e) {
    e.preventDefault();

    const formData = {
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      zipcode: document.getElementById('zipcode').value,
      shipping: document.querySelector('input[name="shipping"]:checked').value,
      payment: document.querySelector('input[name="payment"]:checked').value
    };

    // Validación básica
    if (!formData.fullName || !formData.email || !formData.address) {
      this.showNotification('⚠️ Por favor completa todos los campos');
      return;
    }

    // Simular procesamiento de pago
    const subtotal = this.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const taxes = subtotal * 0.1;
    const shippingCost = formData.shipping === 'express' ? 10 : formData.shipping === 'overnight' ? 25 : 0;
    const total = subtotal + taxes + shippingCost;

    // Generar número de orden
    const orderNumber = `#${new Date().getFullYear()}-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;

    // Mostrar confirmación
    document.getElementById('checkoutModal').classList.add('hidden');
    const confirmationModal = document.getElementById('confirmationModal');

    document.getElementById('orderNumber').textContent = orderNumber;
    document.getElementById('orderTotal').textContent = `$${total.toFixed(2)}`;
    document.getElementById('orderShipping').textContent = this.getShippingLabel(formData.shipping);
    document.getElementById('orderEmail').textContent = formData.email;

    confirmationModal.classList.remove('hidden');

    // Limpiar carrito
    this.cart = [];
    this.saveCart();
    this.updateCartUI();
  }

  getShippingLabel(shippingType) {
    const labels = {
      'standard': 'Estándar (3-5 días)',
      'express': 'Express (1-2 días)',
      'overnight': 'Overnight (Next Day)'
    };
    return labels[shippingType] || 'Estándar';
  }

  continueShopping() {
    document.getElementById('confirmationModal').classList.add('hidden');
    this.renderProducts();
    window.scrollTo(0, 0);
  }

  // ===== ALMACENAMIENTO =====
  saveCart() {
    localStorage.setItem('ecommerce-cart', JSON.stringify(this.cart));
  }

  loadCart() {
    const data = localStorage.getItem('ecommerce-cart');
    if (data) {
      this.cart = JSON.parse(data);
      this.updateCartUI();
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
}

let ecommerce;

document.addEventListener('DOMContentLoaded', () => {
  ecommerce = new Ecommerce();
});
