// Herencia en JavaScript
// La herencia permite que una clase (clase hija) herede propiedades y métodos de otra clase (clase padre)
// Se usa la palabra clave 'extends' para heredar y 'super()' para llamar al constructor de la clase padre

// Clase Padre (Base)
class Animal {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre}`);
    }

    comer() {
        console.log(`${this.nombre} está comiendo`);
    }

    dormir() {
        console.log(`${this.nombre} está durmiendo`);
    }
}

// Clase Hija que hereda de Animal
class Perro extends Animal {
    constructor(nombre, edad, raza) {
        // Llamar al constructor de la clase padre con super()
        super(nombre, edad);
        //raza es una variable de la clase hija
        this.raza = raza;
    }

    // Método propio de la clase hija
    ladrar() {
        console.log(`${this.nombre} está ladrando: ¡Guau guau!`);
    }

    // Sobrescribir un método de la clase padre
    comer() {
        console.log(`${this.nombre} (perro ${this.raza}) está comiendo croquetas`);
    }

    // Método que usa métodos de la clase padre
    presentarse() {
        this.saludar(); // Método heredado
        console.log(`Soy un perro de raza ${this.raza}`);
        console.log(`Tengo ${this.edad} años`);
    }
}

// Otra clase hija que hereda de Animal
class Gato extends Animal {
    constructor(nombre, edad, color) {
        super(nombre, edad);
        //color es una variable de la clase hija
        this.color = color;
    }

    maullar() {
        console.log(`${this.nombre} está maullando: ¡Miau miau!`);
    }

    // Sobrescribir método
    dormir() {
        console.log(`${this.nombre} (gato ${this.color}) está durmiendo en el sofá`);
    }
}

// Instanciar objetos
const miPerro = new Perro('Firulais', 3, 'Labrador');
const miGato = new Gato('Michi', 2, 'Negro');

console.log('--- Perro ---');
miPerro.saludar(); // Método heredado
miPerro.ladrar(); // Método propio
miPerro.comer(); // Método sobrescrito
miPerro.dormir(); // Método heredado (no sobrescrito)
miPerro.presentarse(); // Método que usa métodos heredados

console.log('\n--- Gato ---');
miGato.saludar(); // Método heredado
miGato.maullar(); // Método propio
miGato.comer(); // Método heredado (no sobrescrito)
miGato.dormir(); // Método sobrescrito

console.log('\n--- Acceso a propiedades ---');
console.log(`Perro: ${miPerro.nombre}, ${miPerro.edad} años, raza ${miPerro.raza}`);
console.log(`Gato: ${miGato.nombre}, ${miGato.edad} años, color ${miGato.color}`);
