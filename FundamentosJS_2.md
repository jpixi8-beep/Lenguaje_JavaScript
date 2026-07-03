# Fundamentos JS - Parte 2

## Funciones Avanzadas

### Ciudadanos de primera clase

Son entidades que pueden ser  tratados como valores, es decir, pueden ser asignados a variables, pasados como argumentos a funciones, retornados desde funciones, etc.

#### Características

- Pueden ser asignados a variables
- Pueden ser pasados como argumentos a funciones
- Pueden ser retornados desde funciones
- Pueden ser almacenados en estructuras de datos

Pueden ser Variables, Funciones, estructuras de datos, como objetos, arrays, etc.

Hablando de funciones;

- De esta manera una función es asignada a una variable

```js
// Variables
const name = 'Lechudevx';
// Función anónima asignada a una variable
const greet = function(name) {
  console.log('Hello ' + name);
}
//Puede ser llamada usando la variable
greet(name);//Hello Lechudevx
```

- De esta manera es pasada como argumento a otra función

```js
// Función que recibe otra función como argumento
function executeFunction(fn) {//Como parametro puede ser renombrada
  fn();
}

// Función que será pasada como argumento
function sayHello() {
  console.log('Hello!');
}

// Pasando la función como argumento
executeFunction(sayHello);//Hello!
```

- De esta manera es retornada desde otra función

```js
// Función que retorna otra función
function createGreeting() {
  return function(name) {
    console.log('Hello ' + name);
  }
}

// Asignando la función retornada a una variable
const greet = createGreeting();
greet('Lechudevx');//Hello Lechudevx
```

- De esta manera es almacenada en una estructura de datos

```js
// Array de funciones
const functions = [
  function() {
    console.log('Hello!');
  },
  function() {
    console.log('World!');
  }
];

// Llamando a las funciones del array
functions[0]();//Hello!
functions[1]();//World!
```

### Arrow functions

```js
// Función tradicional
function greet(name) {
  console.log('Hello ' + name);
}

// Arrow function
const greetArrow = (name) => {
  console.log('Hello ' + name);
}

// Arrow function con return implícito
const add = (a, b) => a + b;

// Arrow function con return implícito y paréntesis
const addArrow2 = (a, b) => {
    a + b;
};

```

### - this Léxico (scope-alcance)

El `this` en las funciones es diferente para las funciones tradicionales y las arrow functions.

- En funciones tradicionales, `this` se refiere al objeto que llama a la función.
- En arrow functions, `this` se refiere al contexto donde se define la función.

con función normal

```js
name = 'Global';
const obj = {
  name: 'Lechudevx',
  greet: function() {
    //con function() el this se refiere al objeto
    console.log('Hello ' + this.name);
  }
}

obj.greet();//Hello Lechudevx
```

con arrow function

```js
name = 'Global';
const obj = {
  name: 'Lechudevx',
  greet: () => {
    //con arrow function el this se refiere al contexto global
    console.log('Hello ' + this.name);//Hello Global
  }
}

obj.greet();//Hello Global
```

### IIFE (Immediately Invoked Function Expression)

Son funciones que se ejecutan inmediatamente después de ser definidas.
Deben de ir dentro de paréntesis para que sea una expresión válida, seguida de otros paréntesis que la invocan, como si fuera una función normal.
Igual que las funciones flecha, no tienen nombre, y crean su propio contexto de ejecución.

```js
(function() {
  console.log('Hello World');
})();
```

Suele ser necesario que estas estén delimitadas por ; para evitar problemas de parsing que es cuando el intérprete de JavaScript no puede determinar dónde termina una instrucción y comienza otra.

### Parametros rest (...)

Los parámetros rest permiten que una función acepte un número variable de argumentos.
Se representan con tres puntos (...) seguidos del nombre del parámetro.
Ejemplo:

```js
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(10, 20)); // 30
console.log(sum()); // 0
```

### Operador de propagación (Spread Operator) (...)

Los operadores de propagación permiten expandir elementos de un array o objeto en otro array o objeto.
Se representan con tres puntos (...) seguidos del nombre del array o objeto.
Ejemplo:

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [...arr1, ...arr2];
console.log(arr3); // [1, 2, 3, 4, 5, 6]
```

### Clausuras - Closures

Las clausuras son funciones que tienen acceso a variables de su función padre, incluso después de que la función padre haya terminado de ejecutarse.
Ejemplo:

```js
function outer() {
  let count = 0;
  return function() {// Esta funcion accede a la variable count de la funcion outer
    count++;
    return count;
  }
}

const inner = outer();
console.log(inner()); // 1
console.log(inner()); // 2
console.log(inner()); // 3
```

### Funciones recursivas

Las funciones recursivas son funciones que se llaman a sí mismas.
Ejemplo:

```js
function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

Siempre se debe definir una condición de parada para evitar que la función se llame a sí misma indefinidamente.

### Funciones parciales

Las funciones parciales son funciones que se crean a partir de otras funciones, pero con algunos de sus parámetros predefinidos.
Ejemplo:

```js
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);//bind asigna el valor 2 a b
console.log(double(5)); // 10
```

En este caso, la función `double` es una función parcial que multiplica un número `a` por 2 porque el parámetro `b` ya está predefinido con el valor 2.  

Ejemplo2:

```js
function add(a) {
  return function(b,c) {
    return a + b + c;
  };
}

const add1 = add(5); //a = 5
console.log(add1(3,2)); // b = 3, c = 2, resultado = (5 + 3 + 2) = 10
```

### Currying

El currying es una técnica de programación funcional que consiste en convertir una función que recibe múltiples argumentos en una secuencia de funciones que reciben un solo argumento.
Ejemplo:

