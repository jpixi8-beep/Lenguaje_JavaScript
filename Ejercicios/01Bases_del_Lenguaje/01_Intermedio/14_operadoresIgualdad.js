// Ejercicio 14: Operadores de igualdad

const a = '5';
const b = 5;

console.log("a == b ->", a == b); // true por coerción de tipo
console.log("a === b ->", a === b); // false, distinto tipo
console.log("a != b ->", a != b);
console.log("a !== b ->", a !== b);

// Comparación de objetos por referencia
const o1 = { v: 1 };
const o2 = { v: 1 };
const o3 = o1;
console.log('o1 === o2 ->', o1 === o2); // false
console.log('o1 === o3 ->', o1 === o3); // true
