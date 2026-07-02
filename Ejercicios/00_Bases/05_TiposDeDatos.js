// Ejercicio 05: Tipos de datos básicos
//Variables y constantes en JavaScript
let texto = 'JavaScript';
var numero = 42;
const booleano = true;
const lista = ['manzana', 'pera', 'uva'];

console.log('Texto:', texto);
console.log('Número:', numero);
console.log('Booleano:', booleano);
console.log('Arreglo:', lista);
console.log('Primer elemento del arreglo:', lista[0]);

// Tipos de datos Primitivos y de referencia
// Primitivos: string, number, boolean, null, undefined, symbol
// Funcionan en la memoria Stack y se asignan por valor
let cadena = 'Hola';
let numeroDecimal = 3.14;
let esVerdadero = false;
let valorNulo = null;
let valorIndefinido;
console.log('Cadena:', cadena);
console.log('Número decimal:', numeroDecimal);
console.log('Booleano:', esVerdadero);
console.log('Valor nulo:', valorNulo);
console.log('Valor indefinido:', valorIndefinido);
// Referencia: objetos, arreglos, funciones
// Funcionan en la memoria Heap y se asignan por referencia
let objeto = { nombre: 'Juan', edad: 30 };
let arreglo = [1, 2, 3, 4, 5];
function saludar() {
    console.log('¡Hola!');
}
console.log('Objeto:', objeto);
console.log('Arreglo:', arreglo);
saludar();