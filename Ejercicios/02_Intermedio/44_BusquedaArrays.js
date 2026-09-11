// Ejercicio 44: Búsqueda en Arrays
// Temas: includes, find, findIndex

const usuarios = [
  { id: 1, nombre: 'Juan', email: 'juan@example.com', edad: 25 },
  { id: 2, nombre: 'Maria', email: 'maria@example.com', edad: 30 },
  { id: 3, nombre: 'Pedro', email: 'pedro@example.com', edad: 20 },
  { id: 4, nombre: 'Ana', email: 'ana@example.com', edad: 35 },
  { id: 5, nombre: 'Carlos', email: 'carlos@example.com', edad: 28 }
];

const nums = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const frutas = ['manzana', 'banana', 'naranja', 'uva', 'pera', 'sandia'];

// 1. includes: Verificar si existe un elemento
console.log('--- includes: Verificar existencia ---');
console.log('¿Contiene 30?', nums.includes(30)); // true
console.log('¿Contiene 55?', nums.includes(55)); // false
console.log('¿Contiene "banana"?', frutas.includes('banana')); // true
console.log('¿Contiene "kiwi"?', frutas.includes('kiwi')); // false

// 2. includes: Verificar desde una posición específica
console.log('\n--- includes: Desde posición ---');
console.log('¿Contiene 30 desde índice 3?', nums.includes(30, 3)); // false (30 está en índice 2)
console.log('¿Contiene 40 desde índice 3?', nums.includes(40, 3)); // true

// 3. find: Encontrar el primer elemento que cumpla una condición
console.log('\n--- find: Encontrar usuario por edad ---');
const usuarioMayor30 = usuarios.find((usuario) => usuario.edad > 30);
console.log('Primer usuario mayor de 30:', usuarioMayor30);

// 4. find: Encontrar usuario por email
console.log('\n--- find: Encontrar usuario por email ---');
const usuarioEmail = usuarios.find((usuario) => usuario.email === 'pedro@example.com');
console.log('Usuario con email pedro@example.com:', usuarioEmail);

// 5. find: Encontrar número mayor a 50
console.log('\n--- find: Encontrar número mayor a 50 ---');
const numeroMayor50 = nums.find((num) => num > 50);
console.log('Primer número mayor a 50:', numeroMayor50);

// 6. findIndex: Encontrar índice de un elemento
console.log('\n--- findIndex: Encontrar índice ---');
const indiceMaria = usuarios.findIndex((usuario) => usuario.nombre === 'Maria');
console.log('Índice de Maria:', indiceMaria);

const indice40 = nums.findIndex((num) => num === 40);
console.log('Índice de 40:', indice40);

// 7. findIndex: Cuando no existe el elemento
console.log('\n--- findIndex: Elemento no encontrado ---');
const indiceNoExiste = usuarios.findIndex((usuario) => usuario.nombre === 'Luis');
console.log('Índice de Luis (no existe):', indiceNoExiste); // -1

// 8. Combinación: includes + find
console.log('\n--- Combinación: includes + find ---');
const buscarNombre = 'Ana';
if (usuarios.map((u) => u.nombre).includes(buscarNombre)) {
  const usuarioEncontrado = usuarios.find((u) => u.nombre === buscarNombre);
  console.log(`Usuario ${buscarNombre} encontrado:`, usuarioEncontrado);
} else {
  console.log(`Usuario ${buscarNombre} no encontrado`);
}

// 9. Combinación: findIndex para modificar elemento
console.log('\n--- Combinación: findIndex para modificar ---');
const indicePedro = usuarios.findIndex((u) => u.nombre === 'Pedro');
if (indicePedro !== -1) {
  usuarios[indicePedro].edad = 21;
  console.log('Usuario Pedro actualizado:', usuarios[indicePedro]);
}

// 10. find con objetos complejos
console.log('\n--- find: Búsqueda compleja ---');
const productos = [
  { id: 1, nombre: 'Laptop', precio: 1000, stock: 5 },
  { id: 2, nombre: 'Mouse', precio: 25, stock: 0 },
  { id: 3, nombre: 'Teclado', precio: 75, stock: 10 },
  { id: 4, nombre: 'Monitor', precio: 300, stock: 0 }
];

const productoConStock = productos.find((p) => p.stock > 0 && p.precio < 100);
console.log('Primer producto con stock y menor a $100:', productoConStock);

const productoSinStock = productos.find((p) => p.stock === 0);
console.log('Primer producto sin stock:', productoSinStock);
