// Ejercicio 50: Getters y Setters en un objeto
// Tema: Getters y Setters

// 1. Getters y Setters en clase
console.log('--- Getters y Setters en clase ---');
class CuentaBancaria {
  constructor(saldoInicial) {
    this._saldo = saldoInicial; // Convención: _ indica propiedad "privada"
  }

  // Getter para obtener el saldo
  get saldo() {
    return this._saldo;
  }

  // Setter para modificar el saldo con validación
  set saldo(nuevoSaldo) {
    if (nuevoSaldo < 0) {
      console.log('Error: El saldo no puede ser negativo');
      return;
    }
    this._saldo = nuevoSaldo;
  }

  // Getter para obtener saldo formateado
  get saldoFormateado() {
    return `$${this._saldo.toFixed(2)}`;
  }

  depositar(cantidad) {
    if (cantidad > 0) {
      this._saldo += cantidad;
      console.log(`Depositado: $${cantidad}`);
    }
  }

  retirar(cantidad) {
    if (cantidad > 0 && cantidad <= this._saldo) {
      this._saldo -= cantidad;
      console.log(`Retirado: $${cantidad}`);
    } else {
      console.log('Fondos insuficientes o cantidad inválida');
    }
  }
}

const cuenta1 = new CuentaBancaria(1000);
console.log('Saldo inicial:', cuenta1.saldoFormateado);

cuenta1.depositar(500);
console.log('Saldo después de depositar:', cuenta1.saldoFormateado);

cuenta1.retirar(200);
console.log('Saldo después de retirar:', cuenta1.saldoFormateado);

// Usando el setter
cuenta1.saldo = 2000;
console.log('Saldo después de usar setter:', cuenta1.saldoFormateado);

// Intento de saldo negativo
cuenta1.saldo = -100;
console.log('Saldo después de intento negativo:', cuenta1.saldoFormateado);

// 2. Getters y Setters en objeto literal
console.log('\n--- Getters y Setters en objeto literal ---');
const temperatura = {
  _celsius: 0,

  get celsius() {
    return this._celsius;
  },

  set celsius(valor) {
    this._celsius = valor;
  },

  get fahrenheit() {
    return (this._celsius * 9/5) + 32;
  },

  set fahrenheit(valor) {
    this._celsius = (valor - 32) * 5/9;
  },

  get kelvin() {
    return this._celsius + 273.15;
  }
};

temperatura.celsius = 25;
console.log('25°C en Fahrenheit:', temperatura.fahrenheit.toFixed(2));
console.log('25°C en Kelvin:', temperatura.kelvin.toFixed(2));

temperatura.fahrenheit = 100;
console.log('100°F en Celsius:', temperatura.celsius.toFixed(2));
console.log('100°F en Kelvin:', temperatura.kelvin.toFixed(2));

// 3. Getters y Setters con propiedades computadas
console.log('\n--- Getters con propiedades computadas ---');
class Rectangulo {
  constructor(ancho, alto) {
    this._ancho = ancho;
    this._alto = alto;
  }

  get ancho() {
    return this._ancho;
  }

  set ancho(valor) {
    if (valor > 0) {
      this._ancho = valor;
    }
  }

  get alto() {
    return this._alto;
  }

  set alto(valor) {
    if (valor > 0) {
      this._alto = valor;
    }
  }

  // Propiedad computada: área
  get area() {
    return this._ancho * this._alto;
  }

  // Propiedad computada: perímetro
  get perimetro() {
    return 2 * (this._ancho + this._alto);
  }

  // Propiedad computada: si es cuadrado
  get esCuadrado() {
    return this._ancho === this._alto;
  }
}

const rect = new Rectangulo(10, 5);
console.log('Dimensiones:', rect.ancho, 'x', rect.alto);
console.log('Área:', rect.area);
console.log('Perímetro:', rect.perimetro);
console.log('¿Es cuadrado?', rect.esCuadrado);

rect.ancho = 5;
rect.alto = 5;
console.log('\nDespués de cambiar a 5x5:');
console.log('Área:', rect.area);
console.log('¿Es cuadrado?', rect.esCuadrado);

// 4. Getters y Setters con validación compleja
console.log('\n--- Getters y Setters con validación compleja ---');
class Usuario {
  constructor(nombre, email) {
    this._nombre = nombre;
    this._email = email;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nuevoNombre) {
    if (nuevoNombre.length < 3) {
      console.log('Error: El nombre debe tener al menos 3 caracteres');
      return;
    }
    this._nombre = nuevoNombre.trim();
  }

  get email() {
    return this._email;
  }

  set email(nuevoEmail) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(nuevoEmail)) {
      console.log('Error: Email inválido');
      return;
    }
    this._email = nuevoEmail.toLowerCase();
  }

  get informacion() {
    return `${this._nombre} (${this._email})`;
  }
}

const usuario1 = new Usuario('Juan', 'juan@example.com');
console.log('Usuario:', usuario1.informacion);

usuario1.nombre = 'Maria';
console.log('Nombre actualizado:', usuario1.informacion);

usuario1.nombre = 'Jo'; // Error: muy corto
console.log('Después de intento inválido:', usuario1.informacion);

usuario1.email = 'MARIA@EXAMPLE.COM';
console.log('Email normalizado:', usuario1.email);

// 5. Getters y Setters con propiedades privadas (usando #)
console.log('\n--- Getters y Setters con propiedades privadas ---');
class Producto {
  #precio;
  #stock;

  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.#precio = precio;
    this.#stock = stock;
  }

  get precio() {
    return this.#precio;
  }

  set precio(nuevoPrecio) {
    if (nuevoPrecio <= 0) {
      console.log('Error: El precio debe ser positivo');
      return;
    }
    this.#precio = nuevoPrecio;
  }

  get stock() {
    return this.#stock;
  }

  set stock(nuevoStock) {
    if (nuevoStock < 0) {
      console.log('Error: El stock no puede ser negativo');
      return;
    }
    this.#stock = nuevoStock;
  }

  get disponible() {
    return this.#stock > 0;
  }

  get valorTotal() {
    return this.#precio * this.#stock;
  }
}

const producto1 = new Producto('Laptop', 1000, 10);
console.log('Producto:', producto1.nombre);
console.log('Precio:', producto1.precio);
console.log('Stock:', producto1.stock);
console.log('¿Disponible?', producto1.disponible);
console.log('Valor total:', producto1.valorTotal);

producto1.stock = 5;
console.log('Stock actualizado:', producto1.stock);
console.log('Valor total actualizado:', producto1.valorTotal);
