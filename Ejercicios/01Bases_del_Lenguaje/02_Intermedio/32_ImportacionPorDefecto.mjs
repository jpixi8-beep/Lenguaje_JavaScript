// Importación por Defecto (import default)
// La importación por defecto se usa para importar el export default de un módulo
// A diferencia de las importaciones nombradas, no se usan llaves {}
// Se puede usar cualquier nombre para la importación por defecto

// Importación por defecto (sin llaves, nombre personalizable)
import miFuncion from './31_ExportacionPorDefecto.mjs';

// También se puede importar con cualquier nombre
// import saludo from './31_ExportacionPorDefecto.mjs';
// import saludarUsuario from './31_ExportacionPorDefecto.mjs';

// Importaciones nombradas (con llaves, nombres fijos)
import { PI, VERSION, sumar, Calculadora } from './31_ExportacionPorDefecto.mjs';

// Importación combinada: default y nombradas
// import miFuncion, { PI, VERSION } from './31_ExportacionPorDefecto.mjs';

console.log('--- Importación por defecto ---');
console.log('Usando la función importada por defecto:');
console.log(miFuncion('LechuDevx'));
console.log(miFuncion('Ana'));
console.log(miFuncion('Carlos'));

console.log('\n--- Importaciones nombradas ---');
console.log('PI:', PI);
console.log('VERSION:', VERSION);
console.log('Suma (5 + 3):', sumar(5, 3));

console.log('\n--- Uso de clase importada ---');
const calc = new Calculadora();
calc.sumar(10, 5);
console.log('Resultado:', calc.obtenerResultado());

console.log('\n--- Diferencias entre importación default y nombrada ---');
console.log('✓ Importación default: sin llaves, nombre personalizable');
console.log('✓ Importación nombrada: con llaves, nombre debe coincidir');

console.log('\n--- Ejemplo de importación con nombres diferentes ---');
// Si el export default fuera una clase:
// import MiClase from './modulo.mjs';
// const instancia = new MiClase();

// Si el export default fuera un objeto:
// import config from './modulo.mjs';
// console.log(config.nombre);

console.log('\n--- Importación dinámica con default ---');
async function importarDefault() {
    try {
        const modulo = await import('./31_ExportacionPorDefecto.mjs');
        console.log('Importación dinámica del default:');
        console.log(modulo.default('Usuario dinámico'));
        
        console.log('\nImportación dinámica de nombradas:');
        console.log('PI:', modulo.PI);
        console.log('Suma:', modulo.sumar(2, 3));
    } catch (error) {
        console.error('Error en importación dinámica:', error);
    }
}

importarDefault();

console.log('\n--- Reglas importantes ---');
console.log('1. Solo puede haber un export default por archivo');
console.log('2. La importación default no usa llaves {}');
console.log('3. El nombre de la importación default es personalizable');
console.log('4. Las importaciones nombradas usan llaves {}');
console.log('5. Los nombres de importaciones nombradas deben coincidir');
console.log('6. Se pueden combinar importaciones default y nombradas');
