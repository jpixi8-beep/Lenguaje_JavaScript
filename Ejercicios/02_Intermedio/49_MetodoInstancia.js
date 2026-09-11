// Ejercicio 49: Método de instancia en un objeto
// Tema: Métodos de instancia vs métodos estáticos

// 1. Método de instancia en clase
console.log('--- Método de instancia ---');
class Calculadora {
  constructor(resultado = 0) {
    this.resultado = resultado;
  }

  // Método de instancia (opera sobre el objeto)
  sumar(valor) {
    this.resultado += valor;
    return this;
  }

  restar(valor) {
    this.resultado -= valor;
    return this;
  }

  multiplicar(valor) {
    this.resultado *= valor;
    return this;
  }

  dividir(valor) {
    if (valor !== 0) {
      this.resultado /= valor;
    } else {
      console.log('Error: No se puede dividir entre 0');
    }
    return this;
  }

  obtenerResultado() {
    return this.resultado;
  }

  reiniciar() {
    this.resultado = 0;
    return this;
  }
}

const calc1 = new Calculadora();
calc1.sumar(10).multiplicar(2).restar(5).dividir(3);
console.log('Resultado:', calc1.obtenerResultado());

const calc2 = new Calculadora(100);
calc2.restar(20).dividir(2);
console.log('Resultado:', calc2.obtenerResultado());

// 2. Comparar con método estático
console.log('\n--- Método estático vs Método de instancia ---');
class UtilidadesMath {
  // Método estático (no necesita instancia)
  static sumar(a, b) {
    return a + b;
  }

  static restar(a, b) {
    return a - b;
  }

  // Método de instancia
  constructor(base) {
    this.base = base;
  }

  sumarAlBase(valor) {
    return this.base + valor;
  }

  restarDelBase(valor) {
    return this.base - valor;
  }
}

// Usar método estático
console.log('Suma estática:', UtilidadesMath.sumar(5, 3));
console.log('Resta estática:', UtilidadesMath.restar(10, 4));

// Usar método de instancia
const util = new UtilidadesMath(100);
console.log('Sumar al base:', util.sumarAlBase(25));
console.log('Restar del base:', util.restarDelBase(30));

// 3. Métodos de instancia en objetos literales
console.log('\n--- Métodos en objetos literales ---');
const rectangulo = {
  ancho: 10,
  alto: 5,

  // Método de instancia
  area() {
    return this.ancho * this.alto;
  },

  perimetro() {
    return 2 * (this.ancho + this.alto);
  },

  escalar(factor) {
    this.ancho *= factor;
    this.alto *= factor;
    return this;
  },

  toString() {
    return `Rectángulo(${this.ancho}x${this.alto})`;
  }
};

console.log('Área:', rectangulo.area());
console.log('Perímetro:', rectangulo.perimetro());
rectangulo.escalar(2);
console.log('Después de escalar x2:', rectangulo.toString());
console.log('Nueva área:', rectangulo.area());

// 4. Métodos de instancia con this dinámico
console.log('\n--- Métodos con this dinámico ---');
const persona = {
  nombre: 'Juan',
  edad: 25,
  hobbies: ['fútbol', 'lectura', 'programación'],

  presentarse() {
    return `Hola, soy ${this.nombre} y tengo ${this.edad} años`;
  },

  agregarHobby(hobby) {
    this.hobbies.push(hobby);
    return this;
  },

  listarHobbies() {
    return this.hobbies.join(', ');
  }
};

console.log(persona.presentarse());
console.log('Hobbies:', persona.listarHobbies());
persona.agregarHobby('música');
console.log('Hobbies actualizados:', persona.listarHobbies());

// 5. Método de instancia que modifica el estado
console.log('\n--- Método que modifica estado ---');
class Contador {
  constructor(inicial = 0) {
    this.valor = inicial;
  }

  incrementar() {
    this.valor++;
    return this;
  }

  decrementar() {
    this.valor--;
    return this;
  }

  reiniciar() {
    this.valor = 0;
    return this;
  }

  obtenerValor() {
    return this.valor;
  }
}

const contador = new Contador(5);
contador.incrementar().incrementar().decrementar();
console.log('Valor del contador:', contador.obtenerValor());

contador.reiniciar();
console.log('Después de reiniciar:', contador.obtenerValor());
