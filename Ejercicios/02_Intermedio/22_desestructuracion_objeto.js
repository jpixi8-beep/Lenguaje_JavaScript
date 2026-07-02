// Ejercicio 22: Desestructuración de objetos
const persona = {
  nombre: 'Ana',
  edad: 25,
  ciudad: 'Madrid'
};

const { nombre, edad } = persona;

console.log('Nombre:', nombre);
console.log('Edad:', edad);

const { ciudad: residencia } = persona;
console.log('Residencia:', residencia);
