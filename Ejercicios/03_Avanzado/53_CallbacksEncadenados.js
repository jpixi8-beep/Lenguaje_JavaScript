// Ejercicio 53: Callbacks encadenados
// Tema: Callbacks encadenados (task1, task2, task3)

// 1. Tres funciones con callbacks (cada una tarda 1 segundo)
function task1(callback) {
  setTimeout(() => {
    console.log('Task 1 completada');
    callback();
  }, 1000);
}

function task2(callback) {
  setTimeout(() => {
    console.log('Task 2 completada');
    callback();
  }, 1000);
}

function task3(callback) {
  setTimeout(() => {
    console.log('Task 3 completada');
    callback();
  }, 1000);
}

// 2. Ejecutar las tareas en orden con callbacks encadenados
console.log('--- Ejecución secuencial con callbacks ---');
console.log('Iniciando tareas...');

task1(() => {
  task2(() => {
    task3(() => {
      console.log('¡Todas las tareas completadas!');
    });
  });
});

// 3. Versión con paso de datos entre callbacks
console.log('\n--- Callbacks con paso de datos ---');
function taskWithData1(data, callback) {
  setTimeout(() => {
    const resultado = data + 10;
    console.log(`Task 1: ${data} + 10 = ${resultado}`);
    callback(resultado);
  }, 1000);
}

function taskWithData2(data, callback) {
  setTimeout(() => {
    const resultado = data * 2;
    console.log(`Task 2: ${data} * 2 = ${resultado}`);
    callback(resultado);
  }, 1000);
}

function taskWithData3(data, callback) {
  setTimeout(() => {
    const resultado = data - 5;
    console.log(`Task 3: ${data} - 5 = ${resultado}`);
    callback(resultado);
  }, 1000);
}

taskWithData1(5, (resultado1) => {
  taskWithData2(resultado1, (resultado2) => {
    taskWithData3(resultado2, (resultadoFinal) => {
      console.log(`Resultado final: ${resultadoFinal}`);
    });
  });
});

// 4. Versión con manejo de errores
console.log('\n--- Callbacks con manejo de errores ---');
function taskWithError(mayFail, callback) {
  setTimeout(() => {
    if (mayFail) {
      callback(new Error('La tarea falló'), null);
    } else {
      callback(null, 'Tarea exitosa');
    }
  }, 1000);
}

taskWithError(false, (error, resultado) => {
  if (error) {
    console.log('Error:', error.message);
  } else {
    console.log('Éxito:', resultado);
    taskWithError(true, (error2, resultado2) => {
      if (error2) {
        console.log('Error en segunda tarea:', error2.message);
      } else {
        console.log('Éxito en segunda tarea:', resultado2);
      }
    });
  }
});

// 5. Versión con contador de progreso
console.log('\n--- Callbacks con contador de progreso ---');
function taskConNumero(numero, callback) {
  setTimeout(() => {
    console.log(`Task ${numero} completada`);
    callback(numero);
  }, 1000);
}

let tareasCompletadas = 0;

function ejecutarTareasSecuenciales() {
  taskConNumero(1, () => {
    tareasCompletadas++;
    console.log(`Progreso: ${tareasCompletadas}/3`);
    
    taskConNumero(2, () => {
      tareasCompletadas++;
      console.log(`Progreso: ${tareasCompletadas}/3`);
      
      taskConNumero(3, () => {
        tareasCompletadas++;
        console.log(`Progreso: ${tareasCompletadas}/3`);
        console.log('¡Secuencia completada!');
      });
    });
  });
}

ejecutarTareasSecuenciales();
