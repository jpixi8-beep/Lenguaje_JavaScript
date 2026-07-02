// Módulo de Exportación
// Este archivo contiene funciones, variables y clases que serán exportadas
// para ser usadas en otros archivos mediante importación

// Exportación de constante
export const PI = 3.14159;
export const VERSION = '1.0.0';

// Exportación de variable
export let contador = 0;

// Exportación de función individual
export function sumar(a, b) {
    return a + b;
}

export function restar(a, b) {
    return a - b;
}

export function multiplicar(a, b) {
    return a * b;
}

export function dividir(a, b) {
    if (b === 0) {
        throw new Error('No se puede dividir por cero');
    }
    return a / b;
}

// Exportación de función flecha
export const potencia = (base, exponente) => {
    return Math.pow(base, exponente);
};

// Exportación de clase
export class Calculadora {
    constructor() {
        this.resultado = 0;
    }

    sumar(a, b) {
        this.resultado = a + b;
        return this;
    }

    restar(a, b) {
        this.resultado = a - b;
        return this;
    }

    multiplicar(a, b) {
        this.resultado = a * b;
        return this;
    }

    dividir(a, b) {
        if (b === 0) {
            throw new Error('No se puede dividir por cero');
        }
        this.resultado = a / b;
        return this;
    }

    obtenerResultado() {
        return this.resultado;
    }

    limpiar() {
        this.resultado = 0;
        return this;
    }
}

// Exportación de objeto
export const configuracion = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
    debug: false
};

// Exportación de función asíncrona
export async function obtenerDatos() {
    // Simular una petición asíncrona
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 1,
                nombre: 'Juan',
                email: 'juan@example.com'
            });
        }, 1000);
    });
}

// Exportación por defecto (solo uno por archivo)
export default function saludar(nombre) {
    return `Hola, ${nombre}!`;
}

// También se puede exportar por defecto una clase, objeto, etc.
// export default class MiClase { ... }
// export default { prop1: 'valor1', prop2: 'valor2' }

// Función no exportada (privada del módulo)
function funcionPrivada() {
    return 'Esta función no se puede importar';
}

// Variable no exportada (privada del módulo)
const variablePrivada = 'Esta variable no se puede importar';

console.log('Módulo de exportación cargado');
