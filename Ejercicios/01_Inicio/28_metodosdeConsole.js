// Métodos de Console en JavaScript
// La consola es una herramienta fundamental para depuración y desarrollo
// Contiene múltiples métodos para mostrar información de diferentes formas

console.log('--- console.log() ---');
// Muestra un mensaje en la consola
// Es el método más comúnmente usado para depuración
console.log('Este es un mensaje normal');
console.log('Puedes mostrar múltiples valores:', 1, 'dos', { tres: 3 });
console.log('Usa %s para strings, %d para números:', 'Hola', 42);

console.log('\n--- console.error() ---');
// Muestra un error en la consola (generalmente en color rojo)
// Se usa para mostrar errores o problemas
console.error('Este es un mensaje de error');
console.error('Error crítico:', new Error('Algo salió mal'));

console.log('\n--- console.warn() ---');
// Muestra una advertencia en la consola (generalmente en color amarillo)
// Se usa para mostrar advertencias que no son errores críticos
console.warn('Esta es una advertencia');
console.warn('Cuidado: esta función será deprecada');

console.log('\n--- console.info() ---');
// Muestra información en la consola (similar a log pero con icono de info)
// Se usa para mostrar información informativa
console.info('Esta es información adicional');
console.info('Estado del sistema: OK');

console.log('\n--- console.table() ---');
// Muestra una tabla en la consola para mostrar objetos o arrays
// Es muy útil para visualizar datos estructurados
const usuarios = [
    { nombre: 'Juan', edad: 25, ciudad: 'Madrid' },
    { nombre: 'Ana', edad: 30, ciudad: 'Barcelona' },
    { nombre: 'Carlos', edad: 28, ciudad: 'Valencia' }
];
console.table(usuarios);

const producto = {
    id: 1,
    nombre: 'Laptop',
    precio: 1000,
    stock: 10
};
console.table(producto);

console.log('\n--- console.time() y console.timeEnd() ---');
// Inicia y finaliza un temporizador para medir tiempo de ejecución
// Útil para medir rendimiento de código
console.time('miTimer');
for (let i = 0; i < 1000000; i++) {
    // Operación a medir
}
console.timeEnd('miTimer');

console.time('operacion1');
setTimeout(() => console.timeEnd('operacion1'), 100);

console.log('\n--- console.timeLog() ---');
// Muestra el tiempo transcurrido de un temporizador sin finalizarlo
// Útil para mostrar progreso durante operaciones largas
console.time('proceso');
setTimeout(() => console.timeLog('proceso', 'Paso 1 completado'), 100);
setTimeout(() => console.timeLog('proceso', 'Paso 2 completado'), 200);
setTimeout(() => console.timeEnd('proceso'), 300);

console.log('\n--- console.assert() ---');
// Muestra un mensaje si la condición es falsa
// Útil para debugging y pruebas
console.assert(1 === 1, 'Esto no se mostrará porque es true');
console.assert(1 === 2, 'Esto se mostrará porque es false');
console.assert(5 > 10, '5 no es mayor que 10');

console.log('\n--- console.count() ---');
// Cuenta cuántas veces se llama a la función
// Útil para saber cuántas veces se ejecuta un código
console.count('miContador');
console.count('miContador');
console.count('miContador');
console.count('otroContador');
console.count('miContador');
console.countReset('miContador');
console.count('miContador');

console.log('\n--- console.group() y console.groupEnd() ---');
// Agrupa mensajes en la consola para mejor organización
// Útil para estructurar la salida de depuración
console.group('Grupo Principal');
console.log('Mensaje dentro del grupo');
console.log('Otro mensaje dentro del grupo');

console.group('Subgrupo');
console.log('Mensaje dentro del subgrupo');
console.groupEnd();

console.log('Mensaje de vuelta al grupo principal');
console.groupEnd();

console.log('Mensaje fuera de todos los grupos');

console.groupCollapsed('Grupo Colapsado');
console.log('Este grupo aparece colapsado por defecto');
console.groupEnd();

console.log('\n--- console.clear() ---');
// Limpia la consola
// Útil para limpiar la salida antes de mostrar nueva información
// Nota: En algunos entornos puede estar deshabilitado
console.log('Este mensaje se borrará con console.clear()');
// console.clear(); // Descomentar para probar
console.log('Después de limpiar (si se ejecutó clear)');

console.log('\n--- console.dir() ---');
// Muestra un objeto en la consola en formato interactivo
// Muestra todas las propiedades del objeto de forma detallada
const persona = {
    nombre: 'Juan',
    edad: 25,
    direccion: {
        calle: 'Calle Principal',
        numero: 123
    }
};
console.log('Con console.log:', persona);
console.dir(persona);

console.dir(document); // Muestra el objeto document del DOM