```js
function add(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
//Forma 1
const add1 = add(5); //a = 5
console.log(add1(3)(2)); // b = 3, c = 2, resultado = (5 + 3 + 2) = 10

//Forma 2
const add2 = add(5)(3);
console.log(add2(2)); // b = 3, c = 2, resultado = (5 + 3 + 2) = 10

//Forma 3
const add3 = add(5)(3)(2); // a = 5, b = 3, c = 2, resultado = (5 + 3 + 2) = 10

```

### Callbacks

Los callbacks son funciones que se pasan como argumentos a otras funciones y se ejecutan después de que la función principal haya terminado de ejecutarse.
Ejemplo:

```js
// Función que suma números
function sum(...numbers) {
  let result = 0;
  for (let number of numbers) {
    result += number;
  }
  return result;
}

// Función que recibe un array de números y un callback
function prossesdata(data, callback) {
  //console.log(sum(...data));
  const result = sum(...data);
  callback(result);
  //El callback es la función que se ejecuta después de que la función principal haya terminado de ejecutarse en este caso showdata, showdata2, etc. el retorno de la función sum se pasa como argumento al callback
  //Es como si fuera un return pero en este caso se ejecuta la función callback con el resultado de la función sum
}

// Función que recibe el resultado de la suma y lo muestra en consola 
//data es el parámetro que recibe el callback
function showdata(data) {
  console.log(data);
}
function showdata2(data) {
  console.log(`Resultado: ${data}`);
}

prossesdata([2, 3, 8], showdata);
prossesdata([1, 2, 3, 4, 5], showdata2);
// Función anónima
prossesdata([10, 20, 30], (data) => console.log(`Suma total: ${data}`));
// Función flecha con return implícito
prossesdata([100, 200], data => console.log(`Suma total: ${data}`));
```

Este tema es importante para la asincronía en JavaScript.

## Estructuras Avanzadas

### Arrays Avanzados

### Métodos funcionales

#### For each

Funciona como un for pero es un método de los arrays.

```js
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((number) => {
  console.log(number);
});
```

Este puede recibir funciones flecha o funciones anónimas.

#### Map

Nos permite transformar un array en otro array con los mismos elementos pero con una operación aplicada a cada elemento.

```js
//Primer array
const numbers = [1, 2, 3, 4, 5];
//Segundo array con la operación aplicada
const doubled = numbers.map((number) => number * 2);//[2, 4, 6, 8, 10]
console.log(doubled);
```

#### Filter

Nos permite filtrar un array en base a una condición.

```js
//Primer array
const numbers = [1, 2, 3, 4, 5];
//Segundo array con la condición aplicada
const even = numbers.filter((number) => number % 2 === 0);//[2, 4]
console.log(even);
```

#### Reduce

Nos permite reducir un array a un solo valor.

```js
//Primer array
const numbers = [1, 2, 3, 4, 5];
//Segundo array con la reducción aplicada
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);//15
console.log(sum);
```

### Manipulación de arrays

#### Flat

Es una funcion que nos permite aplanar arrays anidados. o des anidar.

```js
const numbers = [1, [2, [3, [4]]]];
const flat1 = numbers.flat(3);
console.log(flat1);
// [1, 2, 3, 4]
const flat2 = numbers.flat(2);
console.log(flat2);
// [1, 2, 3, [4]]
const flat3 = numbers.flat(1);
console.log(flat3);
// [1, 2, [3, [4]]]
```

#### Flat Map

Es una funcion que nos permite aplanar arrays anidados y transformarlos en otro array bajo una operación como la funcion Map.

```js
const numbers = [1, [2, [3, [4]]]];
const flatMap = numbers.flatMap((number) => number * 2);
console.log(flatMap);
// [2, 4, 6, 8]
```

### Ordenación de arrays

#### Sort (ordenación)

Es una funcion que nos permite ordenar un array.

Por defecto ordena de forma ascendente, pero podemos pasarle una funcion de comparación para ordenar de forma descendente.

```js
const numbers = [5, 4, 3, 2, 1];
//Forma ascendente
const sorted = numbers.sort((a, b) => a - b);
console.log(sorted);
// [1, 2, 3, 4, 5]
//Forma descendente
const sortedDesc = numbers.sort((a, b) => b - a);
console.log(sortedDesc);
// [5, 4, 3, 2, 1]

```

### Búsqueda en arrays

#### included

```js
const numbers = [1, 2, 3, 4, 5];
const included = numbers.includes(3);
console.log(included);
// true
```

#### Find

Es una funcion que nos permite buscar un elemento en un array.

```js
const numbers = [1, 2, 3, 4, 5];
const found = numbers.find((number) => number === 3);
console.log(found);
// 3
```

#### Find Index

Es una funcion que nos permite buscar el índice de un elemento en un array.

```js
const numbers = [1, 2, 3, 4, 5];
const foundIndex = numbers.findIndex((number) => number === 3);
console.log(foundIndex);
// 2
```






## Uso del DOM

El DOM (Document Object Model) es una API que permite manipular el contenido de una página web.
Ejemplo:

```js
const h1 = document.createElement('h1');
h1.textContent = 'Hola, mundo!';
document.body.appendChild(h1);
```

Este código crea un elemento h1, le agrega el texto "Hola, mundo!" y lo agrega al body de la página web.
suponiendo que el HTML sea

```html
<html>
  <head>
    <title>Mi página web</title>
  </head>
  <body>
  </body>
</html>
```

  Ojo: el archivo original en disco no cambia, lo que cambia es el DOM en memoria del navegador. Si guardas el HTML y lo abres en un editor, seguirá vacío; pero al abrirlo en el navegador con el script, se verá el `<h1>` porque el DOM se modificó dinámicamente.

El DOM es una API que permite manipular el contenido de una página web.
