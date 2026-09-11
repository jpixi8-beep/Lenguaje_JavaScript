// Ejercicio 09: Operadores lógicos
const tienePermiso = true;
const esAdmin = false;

console.log('tienePermiso && esAdmin =', tienePermiso && esAdmin);
console.log('tienePermiso || esAdmin =', tienePermiso || esAdmin);
console.log('!tienePermiso =', !tienePermiso);

const edad = 20;
const tieneCarnet = true;
console.log('Puede conducir =', edad >= 18 && tieneCarnet);