console.log('\n--- console.trace() ---');
// Muestra el stack trace (pila de llamadas)
// Útil para saber de dónde se está llamando una función
function funcionA() {
    funcionB();
}

function funcionB() {
    funcionC();
}

function funcionC() {
    console.trace('Stack trace desde funcionC');
}

funcionA();

console.log('\n--- console.memory ---');
// Muestra información sobre la memoria del navegador
// Solo disponible en algunos navegadores (Chrome principalmente)
if (console.memory) {
    console.log('Información de memoria:');
    console.log('Used JS Heap Size:', console.memory.usedJSHeapSize, 'bytes');
    console.log('Total JS Heap Size:', console.memory.totalJSHeapSize, 'bytes');
    console.log('JS Heap Size Limit:', console.memory.jsHeapSizeLimit, 'bytes');
} else {
    console.log('console.memory no está disponible en este entorno');
}

console.log('\n--- console.profile() y console.profileEnd() ---');
// Inicia y finaliza un perfil de rendimiento
// Útil para análisis detallado de rendimiento en DevTools
// Nota: Solo funciona en DevTools del navegador
console.log('Para usar console.profile/profileEnd, abre DevTools');
// console.profile('miPerfil');
// // Código a perfilar
// console.profileEnd('miPerfil');

console.log('\n--- console.timeStamp() ---');
// Agrega un marcador de tiempo en la línea de tiempo de DevTools
// Útil para correlacionar eventos en el timeline
// Nota: Solo funciona en DevTools del navegador
console.timeStamp('Marcador de tiempo');

console.log('\n--- console.debug() ---');
// Muestra un mensaje de debug (similar a log pero con nivel debug)
// En algunos navegadores puede aparecer con diferente estilo
console.debug('Este es un mensaje de debug');

console.log('\n--- console.groupCollapsed() ---');
// Similar a group() pero el grupo aparece colapsado por defecto
console.groupCollapsed('Grupo colapsado por defecto');
console.log('Este contenido está colapsado');
console.groupEnd();

console.log('\n--- Uso práctico: Depuración de objeto complejo ---');
const datosComplejos = {
    usuario: {
        id: 1,
        nombre: 'Juan',
        perfil: {
            nivel: 'premium',
            configuraciones: {
                tema: 'oscuro',
                notificaciones: true
            }
        }
    },
    metadatos: {
        fechaCreacion: '2024-01-01',
        ultimaActividad: '2024-06-30'
    }
};

console.log('Objeto completo:');
console.dir(datosComplejos);

console.log('\nTabla de usuario:');
console.table(datosComplejos.usuario);

console.log('\n--- Uso práctico: Medir rendimiento ---');
console.time('bucle');
let suma = 0;
for (let i = 0; i < 10000000; i++) {
    suma += i;
}
console.timeEnd('bucle');
console.log('Resultado:', suma);

console.log('\n--- Uso práctico: Depuración condicional ---');
function procesarDatos(datos) {
    console.assert(datos !== null, 'datos no puede ser null');
    console.assert(typeof datos === 'object', 'datos debe ser un objeto');
    console.assert(Array.isArray(datos), 'datos debe ser un array');
    return datos.length;
}

console.log('Procesando array válido:', procesarDatos([1, 2, 3]));
console.log('Procesando null:');
try {
    procesarDatos(null);
} catch (e) {
    console.log('Error capturado:', e.message);
}

console.log('\n--- Uso práctico: Seguimiento de ejecución ---');
console.group('Proceso de login');
console.log('Iniciando proceso...');

function validarUsuario(usuario) {
    console.count('validarUsuario');
    console.log('Validando usuario:', usuario);
    return usuario.length > 0;
}

function autenticar(usuario, password) {
    console.count('autenticar');
    console.log('Autenticando:', usuario);
    return usuario === 'admin' && password === '1234';
}

function login(usuario, password) {
    console.group('Intento de login');
    
    if (!validarUsuario(usuario)) {
        console.error('Usuario inválido');
        console.groupEnd();
        return false;
    }
    
    if (!autenticar(usuario, password)) {
        console.warn('Credenciales incorrectas');
        console.groupEnd();
        return false;
    }
    
    console.info('Login exitoso');
    console.groupEnd();
    return true;
}

login('admin', '1234');
login('user', 'wrong');
console.groupEnd();

console.log('\n--- Resumen de métodos más usados ---');
console.log('✓ console.log() - Mensajes generales');
console.log('✓ console.error() - Errores');
console.log('✓ console.warn() - Advertencias');
console.log('✓ console.table() - Tablas de datos');
console.log('✓ console.time/timeEnd() - Medir tiempo');
console.log('✓ console.assert() - Aserciones');
console.log('✓ console.count() - Contar ejecuciones');
console.log('✓ console.group/groupEnd() - Agrupar mensajes');
console.log('✓ console.dir() - Explorar objetos');
console.log('✓ console.trace() - Stack trace');
