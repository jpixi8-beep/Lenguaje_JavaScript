// Ejercicio 56: Async/await
// Tema: Async/await (executeTasks)

// 1. Tres funciones que devuelven promesas (del ejercicio anterior)
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

// 2. Función async/await que ejecuta las tareas en orden
async function executeTasks() {
  console.log('--- Ejecución con async/await ---');
  console.log('Iniciando tareas...');
  
  try {
    const resultado1 = await firstTask();
    console.log('Resultado 1:', resultado1);
    
    const resultado2 = await secondTask();
    console.log('Resultado 2:', resultado2);
    
    const resultado3 = await thirdTask();
    console.log('Resultado 3:', resultado3);
    
    console.log('¡Todas las tareas completadas!');
  } catch (error) {
    console.log('Error:', error);
  }
}

executeTasks();

// 3. Versión con paso de datos entre tareas
console.log('\n--- Async/await con paso de datos ---');
async function task1Data() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const resultado = 10;
      console.log(`Task 1: Generó ${resultado}`);
      resolve(resultado);
    }, 1000);
  });
}

async function task2Data(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const resultado = data * 2;
      console.log(`Task 2: ${data} * 2 = ${resultado}`);
      resolve(resultado);
    }, 1000);
  });
}

async function task3Data(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const resultado = data + 5;
      console.log(`Task 3: ${data} + 5 = ${resultado}`);
      resolve(resultado);
    }, 1000);
  });
}

async function executeTasksWithData() {
  try {
    const data1 = await task1Data();
    const data2 = await task2Data(data1);
    const data3 = await task3Data(data2);
    console.log(`Resultado final: ${data3}`);
  } catch (error) {
    console.log('Error:', error);
  }
}

executeTasksWithData();

// 4. Ejecución en paralelo con Promise.all y async/await
console.log('\n--- Async/await con Promise.all ---');
async function executeParallelTasks() {
  console.log('Iniciando tareas en paralelo...');
  
  const [result1, result2, result3] = await Promise.all([
    firstTask(),
    secondTask(),
    thirdTask()
  ]);
  
  console.log('Resultados:', result1, result2, result3);
}

setTimeout(executeParallelTasks, 6000);

// 5. Async/await con Promise.race
console.log('\n--- Async/await con Promise.race ---');
async function executeRaceTasks() {
  const race1 = new Promise((resolve) => setTimeout(() => resolve('Rápido'), 500));
  const race2 = new Promise((resolve) => setTimeout(() => resolve('Lento'), 2000));
  const race3 = new Promise((resolve) => setTimeout(() => resolve('Medio'), 1000));
  
  const resultado = await Promise.race([race1, race2, race3]);
  console.log('La primera en terminar:', resultado);
}

setTimeout(executeRaceTasks, 12000);

// 6. Async/await con múltiples await en una línea
console.log('\n--- Múltiples await ---');
async function multipleAwait() {
  const promesa1 = new Promise((resolve) => setTimeout(() => resolve('A'), 500));
  const promesa2 = new Promise((resolve) => setTimeout(() => resolve('B'), 500));
  const promesa3 = new Promise((resolve) => setTimeout(() => resolve('C'), 500));
  
  // Se ejecutan en paralelo porque no dependen una de otra
  const [a, b, c] = await Promise.all([promesa1, promesa2, promesa3]);
  console.log('Resultados simultáneos:', a, b, c);
}

setTimeout(multipleAwait, 14000);
