// Ejercicio 54: Promesa básica
// Tema: Promesas (verificar número par/impar)

// 1. Función que retorna una promesa para verificar un número
function verificarNumero(numero) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (numero % 2 === 0) {
        resolve('Número par');
      } else {
        reject('Número impar');
      }
    }, 500);
  });
}

// 2. Usar la promesa con then/catch
console.log('--- Ejemplo 1: Número par ---');
verificarNumero(4)
  .then((mensaje) => {
    console.log('Éxito:', mensaje);
  })
  .catch((error) => {
    console.log('Error:', error);
  });

console.log('\n--- Ejemplo 2: Número impar ---');
verificarNumero(7)
  .then((mensaje) => {
    console.log('Éxito:', mensaje);
  })
  .catch((error) => {
    console.log('Error:', error);
  });

// 3. Múltiples verificaciones
console.log('\n--- Ejemplo 3: Múltiples verificaciones ---');
const numeros = [2, 3, 4, 5, 6];

numeros.forEach((num) => {
  verificarNumero(num)
    .then((mensaje) => console.log(`${num}: ${mensaje}`))
    .catch((error) => console.log(`${num}: ${error}`));
});

// 4. Promesa con valor de retorno
console.log('\n--- Ejemplo 4: Promesa con valor de retorno ---');
function verificarNumeroConValor(numero) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (numero % 2 === 0) {
        resolve({
          numero: numero,
          resultado: 'par',
          mensaje: `El número ${numero} es par`
        });
      } else {
        reject({
          numero: numero,
          resultado: 'impar',
          mensaje: `El número ${numero} es impar`
        });
      }
    }, 500);
  });
}

verificarNumeroConValor(8)
  .then((data) => {
    console.log('Resuelto:', data);
  })
  .catch((error) => {
    console.log('Rechazado:', error);
  });

// 5. Promesa con validación adicional
console.log('\n--- Ejemplo 5: Promesa con validación ---');
function verificarNumeroValidado(numero) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof numero !== 'number' || isNaN(numero)) {
        reject('Error: No es un número válido');
      } else if (numero % 2 === 0) {
        resolve(`El número ${numero} es par`);
      } else {
        reject(`El número ${numero} es impar`);
      }
    }, 500);
  });
}

verificarNumeroValidado(10)
  .then((mensaje) => console.log(mensaje))
  .catch((error) => console.log(error));

verificarNumeroValidado('hola')
  .then((mensaje) => console.log(mensaje))
  .catch((error) => console.log(error));

// 6. Promesa encadenada
console.log('\n--- Ejemplo 6: Promesa encadenada ---');
verificarNumero(12)
  .then((mensaje) => {
    console.log('Primer then:', mensaje);
    return 'Continuando...';
  })
  .then((mensaje) => {
    console.log('Segundo then:', mensaje);
    return verificarNumero(15);
  })
  .then((mensaje) => {
    console.log('Tercer then (no debería ejecutarse):', mensaje);
  })
  .catch((error) => {
    console.log('Catch:', error);
  });

// 7. Promesa con finally
console.log('\n--- Ejemplo 7: Promesa con finally ---');
verificarNumero(20)
  .then((mensaje) => {
    console.log('Éxito:', mensaje);
  })
  .catch((error) => {
    console.log('Error:', error);
  })
  .finally(() => {
    console.log('La promesa se completó (finally)');
  });
