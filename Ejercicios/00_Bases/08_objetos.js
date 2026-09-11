// Ejercicio 16: Objetos en JavaScript

const persona = {
  nombre: 'Ana',
  edad: 25,
  ciudad: 'Madrid',
  saludar() {
    return `Hola, soy ${this.nombre} y vivo en ${this.ciudad}.`;
  }
};

console.log('Persona:', persona);
console.log('Nombre:', persona.nombre);
console.log('Edad:', persona['edad']);
console.log('Saludo:', persona.saludar());

persona.profesion = 'Desarrolladora';
console.log('Profesión añadida:', persona.profesion);
