// Ejercicio 42: Arrays Funcionales
// Temas: forEach, map, filter, reduce

const productos = [
  { nombre: 'Laptop', precio: 1000, categoria: 'Electronica' },
  { nombre: 'Mouse', precio: 25, categoria: 'Electronica' },
  { nombre: 'Silla', precio: 150, categoria: 'Muebles' },
  { nombre: 'Mesa', precio: 200, categoria: 'Muebles' },
  { nombre: 'Teclado', precio: 75, categoria: 'Electronica' }
];

// 1. forEach: Mostrar todos los productos
console.log('--- forEach: Todos los productos ---');
productos.forEach((producto) => {
  console.log(`${producto.nombre} - $${producto.precio}`);
});

// 2. map: Crear array con solo nombres de productos
console.log('\n--- map: Solo nombres ---');
const nombres = productos.map((producto) => producto.nombre);
console.log(nombres);

// 3. map: Crear array con precios con IVA (16%)
console.log('\n--- map: Precios con IVA ---');
const preciosConIVA = productos.map((producto) => ({
  nombre: producto.nombre,
  precio: producto.precio * 1.16
}));
console.log(preciosConIVA);

// 4. filter: Filtrar productos de Electronica
console.log('\n--- filter: Solo Electronica ---');
const electronicos = productos.filter((producto) => producto.categoria === 'Electronica');
console.log(electronicos);

// 5. filter: Filtrar productos mayores a $100
console.log('\n--- filter: Mayores a $100 ---');
const caros = productos.filter((producto) => producto.precio > 100);
console.log(caros);

// 6. reduce: Sumar total de precios
console.log('\n--- reduce: Total de precios ---');
const total = productos.reduce((acumulador, producto) => acumulador + producto.precio, 0);
console.log(`Total: $${total}`);

// 7. reduce: Contar productos por categoria
console.log('\n--- reduce: Conteo por categoria ---');
const conteoCategorias = productos.reduce((acumulador, producto) => {
  acumulador[producto.categoria] = (acumulador[producto.categoria] || 0) + 1;
  return acumulador;
}, {});
console.log(conteoCategorias);

// 8. Combinación: filter + map + reduce
console.log('\n--- Combinación: Total de productos caros de Electronica ---');
const totalCarosElectronicos = productos
  .filter((p) => p.categoria === 'Electronica' && p.precio > 50)
  .map((p) => p.precio)
  .reduce((acc, precio) => acc + precio, 0);
console.log(`Total: $${totalCarosElectronicos}`);
