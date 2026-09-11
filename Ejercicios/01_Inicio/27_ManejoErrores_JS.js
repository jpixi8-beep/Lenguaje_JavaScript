// Manejo de Errores en JavaScript
// El manejo de errores permite controlar el flujo del programa cuando ocurren excepciones
// Se usa try-catch-finally para capturar y manejar errores
// throw se usa para lanzar errores manualmente

// Estructura básica try-catch-finally
console.log('--- Estructura básica try-catch-finally ---');

try {
    // Código que puede lanzar un error
    console.log('Iniciando bloque try');
    let resultado = 10 / 2;
    console.log('Resultado:', resultado);
} catch (error) {
    // Código que se ejecuta si hay un error
    console.log('Error capturado:', error.message);
} finally {
    // Código que se ejecuta siempre, haya error o no
    console.log('Bloque finally ejecutado');
}

console.log('\n--- Capturar error de división por cero ---');

try {
    let resultado = 10 / 0;
    console.log('Resultado:', resultado); // Infinity (no lanza error en JS)
} catch (error) {
    console.log('Error:', error.message);
} finally {
    console.log('Finalizando división');
}

console.log('\n--- Error con variable no definida ---');

try {
    console.log(variableNoDefinida); // ReferenceError
} catch (error) {
    console.log('Error capturado:', error.name);
    console.log('Mensaje:', error.message);
} finally {
    console.log('Bloque finally ejecutado');
}

console.log('\n--- Usar throw para lanzar errores personalizados ---');

function validarEdad(edad) {
    if (edad < 0) {
        throw new Error('La edad no puede ser negativa');
    }
    if (edad > 120) {
        throw new Error('La edad no puede ser mayor a 120');
    }
    if (typeof edad !== 'number') {
        throw new TypeError('La edad debe ser un número');
    }
    return true;
}

try {
    validarEdad(-5);
} catch (error) {
    console.log('Error:', error.message);
}

try {
    validarEdad(150);
} catch (error) {
    console.log('Error:', error.message);
}

try {
    validarEdad('veinte');
} catch (error) {
    console.log('Error:', error.message);
}

try {
    validarEdad(25);
    console.log('Edad válida');
} catch (error) {
    console.log('Error:', error.message);
}

console.log('\n--- Diferentes tipos de errores ---');

// Error genérico
try {
    throw new Error('Este es un error genérico');
} catch (error) {
    console.log('Error:', error.message);
}

// TypeError
try {
    throw new TypeError('Tipo de dato incorrecto');
} catch (error) {
    console.log('TypeError:', error.message);
}

// ReferenceError
try {
    throw new ReferenceError('Referencia no encontrada');
} catch (error) {
    console.log('ReferenceError:', error.message);
}

// RangeError
try {
    throw new RangeError('Valor fuera de rango');
} catch (error) {
    console.log('RangeError:', error.message);
}

// SyntaxError
try {
    throw new SyntaxError('Error de sintaxis');
} catch (error) {
    console.log('SyntaxError:', error.message);
}

console.log('\n--- Ejemplo práctico: División segura ---');

function divisionSegura(dividendo, divisor) {
    try {
        if (divisor === 0) {
            throw new Error('No se puede dividir por cero');
        }
        if (typeof dividendo !== 'number' || typeof divisor !== 'number') {
            throw new TypeError('Ambos valores deben ser números');
        }
        return dividendo / divisor;
    } catch (error) {
        console.log('Error en división:', error.message);
        return null;
    }
}

console.log('10 / 2:', divisionSegura(10, 2)); // 5
console.log('10 / 0:', divisionSegura(10, 0)); // null (con error)
console.log('10 / "2":', divisionSegura(10, '2')); // null (con error)

console.log('\n--- Ejemplo práctico: Validación de formulario ---');

function validarFormulario(datos) {
    const errores = [];

    try {
        if (!datos.nombre || datos.nombre.trim() === '') {
            throw new Error('El nombre es requerido');
        }
        if (!datos.email || !datos.email.includes('@')) {
            throw new Error('El email debe ser válido');
        }
        if (!datos.edad || datos.edad < 18) {
            throw new Error('Debe ser mayor de 18 años');
        }
        return { valido: true, mensaje: 'Formulario válido' };
    } catch (error) {
        return { valido: false, mensaje: error.message };
    }
}

console.log(validarFormulario({ nombre: 'Juan', email: 'juan@example.com', edad: 25 }));
console.log(validarFormulario({ nombre: '', email: 'juan@example.com', edad: 25 }));
console.log(validarFormulario({ nombre: 'Juan', email: 'juan', edad: 25 }));
console.log(validarFormulario({ nombre: 'Juan', email: 'juan@example.com', edad: 15 }));

console.log('\n--- Ejemplo con finally para limpieza ---');

let conexionAbierta = false;

function operarConBaseDeDatos() {
    try {
        conexionAbierta = true;
        console.log('Conexión abierta');

        // Simular operación
        console.log('Realizando operación...');

        // Simular error
        throw new Error('Error en la operación');
    } catch (error) {
        console.log('Error:', error.message);
    } finally {
        // Este bloque siempre se ejecuta, útil para limpieza
        if (conexionAbierta) {
            conexionAbierta = false;
            console.log('Conexión cerrada (finally)');
        }
    }
}

operarConBaseDeDatos();
console.log('Conexión abierta:', conexionAbierta); // false

console.log('\n--- Ejemplo sin error (finally se ejecuta igual) ---');

function operarSinError() {
    try {
        conexionAbierta = true;
        console.log('Conexión abierta');
        console.log('Operación exitosa');
    } catch (error) {
        console.log('Error:', error.message);
    } finally {
        if (conexionAbierta) {
            conexionAbierta = false;
            console.log('Conexión cerrada (finally)');
        }
    }
}

operarSinError();
console.log('Conexión abierta:', conexionAbierta); // false

console.log('\n--- Encadenamiento de errores (error cause) ---');

try {
    try {
        throw new Error('Error interno');
    } catch (error) {
        throw new Error('Error externo', { cause: error });
    }
} catch (error) {
    console.log('Error principal:', error.message);
    console.log('Causa del error:', error.cause.message);
}

console.log('\n--- Ejemplo con async/await y errores ---');

async function funcionAsincronica() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Error en operación asíncrona'));
        }, 100);
    });
}

async function manejarErrorAsincronico() {
    try {
        await funcionAsincronica();
    } catch (error) {
        console.log('Error asíncrono capturado:', error.message);
    }
}

manejarErrorAsincronico();

console.log('\n--- Crear errores personalizados ---');

class ErrorPersonalizado extends Error {
    constructor(mensaje, codigo) {
        super(mensaje);
        this.name = 'ErrorPersonalizado';
        this.codigo = codigo;
    }
}

try {
    throw new ErrorPersonalizado('Este es un error personalizado', 500);
} catch (error) {
    console.log('Nombre del error:', error.name);
    console.log('Mensaje:', error.message);
    console.log('Código:', error.codigo);
}
