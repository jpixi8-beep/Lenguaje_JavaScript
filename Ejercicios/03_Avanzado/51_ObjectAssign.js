// Ejercicio 51: Object.assign en un objeto
// Tema: Object.assign

// 1. Uso básico de Object.assign (copiar propiedades)
console.log('--- Uso básico de Object.assign ---');
const objDestino = {};
const objOrigen = { a: 1, b: 2 };

Object.assign(objDestino, objOrigen);
console.log('Objeto destino:', objDestino);
console.log('Objeto origen:', objOrigen);

// 2. Copiar múltiples objetos a uno
console.log('\n--- Copiar múltiples objetos ---');
const objetivo = {};
const fuente1 = { nombre: 'Juan' };
const fuente2 = { edad: 25 };
const fuente3 = { ciudad: 'CDMX' };

Object.assign(objetivo, fuente1, fuente2, fuente3);
console.log('Objeto combinado:', objetivo);

// 3. Object.assign con objeto literal
console.log('\n--- Object.assign con objeto literal ---');
const persona = Object.assign({}, { nombre: 'Maria' }, { edad: 30 }, { profesion: 'Ingeniera' });
console.log('Persona creada:', persona);

// 4. Clonar objetos
console.log('\n--- Clonar objetos ---');
const original = { a: 1, b: 2, c: 3 };
const clon = Object.assign({}, original);

console.log('Original:', original);
console.log('Clon:', clon);
console.log('¿Son iguales?', original === clon); // false

// Modificar el clon no afecta al original
clon.a = 100;
console.log('Después de modificar clon:');
console.log('Original:', original);
console.log('Clon:', clon);

// 5. Sobrescribir propiedades
console.log('\n--- Sobrescribir propiedades ---');
const config = { tema: 'claro', lenguaje: 'es', fontSize: 16 };
const nuevaConfig = { tema: 'oscuro', fontSize: 18 };

Object.assign(config, nuevaConfig);
console.log('Configuración combinada:', config);

// 6. Object.assign con métodos
console.log('\n--- Object.assign con métodos ---');
const comportamiento = {
  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  },
  despedirse() {
    console.log(`Adiós, soy ${this.nombre}`);
  }
};

const persona2 = { nombre: 'Carlos' };
Object.assign(persona2, comportamiento);

persona2.saludar();
persona2.despedirse();

// 7. Agregar métodos al prototipo con Object.assign
console.log('\n--- Agregar métodos al prototipo ---');
class Vehiculo {
  constructor(marca) {
    this.marca = marca;
  }
}

const metodosVehiculo = {
  arrancar() {
    console.log(`${this.marca} arrancando`);
  },
  detener() {
    console.log(`${this.marca} detenido`);
  }
};

Object.assign(Vehiculo.prototype, metodosVehiculo);

const coche = new Vehiculo('Toyota');
coche.arrancar();
coche.detener();

// 8. Object.assign para mixins
console.log('\n--- Object.assign para mixins ---');
const Volador = {
  volar() {
    console.log(`${this.nombre} está volando`);
  }
};

const Nadador = {
  nadar() {
    console.log(`${this.nombre} está nadando`);
  }
};

const Caminante = {
  caminar() {
    console.log(`${this.nombre} está caminando`);
  }
};

class Pato {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

Object.assign(Pato.prototype, Volador, Nadador, Caminante);

const pato = new Pato('Donald');
pato.volar();
pato.nadar();
pato.caminar();

// 9. Object.assign con propiedades anidadas (copia superficial)
console.log('\n--- Copia superficial con Object.assign ---');
const originalAnidado = {
  nombre: 'Juan',
  direccion: {
    ciudad: 'CDMX',
    pais: 'México'
  }
};

const clonAnidado = Object.assign({}, originalAnidado);
console.log('Clon anidado:', clonAnidado);

// Modificar propiedad anidada afecta al original (copia superficial)
clonAnidado.direccion.ciudad = 'Guadalajara';
console.log('Después de modificar clon:');
console.log('Original:', originalAnidado);
console.log('Clon:', clonAnidado);

// 10. Object.assign para valores por defecto
console.log('\n--- Object.assign para valores por defecto ---');
const defaults = {
  tema: 'claro',
  lenguaje: 'es',
  fontSize: 16,
  notificaciones: true
};

const configuracionUsuario = {
  tema: 'oscuro',
  fontSize: 20
};

const configFinal = Object.assign({}, defaults, configuracionUsuario);
console.log('Configuración final:', configFinal);

// 11. Object.assign para merge de configuraciones
console.log('\n--- Merge de configuraciones ---');
const configBase = {
  api: {
    url: 'https://api.example.com',
    timeout: 5000
  },
  ui: {
    tema: 'claro'
  }
};

const configPersonalizada = {
  api: {
    timeout: 10000
  },
  ui: {
    tema: 'oscuro',
    fontSize: 18
  }
};

const configMerged = Object.assign({}, configBase, configPersonalizada);
console.log('Configuración mergeada:', configMerged);
