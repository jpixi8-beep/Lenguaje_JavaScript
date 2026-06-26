// Ejercicio 21: Desestructuración de arreglos
const colores = ['rojo', 'verde', 'azul'];

const [primero, segundo, tercero] = colores;

console.log('Primer color:', primero);
console.log('Segundo color:', segundo);
console.log('Tercer color:', tercero);

const [principal, ...restantes] = colores;
console.log('Principal:', principal);
console.log('Resto:', restantes);
