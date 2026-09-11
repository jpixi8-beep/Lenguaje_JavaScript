// Ejercicio 47: Agregar función al prototipo de un objeto
// Tema: Prototipos

// 1. Crear un constructor
function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}

// 2. Agregar método al prototipo
Persona.prototype.saludar = function() {
  console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`);
};

// 3. Agregar otro método al prototipo
Persona.prototype.cumplirAnios = function() {
  this.edad++;
  console.log(`¡Feliz cumpleaños! Ahora ${this.nombre} tiene ${this.edad} años`);
};

// 4. Usar los objetos creados
const persona1 = new Persona('Juan', 25);
const persona2 = new Persona('Maria', 30);

console.log('--- Uso de métodos del prototipo ---');
persona1.saludar();
persona2.saludar();

console.log('\n--- Cumplir años ---');
persona1.cumplirAnios();
persona2.cumplirAnios();

// 5. Agregar método al prototipo de Array (ejemplo práctico)
console.log('\n--- Agregar método al prototipo de Array ---');
Array.prototype.ultimo = function() {
  return this[this.length - 1];
};

const numeros = [1, 2, 3, 4, 5];
console.log('Array:', numeros);
console.log('Último elemento:', numeros.ultimo());

const frutas = ['manzana', 'banana', 'naranja'];
console.log('Array:', frutas);
console.log('Último elemento:', frutas.ultimo());

// 6. Agregar método al prototipo de String
console.log('\n--- Agregar método al prototipo de String ---');
String.prototype.capitalizar = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

const texto1 = 'hola mundo';
const texto2 = 'JAVASCRIPT';
console.log('Original:', texto1, '-> Capitalizado:', texto1.capitalizar());
console.log('Original:', texto2, '-> Capitalizado:', texto2.capitalizar());

// 7. Verificar que el método está en el prototipo
console.log('\n--- Verificar prototipo ---');
console.log('¿saludar está en el prototipo de Persona?', Persona.prototype.hasOwnProperty('saludar'));
console.log('¿nombre está en el prototipo de Persona?', Persona.prototype.hasOwnProperty('nombre'));
console.log('Prototipo de persona1:', Object.getPrototypeOf(persona1));
