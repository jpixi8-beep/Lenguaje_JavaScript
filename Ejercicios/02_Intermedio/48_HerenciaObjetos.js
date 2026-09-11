// Ejercicio 48: Objeto que herede de otro
// Tema: Herencia con clases y prototipos

// 1. Herencia con clases (ES6)
console.log('--- Herencia con clases ---');
class Animal {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  comer() {
    console.log(`${this.nombre} está comiendo`);
  }

  dormir() {
    console.log(`${this.nombre} está durmiendo`);
  }
}

class Perro extends Animal {
  constructor(nombre, edad, raza) {
    super(nombre, edad);
    this.raza = raza;
  }

  ladrar() {
    console.log(`${this.nombre} está ladrando`);
  }

  // Sobrescribir método
  comer() {
    console.log(`${this.nombre} (raza: ${this.raza}) está comiendo croquetas`);
  }
}

class Gato extends Animal {
  constructor(nombre, edad, color) {
    super(nombre, edad);
    this.color = color;
  }

  maullar() {
    console.log(`${this.nombre} está maullando`);
  }
}

const perro1 = new Perro('Rex', 5, 'Pastor Alemán');
const gato1 = new Gato('Michi', 3, 'Negro');

perro1.comer();
perro1.ladrar();
perro1.dormir();

gato1.comer();
gato1.maullar();
gato1.dormir();

// 2. Herencia con prototipos (forma clásica)
console.log('\n--- Herencia con prototipos ---');
function Vehiculo(marca, modelo) {
  this.marca = marca;
  this.modelo = modelo;
}

Vehiculo.prototype.arrancar = function() {
  console.log(`${this.marca} ${this.modelo} está arrancando`);
};

Vehiculo.prototype.detener = function() {
  console.log(`${this.marca} ${this.modelo} se ha detenido`);
};

function Coche(marca, modelo, puertas) {
  Vehiculo.call(this, marca, modelo);
  this.puertas = puertas;
}

// Establecer herencia de prototipo
Coche.prototype = Object.create(Vehiculo.prototype);
Coche.prototype.constructor = Coche;

Coche.prototype.abrirPuertas = function() {
  console.log(`Abriendo ${this.puertas} puertas del ${this.marca} ${this.modelo}`);
};

const coche1 = new Coche('Toyota', 'Corolla', 4);
coche1.arrancar();
coche1.abrirPuertas();
coche1.detener();

// 3. Herencia múltiple con mixins
console.log('\n--- Herencia múltiple con mixins ---');
const Volador = {
  volar() {
    console.log(`${this.nombre} está volando`);
  }
};

const Nadador = {
  nadar() {
    console.log(`${this.nombre} está nadando`);
  }
};

class Pato {
  constructor(nombre) {
    this.nombre = nombre;
  }

  graznar() {
    console.log(`${this.nombre} está graznando`);
  }
}

// Agregar mixins usando Object.assign
Object.assign(Pato.prototype, Volador, Nadador);

const pato1 = new Pato('Donald');
pato1.graznar();
pato1.volar();
pato1.nadar();

// 4. Verificar herencia con instanceof
console.log('\n--- Verificar herencia con instanceof ---');
console.log('perro1 es instancia de Perro:', perro1 instanceof Perro);
console.log('perro1 es instancia de Animal:', perro1 instanceof Animal);
console.log('perro1 es instancia de Object:', perro1 instanceof Object);

console.log('coche1 es instancia de Coche:', coche1 instanceof Coche);
console.log('coche1 es instancia de Vehiculo:', coche1 instanceof Vehiculo);

// 5. Cadena de prototipos
console.log('\n--- Cadena de prototipos ---');
console.log('Prototipo de perro1:', Object.getPrototypeOf(perro1));
console.log('Prototipo del prototipo:', Object.getPrototypeOf(Object.getPrototypeOf(perro1)));
