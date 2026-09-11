// Ejercicio 43: Manipulación y Ordenación de Arrays
// Temas: flat, flatMap, sort

// 1. flat: Aplanar arrays anidados
console.log('--- flat: Aplanar arrays ---');
const numerosAnidados = [1, [2, [3, [4, [5]]]]];
console.log('Original:', numerosAnidados);

const flat1 = numerosAnidados.flat(1);
console.log('flat(1):', flat1);

const flat2 = numerosAnidados.flat(2);
console.log('flat(2):', flat2);

const flat3 = numerosAnidados.flat(3);
console.log('flat(3):', flat3);

const flatTodo = numerosAnidados.flat(Infinity);
console.log('flat(Infinity):', flatTodo);

// 2. flat: Aplanar array de estudiantes con calificaciones
console.log('\n--- flat: Aplanar calificaciones ---');
const estudiantes = [
  { nombre: 'Juan', calificaciones: [85, 90, 78] },
  { nombre: 'Maria', calificaciones: [92, 88, 95] },
  { nombre: 'Pedro', calificaciones: [70, 75, 80] }
];

const todasCalificaciones = estudiantes.flatMap((estudiante) => estudiante.calificaciones);
console.log('Todas las calificaciones:', todasCalificaciones);

// 3. flatMap: Aplanar y transformar
console.log('\n--- flatMap: Duplicar y aplanar ---');
const nums = [1, 2, 3, 4];
const duplicadosFlatMap = nums.flatMap((num) => [num, num * 2]);
console.log('flatMap duplicados:', duplicadosFlatMap);

// 4. flatMap: Crear pares de elementos
console.log('\n--- flatMap: Crear pares ---');
const palabras = ['hola', 'mundo', 'javascript'];
const pares = palabras.flatMap((palabra) => [palabra, palabra.length]);
console.log('Palabras con longitudes:', pares);

// 5. sort: Ordenar números
console.log('\n--- sort: Ordenar números ---');
const numerosDesordenados = [5, 2, 8, 1, 9, 3, 7, 4, 6];
console.log('Original:', numerosDesordenados);

const ascendente = [...numerosDesordenados].sort((a, b) => a - b);
console.log('Ascendente:', ascendente);

const descendente = [...numerosDesordenados].sort((a, b) => b - a);
console.log('Descendente:', descendente);

// 6. sort: Ordenar strings
console.log('\n--- sort: Ordenar strings ---');
const nombres = ['Carlos', 'Ana', 'Beatriz', 'David', 'Elena'];
console.log('Original:', nombres);

const nombresAsc = [...nombres].sort();
console.log('Alfabético:', nombresAsc);

const nombresDesc = [...nombres].sort((a, b) => b.localeCompare(a));
console.log('Inverso:', nombresDesc);

// 7. sort: Ordenar objetos por propiedad
console.log('\n--- sort: Ordenar objetos ---');
const personas = [
  { nombre: 'Juan', edad: 25 },
  { nombre: 'Maria', edad: 30 },
  { nombre: 'Pedro', edad: 20 },
  { nombre: 'Ana', edad: 35 }
];

const porEdadAsc = [...personas].sort((a, b) => a.edad - b.edad);
console.log('Por edad (ascendente):', porEdadAsc);

const porNombre = [...personas].sort((a, b) => a.nombre.localeCompare(b.nombre));
console.log('Por nombre:', porNombre);

// 8. Combinación: flat + sort
console.log('\n--- Combinación: flat + sort ---');
const matriz = [
  [5, 3, 8],
  [1, 9, 2],
  [7, 4, 6]
];
const aplanadoOrdenado = matriz.flat().sort((a, b) => a - b);
console.log('Matriz aplanada y ordenada:', aplanadoOrdenado);
