// Ejercicio 55: Promesas encadenadas
// Tema: Promesas encadenadas (firstTask, secondTask, thirdTask)

// 1. Tres funciones que devuelven promesas con diferentes tiempos
function firstTask() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Primera tarea completada');
      resolve('Primera tarea completada');
    }, 1000);
  });
}

function secondTask() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Segunda tarea completada');
      resolve('Segunda tarea completada');
    }, 2000);
  });
}

function thirdTask() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Tercera tarea completada');
      resolve('Tercera tarea completada');
    }, 1500);
  });
}

// 2. Ejecutar las tareas en orden con promesas encadenadas
console.log('--- Ejecución secuencial con promesas ---');
console.log('Iniciando tareas...');

firstTask()
  .then((resultado1) => {
    console.log('Resultado 1:', resultado1);
    return secondTask();
  })
  .then((resultado2) => {
    console.log('Resultado 2:', resultado2);
    return thirdTask();
  })
  .then((resultado3) => {
    console.log('Resultado 3:', resultado3);
    console.log('¡Todas las tareas completadas!');
  })
  .catch((error) => {
    console.log('Error:', error);
  });

// 3. Versión con paso de datos entre promesas
console.log('\n--- Promesas con paso de datos ---');
function task1Data() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const resultado = 10;
      console.log(`Task 1: Generó ${resultado}`);
      resolve(resultado);
    }, 1000);
  });
}

function task2Data(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const resultado = data * 2;
      console.log(`Task 2: ${data} * 2 = ${resultado}`);
      resolve(resultado);
    }, 1000);
  });
}

function task3Data(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const resultado = data + 5;
      console.log(`Task 3: ${data} + 5 = ${resultado}`);
      resolve(resultado);
    }, 1000);
  });
}

task1Data()
  .then((data1) => task2Data(data1))
  .then((data2) => task3Data(data2))
  .then((final) => {
    console.log(`Resultado final: ${final}`);
  });

// 4. Versión con manejo de errores
console.log('\n--- Promesas con manejo de errores ---');
function taskWithDelay(mensaje, delay, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Error en: ${mensaje}`));
      } else {
        resolve(mensaje);
      }
    }, delay);
  });
}

taskWithDelay('Tarea A', 1000)
  .then((result) => {
    console.log(result);
    return taskWithDelay('Tarea B', 1000);
  })
  .then((result) => {
    console.log(result);
    return taskWithDelay('Tarea C', 1000, true); // Esta fallará
  })
  .then((result) => {
    console.log(result); // No se ejecutará
  })
  .catch((error) => {
    console.log('Capturado:', error.message);
  });

// 5. Promesas en paralelo con Promise.all
console.log('\n--- Promise.all (paralelo) ---');
const promesa1 = new Promise((resolve) => setTimeout(() => resolve('Tarea 1'), 1000));
const promesa2 = new Promise((resolve) => setTimeout(() => resolve('Tarea 2'), 1500));
const promesa3 = new Promise((resolve) => setTimeout(() => resolve('Tarea 3'), 500));

Promise.all([promesa1, promesa2, promesa3])
  .then((resultados) => {
    console.log('Todas completadas:', resultados);
  });

// 6. Promise.race (la primera que termine)
console.log('\n--- Promise.race ---');
const race1 = new Promise((resolve) => setTimeout(() => resolve('Rápido'), 500));
const race2 = new Promise((resolve) => setTimeout(() => resolve('Lento'), 2000));
const race3 = new Promise((resolve) => setTimeout(() => resolve('Medio'), 1000));

Promise.race([race1, race2, race3])
  .then((resultado) => {
    console.log('La primera en terminar:', resultado);
  });

// 7. Promise.allSettled (todas se completan, sin importar éxito/error)
console.log('\n--- Promise.allSettled ---');
const settled1 = Promise.resolve('Éxito 1');
const settled2 = Promise.reject(new Error('Fallo 2'));
const settled3 = Promise.resolve('Éxito 3');

Promise.allSettled([settled1, settled2, settled3])
  .then((resultados) => {
    console.log('Resultados:', resultados);
  });
