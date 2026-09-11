// Métodos Estáticos en JavaScript
// Los métodos estáticos son métodos que pertenecen a la clase y no a la instancia de la clase
// Se definen con la palabra clave 'static' antes del nombre del método
// No pueden acceder a las propiedades de la instancia (this.propiedad)
// Solo pueden acceder a otras propiedades estáticas o métodos estáticos
// Se llaman directamente desde la clase, no desde una instancia

class Calculadora {
    // Método estático para sumar
    static sumar(a, b) {
        return a + b;
    }

    // Método estático para restar
    static restar(a, b) {
        return a - b;
    }

    // Método estático para multiplicar
    static multiplicar(a, b) {
        return a * b;
    }

    // Método estático para dividir
    static dividir(a, b) {
        if (b === 0) {
            throw new Error('No se puede dividir por cero');
        }
        return a / b;
    }

    // Propiedad estática
    static PI = 3.14159;

    // Método estático que usa propiedad estática
    static calcularAreaCirculo(radio) {
        return this.PI * radio * radio;
    }
}

// Llamar métodos estáticos directamente desde la clase
console.log('--- Métodos Estáticos ---');
console.log('Suma:', Calculadora.sumar(5, 3)); // 8
console.log('Resta:', Calculadora.restar(10, 4)); // 6
console.log('Multiplicación:', Calculadora.multiplicar(3, 7)); // 21
console.log('División:', Calculadora.dividir(15, 3)); // 5

// Usar propiedad estática
console.log('PI:', Calculadora.PI); // 3.14159

// Usar método estático que usa propiedad estática
console.log('Área del círculo (radio 5):', Calculadora.calcularAreaCirculo(5)); // 78.53975

// Intentar dividir por cero
try {
    console.log('División por cero:', Calculadora.dividir(10, 0));
} catch (error) {
    console.log('Error:', error.message); // No se puede dividir por cero
}

// No se pueden llamar métodos estáticos desde una instancia
const calc = new Calculadora();
// calc.sumar(5, 3); // Error: calc.sumar is not a function

console.log('\n--- Ejemplo con Usuario ---');

class Usuario {
    static contadorUsuarios = 0; // Propiedad estática para contar usuarios
    static usuariosActivos = []; // Propiedad estática para guardar usuarios activos

    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
        // Incrementar contador estático
        Usuario.contadorUsuarios++;
        // Agregar a lista estática
        Usuario.usuariosActivos.push(this);
    }

    // Método estático para obtener el total de usuarios
    static getTotalUsuarios() {
        return Usuario.contadorUsuarios;
    }

    // Método estático para mostrar usuarios activos
    static mostrarUsuariosActivos() {
        console.log('Usuarios activos:');
        Usuario.usuariosActivos.forEach((usuario, index) => {
            console.log(`${index + 1}. ${usuario.nombre} (${usuario.email})`);
        });
    }

    // Método estático para buscar usuario por email
    static buscarPorEmail(email) {
        return Usuario.usuariosActivos.find(usuario => usuario.email === email);
    }

    // Método de instancia
    presentarse() {
        console.log(`Hola, soy ${this.nombre}`);
    }
}

const usuario1 = new Usuario('LechuDevx', 'lechu@example.com');
const usuario2 = new Usuario('Ana', 'ana@example.com');
const usuario3 = new Usuario('Carlos', 'carlos@example.com');

// Usar métodos estáticos
console.log('Total de usuarios:', Usuario.getTotalUsuarios()); // 3
Usuario.mostrarUsuariosActivos();

// Buscar usuario por email
const usuarioEncontrado = Usuario.buscarPorEmail('ana@example.com');
console.log('Usuario encontrado:', usuarioEncontrado ? usuarioEncontrado.nombre : 'No encontrado');

// Usar método de instancia
usuario1.presentarse();

console.log('\n--- Ejemplo con Utilidades ---');

class Utilidades {
    // Método estático para generar ID único
    static generarId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Método estático para capitalizar texto
    static capitalizar(texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    }

    // Método estático para validar email
    static validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Método estático para formatear fecha
    static formatearFecha(fecha = new Date()) {
        return fecha.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

console.log('ID único:', Utilidades.generarId());
console.log('Capitalizar:', Utilidades.capitalizar('hOLA mUNDO')); // Hola mundo
console.log('Validar email:', Utilidades.validarEmail('test@example.com')); // true
console.log('Validar email inválido:', Utilidades.validarEmail('test@')); // false
console.log('Fecha formateada:', Utilidades.formatearFecha());

console.log('\n--- Ejemplo con Configuración ---');

class Configuracion {
    static configuracion = {
        apiUrl: 'https://api.example.com',
        timeout: 5000,
        retries: 3,
        debug: false
    };

    static getConfig(key) {
        return this.configuracion[key];
    }

    static setConfig(key, value) {
        this.configuracion[key] = value;
    }

    static mostrarConfiguracion() {
        console.log('Configuración actual:');
        console.log(this.configuracion);
    }
}

Configuracion.mostrarConfiguracion();
console.log('API URL:', Configuracion.getConfig('apiUrl'));
Configuracion.setConfig('debug', true);
Configuracion.setConfig('timeout', 10000);
Configuracion.mostrarConfiguracion();
