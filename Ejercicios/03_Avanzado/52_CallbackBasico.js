// Ejercicio 52: Callback básico
// Tema: Callbacks

// 1. Función para saludar con callback
function saludar(nombre, callback) {
  console.log(`Iniciando saludo para ${nombre}...`);
  
  // Ejecutar callback después de 2 segundos
  setTimeout(() => {
    callback(nombre);
  }, 2000);
}

// 2. Usar la función con callback
console.log('--- Ejemplo 1: Callback básico ---');
saludar('Juan', (nombre) => {
  console.log(`Hola, ${nombre}`);
});

// 3. Callback con múltiples operaciones
console.log('\n--- Ejemplo 2: Callback con operaciones ---');
function procesarDatos(datos, callback) {
  console.log('Procesando datos...');
  
  setTimeout(() => {
    const resultado = datos.map((d) => d * 2);
    callback(resultado);
  }, 1500);
}

const numeros = [1, 2, 3, 4, 5];
procesarDatos(numeros, (resultado) => {
  console.log('Datos procesados:', resultado);
});

// 4. Callback con error handling
console.log('\n--- Ejemplo 3: Callback con error handling ---');
function dividir(a, b, callback) {
  setTimeout(() => {
    if (b === 0) {
      callback(new Error('No se puede dividir entre 0'), null);
    } else {
      callback(null, a / b);
    }
  }, 1000);
}

dividir(10, 2, (error, resultado) => {
  if (error) {
    console.log('Error:', error.message);
  } else {
    console.log('Resultado:', resultado);
  }
});

dividir(10, 0, (error, resultado) => {
  if (error) {
    console.log('Error:', error.message);
  } else {
    console.log('Resultado:', resultado);
  }
});

// 5. Callback encadenado manual
console.log('\n--- Ejemplo 4: Callback encadenado ---');
function paso1(callback) {
  setTimeout(() => {
    console.log('Paso 1 completado');
    callback();
  }, 500);
}

function paso2(callback) {
  setTimeout(() => {
    console.log('Paso 2 completado');
    callback();
  }, 500);
}

function paso3(callback) {
  setTimeout(() => {
    console.log('Paso 3 completado');
    callback();
  }, 500);
}

paso1(() => {
  paso2(() => {
    paso3(() => {
      console.log('Todos los pasos completados');
    });
  });
});
