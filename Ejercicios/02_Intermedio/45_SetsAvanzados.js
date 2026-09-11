// Ejercicio 45: Sets Avanzados y Operaciones de Conjuntos
// Temas: Set, unión, intersección, diferencia

// 1. Creación de Sets
console.log('--- Creación de Sets ---');
const setNumeros1 = new Set([1, 2, 3, 4, 5]);
const setNumeros2 = new Set([4, 5, 6, 7, 8]);
const setLetras1 = new Set(['a', 'b', 'c', 'd']);
const setLetras2 = new Set(['c', 'd', 'e', 'f']);

console.log('Set 1:', setNumeros1);
console.log('Set 2:', setNumeros2);

// 2. Unión de conjuntos
console.log('\n--- Unión de conjuntos ---');
const unionNumeros = new Set([...setNumeros1, ...setNumeros2]);
console.log('Unión de Set 1 y Set 2:', unionNumeros);

const unionLetras = new Set([...setLetras1, ...setLetras2]);
console.log('Unión de letras:', unionLetras);

// 3. Intersección de conjuntos
console.log('\n--- Intersección de conjuntos ---');
const interseccionNumeros = new Set([...setNumeros1].filter((x) => setNumeros2.has(x)));
console.log('Intersección de Set 1 y Set 2:', interseccionNumeros);

const interseccionLetras = new Set([...setLetras1].filter((x) => setLetras2.has(x)));
console.log('Intersección de letras:', interseccionLetras);

// 4. Diferencia de conjuntos (Set 1 - Set 2)
console.log('\n--- Diferencia de conjuntos (Set 1 - Set 2) ---');
const diferenciaNumeros = new Set([...setNumeros1].filter((x) => !setNumeros2.has(x)));
console.log('Diferencia (Set 1 - Set 2):', diferenciaNumeros);

const diferenciaLetras = new Set([...setLetras1].filter((x) => !setLetras2.has(x)));
console.log('Diferencia de letras (Set 1 - Set 2):', diferenciaLetras);

// 5. Diferencia simétrica (elementos en uno u otro pero no en ambos)
console.log('\n--- Diferencia simétrica ---');
const diferenciaSimetrica = new Set([
  ...[...setNumeros1].filter((x) => !setNumeros2.has(x)),
  ...[...setNumeros2].filter((x) => !setNumeros1.has(x))
]);
console.log('Diferencia simétrica:', diferenciaSimetrica);

// 6. Verificar si un set es subconjunto de otro
console.log('\n--- Verificar subconjunto ---');
const setA = new Set([1, 2, 3]);
const setB = new Set([1, 2, 3, 4, 5]);

const esSubconjunto = [...setA].every((x) => setB.has(x));
console.log(`¿Set A es subconjunto de Set B? ${esSubconjunto}`);

const esSubconjuntoInverso = [...setB].every((x) => setA.has(x));
console.log(`¿Set B es subconjunto de Set A? ${esSubconjuntoInverso}`);

// 7. Eliminar duplicados de un array usando Set
console.log('\n--- Eliminar duplicados con Set ---');
const arrayConDuplicados = [1, 2, 2, 3, 4, 4, 5, 5, 5, 6];
const arraySinDuplicados = [...new Set(arrayConDuplicados)];
console.log('Original:', arrayConDuplicados);
console.log('Sin duplicados:', arraySinDuplicados);

const nombresDuplicados = ['Juan', 'Maria', 'Juan', 'Ana', 'Maria', 'Pedro'];
const nombresUnicos = [...new Set(nombresDuplicados)];
console.log('Nombres originales:', nombresDuplicados);
console.log('Nombres únicos:', nombresUnicos);

// 8. Operaciones con Sets de objetos (por ID)
console.log('\n--- Sets con objetos (por ID) ---');
const usuarios1 = [
  { id: 1, nombre: 'Juan' },
  { id: 2, nombre: 'Maria' },
  { id: 3, nombre: 'Pedro' }
];

const usuarios2 = [
  { id: 2, nombre: 'Maria' },
  { id: 3, nombre: 'Pedro' },
  { id: 4, nombre: 'Ana' }
];

const ids1 = new Set(usuarios1.map((u) => u.id));
const ids2 = new Set(usuarios2.map((u) => u.id));

const idsComunes = new Set([...ids1].filter((id) => ids2.has(id)));
console.log('IDs comunes:', idsComunes);

const usuariosComunes = usuarios1.filter((u) => idsComunes.has(u.id));
console.log('Usuarios comunes:', usuariosComunes);

// 9. Tamaño y operaciones básicas
console.log('\n--- Operaciones básicas ---');
const setOperaciones = new Set([1, 2, 3]);
console.log('Tamaño:', setOperaciones.size);
console.log('¿Tiene 2?', setOperaciones.has(2));
console.log('¿Tiene 5?', setOperaciones.has(5));

setOperaciones.add(4);
console.log('Después de add(4):', setOperaciones);

setOperaciones.delete(2);
console.log('Después de delete(2):', setOperaciones);

setOperaciones.clear();
console.log('Después de clear():', setOperaciones);
