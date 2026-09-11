// Módulo de Importación
// Este archivo importa funciones, variables y clases del módulo de exportación
// Para ejecutar este archivo: node 30_Modulos_Importacion.mjs

// Importación de exportaciones individuales
import { PI, VERSION, contador } from './29_Modulos_Exportacion.mjs';

// Importación de funciones individuales
import { sumar, restar, multiplicar, dividir, potencia } from './29_Modulos_Exportacion.mjs';

// Importación de clase
import { Calculadora } from './29_Modulos_Exportacion.mjs';

// Importación de objeto
import { configuracion } from './29_Modulos_Exportacion.mjs';

// Importación de función asíncrona
import { obtenerDatos } from './29_Modulos_Exportacion.mjs';

// Importación por defecto
import saludar from './29_Modulos_Exportacion.mjs';

// Importación de todo en un objeto namespace
import * as matematicas from './29_Modulos_Exportacion.mjs';

console.log('--- Importación de constantes ---');
console.log('PI:', PI);
console.log('VERSION:', VERSION);
console.log('Contador inicial:', contador);

console.log('\n--- Importación de funciones ---');
console.log('Suma (5 + 3):', sumar(5, 3));
console.log('Resta (10 - 4):', restar(10, 4));
console.log('Multiplicación (3 * 7):', multiplicar(3, 7));
console.log('División (15 / 3):', dividir(15, 3));
console.log('Potencia (2^3):', potencia(2, 3));

console.log('\n--- Importación de clase ---');
const calc = new Calculadora();
calc.sumar(10, 5);
console.log('Resultado después de sumar:', calc.obtenerResultado());
calc.multiplicar(2, 3);
console.log('Resultado después de multiplicar:', calc.obtenerResultado());
calc.limpiar();
console.log('Resultado después de limpiar:', calc.obtenerResultado());

console.log('\n--- Importación de objeto ---');
console.log('Configuración:', configuracion);
console.log('API URL:', configuracion.apiUrl);
console.log('Timeout:', configuracion.timeout);

console.log('\n--- Importación de función asíncrona ---');
obtenerDatos().then(datos => {
    console.log('Datos obtenidos:', datos);
}).catch(error => {
    console.error('Error:', error);
});

console.log('\n--- Importación por defecto ---');
console.log(saludar('LechuDevx'));
console.log(saludar('Ana'));

console.log('\n--- Importación con namespace ---');
console.log('Usando namespace matematicas:');
console.log('PI:', matematicas.PI);
console.log('VERSION:', matematicas.VERSION);
console.log('Suma con namespace:', matematicas.sumar(5, 3));
console.log('Resta con namespace:', matematicas.restar(10, 4));

console.log('\n--- Modificar variable exportada ---');
contador++;
console.log('Contador incrementado:', contador);
console.log('Contador desde namespace:', matematicas.contador);

console.log('\n--- Manejo de errores en división ---');
try {
    console.log('División por cero:', dividir(10, 0));
} catch (error) {
    console.error('Error:', error.message);
}

console.log('\n--- Uso combinado de importaciones ---');
const resultado1 = sumar(multiplicar(2, 3), 4);
console.log('2 * 3 + 4 =', resultado1);

const resultado2 = potencia(dividir(16, 2), 2);
console.log('(16 / 2)^2 =', resultado2);

console.log('\n--- Crear instancia de Calculadora y usar métodos ---');
const calc2 = new Calculadora();
const resultadoFinal = calc2
    .sumar(10, 5)
    .multiplicar(2, 3)
    .obtenerResultado();
console.log('Resultado encadenado:', resultadoFinal);

console.log('\n--- Importación condicional (no soportado directamente) ---');
// Para importación condicional se usa import() dinámico
async function importarModulo() {
    try {
        const modulo = await import('./29_Modulos_Exportacion.mjs');
        console.log('Importación dinámica exitosa');
        console.log('PI desde import dinámico:', modulo.PI);
        console.log('Saludo desde import dinámico:', modulo.default('Mundo'));
    } catch (error) {
        console.error('Error en importación dinámica:', error);
    }
}

importarModulo();
