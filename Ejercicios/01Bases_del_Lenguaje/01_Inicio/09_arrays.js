// Ejercicio 17: Arrays en JavaScript

const frutas = ['manzana', 'pera', 'uva'];
console.log('Frutas:', frutas);
console.log('Primera fruta:', frutas[0]);
console.log('Cantidad de frutas:', frutas.length);

frutas.push('kiwi');
console.log('Después de agregar:', frutas);

frutas.pop();
console.log('Después de eliminar el último:', frutas);

const mezclado = [1, 'dos', true, { nombre: 'JavaScript' }];
console.log('Arreglo mezclado:', mezclado);
console.log('Valor dentro del objeto:', mezclado[3].nombre);
