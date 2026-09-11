// Ejercicio 20: Funciones (renombrado)
function saludar(nombre) {
  return 'Hola, ' + nombre + '!';
}

console.log(saludar('Carlos'));

const sumar = (a, b) => a + b;
console.log('Suma con arrow function:', sumar(5, 7));

function areaCirculo(radio) {
  return Math.PI * radio * radio;
}

console.log('Área del círculo:', areaCirculo(3).toFixed(2));
