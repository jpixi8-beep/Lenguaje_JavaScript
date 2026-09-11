// Ejercicio 46: Iteraciones y Conversiones
// Temas: forEach en Set/Map, conversiones entre Set/Map/array/objeto

// 1. forEach en Set
console.log('--- forEach en Set ---');
const setColores = new Set(['rojo', 'verde', 'azul', 'amarillo']);
console.log('Set de colores:', setColores);

setColores.forEach((color) => {
  console.log(`Color: ${color}`);
});

// 2. forEach en Set con índice manual
console.log('\n--- forEach en Set con índice ---');
let indice = 0;
setColores.forEach((color) => {
  console.log(`${indice}: ${color}`);
  indice++;
});

// 3. forEach en Map
console.log('\n--- forEach en Map ---');
const mapaEdades = new Map([
  ['Juan', 25],
  ['Maria', 30],
  ['Pedro', 20],
  ['Ana', 35]
]);
console.log('Map de edades:', mapaEdades);

mapaEdades.forEach((valor, clave) => {
  console.log(`${clave} tiene ${valor} años`);
});

// 4. forEach en Map con operaciones
console.log('\n--- forEach en Map con cálculos ---');
const mapaPrecios = new Map([
  ['Laptop', 1000],
  ['Mouse', 25],
  ['Teclado', 75],
  ['Monitor', 300]
]);

console.log('Precios originales:');
mapaPrecios.forEach((precio, producto) => {
  console.log(`${producto}: $${precio}`);
});

console.log('\nPrecios con IVA (16%):');
mapaPrecios.forEach((precio, producto) => {
  const precioConIVA = precio * 1.16;
  console.log(`${producto}: $${precioConIVA.toFixed(2)}`);
});

// 5. Conversión de Set a Array
console.log('\n--- Conversión: Set a Array ---');
const setNumeros = new Set([1, 2, 3, 4, 5]);
const arrayDesdeSet = [...setNumeros];
console.log('Set:', setNumeros);
console.log('Array desde Set:', arrayDesdeSet);
console.log('Tipo:', typeof arrayDesdeSet);

// 6. Conversión de Array a Set
console.log('\n--- Conversión: Array a Set ---');
const arrayConRepetidos = [1, 2, 2, 3, 3, 3, 4, 5];
const setDesdeArray = new Set(arrayConRepetidos);
console.log('Array con repetidos:', arrayConRepetidos);
console.log('Set desde Array:', setDesdeArray);

// 7. Conversión de Map a Array
console.log('\n--- Conversión: Map a Array ---');
const mapaPaises = new Map([
  ['MX', 'México'],
  ['US', 'Estados Unidos'],
  ['ES', 'España'],
  ['FR', 'Francia']
]);

const arrayDesdeMap = [...mapaPaises];
console.log('Map:', mapaPaises);
console.log('Array desde Map:', arrayDesdeMap);

// 8. Conversión de Map a Array de solo claves
console.log('\n--- Conversión: Map a Array de claves ---');
const arrayClaves = [...mapaPaises.keys()];
console.log('Claves:', arrayClaves);

// 9. Conversión de Map a Array de solo valores
console.log('\n--- Conversión: Map a Array de valores ---');
const arrayValores = [...mapaPaises.values()];
console.log('Valores:', arrayValores);

// 10. Conversión de Map a Objeto
console.log('\n--- Conversión: Map a Objeto ---');
const mapaUsuario = new Map([
  ['nombre', 'Juan'],
  ['edad', 25],
  ['email', 'juan@example.com'],
  ['ciudad', 'CDMX']
]);

const objetoDesdeMap = Object.fromEntries(mapaUsuario);
console.log('Map:', mapaUsuario);
console.log('Objeto desde Map:', objetoDesdeMap);
console.log('Acceso a propiedad:', objetoDesdeMap.nombre);

// 11. Conversión de Objeto a Map
console.log('\n--- Conversión: Objeto a Map ---');
const objetoPersona = {
  nombre: 'Maria',
  edad: 30,
  profesion: 'Ingeniera',
  empresa: 'TechCorp'
};

const mapaDesdeObjeto = new Map(Object.entries(objetoPersona));
console.log('Objeto:', objetoPersona);
console.log('Map desde Objeto:', mapaDesdeObjeto);

// 12. Conversión combinada: Objeto → Map → Array
console.log('\n--- Conversión combinada: Objeto → Map → Array ---');
const objetoConfig = {
  tema: 'oscuro',
  lenguaje: 'es',
  notificaciones: true,
  fontSize: 16
};

const mapaConfig = new Map(Object.entries(objetoConfig));
const arrayConfig = [...mapaConfig];
console.log('Objeto original:', objetoConfig);
console.log('Array resultante:', arrayConfig);

// 13. Conversión: Array de objetos → Map
console.log('\n--- Conversión: Array de objetos → Map ---');
const arrayUsuarios = [
  { id: 1, nombre: 'Juan' },
  { id: 2, nombre: 'Maria' },
  { id: 3, nombre: 'Pedro' }
];

const mapaUsuarios = new Map(arrayUsuarios.map((u) => [u.id, u.nombre]));
console.log('Array de usuarios:', arrayUsuarios);
console.log('Map (id → nombre):', mapaUsuarios);

// 14. Iteración sobre Map con for...of
console.log('\n--- Iteración: for...of en Map ---');
const mapaCalificaciones = new Map([
  ['Matemáticas', 90],
  ['Física', 85],
  ['Química', 88],
  ['Biología', 92]
]);

for (const [materia, calificacion] of mapaCalificaciones) {
  console.log(`${materia}: ${calificacion}`);
}

// 15. Iteración sobre Set con for...of
console.log('\n--- Iteración: for...of en Set ---');
const setFrutas = new Set(['manzana', 'banana', 'naranja', 'uva']);

for (const fruta of setFrutas) {
  console.log(fruta);
}
