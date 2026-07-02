// Exportación por Defecto (export default)
// La exportación por defecto permite exportar un único valor por módulo
// A diferencia de las exportaciones nombradas, solo puede haber un export default por archivo
// Al importar, se puede usar cualquier nombre para la importación por defecto

// Exportación por defecto de una función
export default function saludar(nombre) {
    return `¡Hola, ${nombre}! Bienvenido al sistema.`;
}

// También se puede exportar por defecto una función flecha
// const despedir = (nombre) => {
//     return `¡Adiós, ${nombre}! Hasta pronto.`;
// };
// export default despedir;

// También se puede exportar por defecto una clase
// export default class Usuario {
//     constructor(nombre) {
//         this.nombre = nombre;
//     }
// }

// También se puede exportar por defecto un objeto
// export default {
//     nombre: 'Sistema',
//     version: '1.0.0',
//     autor: 'LechuDevx'
// };

// También se puede exportar por defecto un valor primitivo
// export default 42;
// export default 'Texto por defecto';
// export default true;

// Exportaciones nombradas adicionales (pueden coexistir con export default)
export const PI = 3.14159;
export const VERSION = '1.0.0';

export function sumar(a, b) {
    return a + b;
}

export class Calculadora {
    constructor() {
        this.resultado = 0;
    }

    sumar(a, b) {
        this.resultado = a + b;
        return this;
    }

    obtenerResultado() {
        return this.resultado;
    }
}

console.log('Módulo de exportación por defecto cargado');
