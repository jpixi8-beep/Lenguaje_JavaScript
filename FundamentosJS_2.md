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

#### Métodos funcionales Arrays

##### For each en arrays

Funciona como un for pero es un método de los arrays.

```js
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((number) => {
  console.log(number);
});
```

Este puede recibir funciones flecha o funciones anónimas.

##### Map en arrays

Nos permite transformar un array en otro array con los mismos elementos pero con una operación aplicada a cada elemento.

```js
//Primer array
const numbers = [1, 2, 3, 4, 5];
//Segundo array con la operación aplicada
const doubled = numbers.map((number) => number * 2);//[2, 4, 6, 8, 10]
console.log(doubled);
```

##### Filter en arrays

Nos permite filtrar un array en base a una condición.

```js
//Primer array
const numbers = [1, 2, 3, 4, 5];
//Segundo array con la condición aplicada
const even = numbers.filter((number) => number % 2 === 0);//[2, 4]
console.log(even);
```

##### Reduce en arrays

Nos permite reducir un array a un solo valor.

```js
//Primer array
const numbers = [1, 2, 3, 4, 5];
//Segundo array con la reducción aplicada
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);//15
console.log(sum);
```

#### Manipulación de arrays

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

#### Ordenación de arrays

##### Sort (ordenación en arrays)

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

#### Búsqueda en arrays

##### included en arrays

```js
const numbers = [1, 2, 3, 4, 5];
const included = numbers.includes(3);
console.log(included);
// true
```

##### Find en arrays

Es una funcion que nos permite buscar un elemento en un array.

```js
const numbers = [1, 2, 3, 4, 5];
const found = numbers.find((number) => number === 3);
console.log(found);
// 3
```

##### Find Index en arrays

Es una funcion que nos permite buscar el índice de un elemento en un array.

```js
const numbers = [1, 2, 3, 4, 5];
const foundIndex = numbers.findIndex((number) => number === 3);
console.log(foundIndex);
// 2
```

### Sets Avanzados

Sirven para almacenar valores únicos.
Se pueden utilizar en operaciones de conjuntos.

#### Operaciones de conjuntos con Sets

##### Unión de conjuntos

Elimina duplicados entre dos sets.
Conserva los elementos únicos de ambos sets.

```js
const set1 = new Set([1, 2, 3]);
const set2 = new Set([3, 4, 5]);
const union = [...new Set([...set1, ...set2])];
console.log(union);
// [1, 2, 3, 4, 5]
```

##### Intersección de conjuntos

Encuentra los elementos que están presentes en ambos sets.

```js
const set1 = new Set([1, 2, 3]);
const set2 = new Set([3, 4, 5]);
const intersection = new Set([...set1].filter((x) => set2.has(x)));
console.log(intersection);
// [3]
```

##### Diferencia de conjuntos

Encuentra los elementos que están presentes en el primer set pero no en el segundo.

```js
const set1 = new Set([1, 2, 3]);
const set2 = new Set([3, 4, 5]);
const difference = new Set([...set1].filter((x) => !set2.has(x)));
console.log(difference);
// [1, 2]
```

### Iteraciones Set, Map

#### Foreach para recorrer Set

```js
const set = new Set([1, 2, 3]);
set.forEach((value) => console.log(value));
// 1
// 2
// 3
```

#### foreach para recorrer mapa

```js
const map = new Map([['a', 1], ['b', 2]]);
map.forEach((value, key) => console.log(key, value));
// a 1
// b 2
```

### Conversiones

#### Conversión de Set a array

Convertir un set a un array.

```js
const set = new Set([1, 2, 3]);
const array = [...set];
console.log(array);
// [1, 2, 3]
```

#### Mapa a array

Convertir un mapa a un array.

```js
const map = new Map([['a', 1], ['b', 2]]);
const array = [...map];
console.log(array);
// [['a', 1], ['b', 2]]
```

#### Mapa a objeto o diccionario

Convertir un mapa a un objeto.

```js
const map = new Map([['a', 1], ['b', 2]]);
const obj = Object.fromEntries(map);
console.log(obj);
// {a: 1, b: 2}
```

#### Objeto o diccionario a mapa

Convertir un objeto o diccionario a un mapa.

```js
const obj = {a: 1, b: 2};
const map = new Map(Object.entries(obj));
console.log(map);
// [['a', 1], ['b', 2]]
```

### Objetos Avanzados

#### Prototypes y herencia

##### Prototype

En JS los objetos tienen prototipos, que son objetos que contienen propiedades y métodos que se comparten entre todos los objetos de la misma clase.

Existe una propiedad llamada `__proto__` que permite acceder al prototipo de un objeto.

Ejemplo:

```js
const person = {
  name: 'Lechudevx', 
  age: 30,
  greet: function() {
    console.log('Hola, soy ' + this.name);
  }
};
console.log(person.__proto__);
// {}
console.log(Object.getPrototypeOf(person));
// {}
```

###### Prototype para agregar una nueva funcion o variable

```js
let person = {
  age: 3,
  greet() {
    console.log(`Hola, soy ${this.name}`);
  }
};

console.log(person.__proto__); // Muestra el prototipo base (Object)
console.log(Object.getPrototypeOf(person)); // Igual que arriba

person.sayAge = function () {
  console.log(`Tengo ${this.age} años`);
};

person.sayAge(); // Tengo 3 años

```

##### Herencia en JS

La herencia en JS se maneja en base a Prototipos  

Ejemplo:

```js
let Person={
  name: 'Lechudevx',
  age: 30,
  greet() {
    console.log(`Hola, soy ${this.name}`);
  }
}
//Herencia

let programador = Object.create(Person);

console.log(programador.name); // Lechudevx
console.log(programador.age); // 30
programador.greet(); // Hola, soy Lechudevx

```

#### Metodos estáticos y de Instancia

Los métodos de instancia son aquellos que se ejecutan sobre una instancia de un objeto, mientras que los métodos estáticos se ejecutan sobre la clase misma.

Ejemplo:

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  // Método de instancia
  greet() {
    console.log(`Hola, soy ${this.name}`);
  }
  // Método estático
  static getSpecies() {
    return 'Homo sapiens';
  }
}

const person = new Person('Lechudevx', 30);
person.greet(); // Hola, soy Lechudevx
console.log(Person.getSpecies()); // Homo sapiens
```

La diferencia principal es que los métodos estáticos se llaman directamente sobre la clase, mientras que los métodos de instancia se llaman sobre una instancia del objeto.

Con los prototipos funcionaban de la siguiente manera

```js
function Person (name, age){
  this.name=name;
  this.age=age;
  // Método estático
  this.getSpecies = function () {
    return 'Homo sapiens';
  }
}
// Método de instancia
Person.prototype.greet = function () {
  console.log(`Hola, soy ${this.name}`);
};

let person1 = new Person('Lechudevx', 30);
console.log(person1.name); // Lechudevx
console.log(person1.age); // 30
person1.greet(); // Hola, soy Lechudevx
console.log(person1.getSpecies()); // Homo sapiens
```

#### Metodos Avanzados

##### assign

assign funciona para combinar objetos

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const obj3 = Object.assign(obj1, obj2);
console.log(obj3); // { a: 1, b: 2, c: 3, d: 4 }
```

##### keys, values, entries

keys() devuelve un array con las claves del objeto
values() devuelve un array con los valores del objeto
entries() devuelve un array con las claves y valores del objeto

```js
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.keys(obj)); // [ 'a', 'b', 'c' ]
console.log(Object.values(obj)); // [ 1, 2, 3 ]
console.log(Object.entries(obj)); // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
```

### Clases Avanzadas

Las clases son la evolución de los pototipos por lo tanto tienen todas sus características como los metodos estáticos y de instancia.

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // Método de instancia
  greet() {
    console.log(`Hola, soy ${this.name}`);
  }
  
  // Método estático
  static getSpecies() {
    return 'Homo sapiens';
  }
}

let person1 = new Person('Lechudevx', 30);//Esto es una instancia de la clase Person
person1.greet(); // Hola, soy Lechudevx
console.log(Person.getSpecies()); // Homo sapiens

//Agregado de metodo a la instancia
person1.sayGoodbye = function() {
  console.log(`Adiós, soy ${this.name}`);
};

person1.sayGoodbye(); // Adiós, soy Lechudevx

```

#### Clases abstractas

Las clases abstractas son clases que no se pueden instanciar y se usan como base para otras clases.
Ejemplo:

```js
class Animal {
  constructor(name) {
    if (new.target === Animal) {
      throw new Error('No se puede instanciar una clase abstracta');
    }
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }
  
  speak() {
    console.log(`${this.name} barks`);
  }
}

let dog = new Dog('Rex');
dog.speak(); // Rex barks
```

#### Polimorfismo

El polimorfismo es la capacidad de un objeto para tomar muchas formas.
Permite reimplementar las funciones heredadas de la clase padre.
Ejemplo:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }
  
  speak() {
    console.log(`${this.name} barks`);
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
  }
  
  speak() {
    console.log(`${this.name} meows`);
  }
}

let dog = new Dog('Rex');
let cat = new Cat('Whiskers');

dog.speak(); // Rex barks
cat.speak(); // Whiskers meows
```

#### Mixins

Los mixins son una forma de compartir código entre clases.

Ejemplo:

```js
const Flyable = {
  fly() {
    console.log(`${this.name} is flying`);
  }
};

class Bird {
  constructor(name) {
    this.name = name;
  }
}

Object.assign(Bird.prototype, Flyable);

let bird = new Bird('Eagle');
bird.fly(); // Eagle is flying
```

#### Singleton

El patrón singleton es un patrón de diseño que asegura que una clase solo tenga una instancia.

Ejemplo:

```js
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}

let singleton1 = new Singleton();
let singleton2 = new Singleton();

console.log(singleton1 === singleton2); // true
```

#### Symbol

Los symbols son un tipo de dato primitivo que se utiliza para crear identificadores únicos.

```js
const sym1 = Symbol('key');
const sym2 = Symbol('key');

console.log(sym1 === sym2); // false
```

Anteriormente era utilizado para crear propiedades privada de una clase

ejemplo

```js
const _name = Symbol('name');

class Person {
  constructor(name) {
    this[_name] = name;
  }
  
  getName() {
    return this[_name];
  }
}

let person = new Person('John');
console.log(person.getName()); // John
```

#### instanceof

El operador `instanceof` se utiliza para verificar si un objeto es una instancia de una clase.

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

let person = new Person('John');
console.log(person instanceof Person); // true
```

#### create

El método `create` se utiliza para crear un nuevo objeto con un prototipo específico.

```js
let obj = Object.create(null);
console.log(obj); // {}
```

#### Proxy en js

El objeto Proxy en JavaScript se utiliza para definir comportamientos personalizados para operaciones fundamentales (por ejemplo, la búsqueda de propiedades, la asignación, la enumeración, la invocación de funciones, etc.).

```js
const handler = {
  get: function(obj, prop) {
    return prop in obj ? obj[prop] : 'No existe';
  }
};

const obj = new Proxy({}, handler);
console.log(obj.name); // No existe
```

## Asincronía en JS

Hace referencia a la capacidad de JavaScript para ejecutar tareas sin bloquear el hilo principal de ejecución.
En el navegador js utiliza un modelo de ejecución asincrónico basado en un bucle de eventos (event loop).

Localmente nodejs utiliza un modelo de ejecución asincrónico basado en un bucle de eventos (event loop).

### Event loop (Bucle de eventos)

El Event Loop en JavaScript es el mecanismo que permite que este lenguaje, a pesar de ser monohilo (single-threaded), pueda manejar operaciones asíncronas sin bloquear la ejecución del código.

El event loop trabaja con tres herramientas:

1. La pila de ejecución (call stack) es una estructura de datos que almacena las funciones que se están ejecutando, en un orden.

2. Web APIs: son las funciones que se ejecutan en el navegador, como setTimeout, fetch, etc.

3. Cola de mensajes o task queue (message queue): es una estructura de datos que almacena las funciones que se ejecutan cuando la pila de ejecución está vacía

Call Stack (Pila de llamadas)

Donde se ejecuta el código JavaScript de forma secuencial.
Funciona con el principio LIFO (Last In, First Out).

Web APIs / APIs del navegador

Funciones asíncronas como setTimeout, fetch, addEventListener se delegan al navegador o al entorno (Node.js) para ejecutarse fuera del hilo principal.

Callback Queue (Cola de tareas)

Cola donde se colocan las funciones listas para ejecutarse después de que las Web APIs terminen su trabajo.

Event Loop

Supervisa la Call Stack y la Callback Queue.
Si la pila está vacía, mueve la primera tarea de la cola a la pila para ejecutarla.

### Flujo de Event Loop

1. El código se ejecuta en la pila de ejecución (call stack)
2. Cuando una función asincrónica se ejecuta, se envía a las Web APIs o Node APIs
3. Cuando la función asincrónica termina, se envía a la cola de mensajes (task queue)
4. Cuando la pila de ejecución (call stack) está vacía, se envía la función de la cola de mensajes (task queue) a la pila de ejecución (call stack)
5. El proceso se repite

### Flujo simplificado

El código síncrono se ejecuta primero en la Call Stack.
Las tareas asíncronas se envían a las Web APIs.
Cuando terminan, sus callbacks van a la Callback Queue.
El Event Loop transfiere esas funciones a la Call Stack cuando está libre.

### Ejemplo práctico

```JS
Javascriptconsole.log("Inicio");

setTimeout(() => {
  console.log("Tarea asíncrona");
}, 0);

console.log("Fin");
Salida:
Inicio
Fin
Tarea asíncrona
```

> Explicación:

- "Inicio" se ejecuta inmediatamente.
- setTimeout se delega a las Web APIs y su callback va a la cola.
- "Fin" se ejecuta antes de que el Event Loop procese la cola.
- Finalmente, "Tarea asíncrona" se ejecuta cuando la pila está libre.

### Microtareas vs Macrotareas

> Macrotareas: setTimeout, setInterval, eventos de usuario.
> Microtareas: Promise.then, queueMicrotask, MutationObserver.

Las microtareas tienen prioridad sobre las macrotareas y se ejecutan justo después de que la pila queda vacía, antes de procesar la siguiente macrotarea.

Ejemplo:

```JS
console.log("A");

Promise.resolve().then(() => console.log("B"));

setTimeout(() => console.log("C"), 0);

console.log("D");

Salida:
A
D
B
C
```

> Explicación:

- "A" se ejecuta inmediatamente.
- La promesa se resuelve y su callback va a la cola de microtareas.
- setTimeout se delega a las Web APIs y su callback va a la cola de macrotareas.
- "D" se ejecuta antes de que el Event Loop procese las colas.
- Finalmente, "B" se ejecuta porque las microtareas tienen prioridad sobre las macrotareas.

### Código sincrono

Ejemplo de código sincrono

```js
console.log('Inicio');
console.log('Medio');
console.log('Fin');
```

### Código asíncrono

Ejemplo de código asíncrono

```js
console.log('Inicio');
setTimeout(() => {
  console.log('Medio');
}, 0);
console.log('Fin');
```

### Callbacks en el Event Loop

las call back podemos recordar que son funciones que se pasan como argumentos a otras funciones.
Y en el contexto del event loop, los callbacks son las funciones que se ejecutan cuando una tarea asíncrona termina.

ejemplo:

```js
setTimeout(() => {
  console.log('Tarea asíncrona');
}, 0);
```

setTimeout es una función que se ejecuta después de un tiempo determinado.

#### Callback hell

Es cuando tenemos callbacks anidados uno dentro de otro, lo que dificulta la lectura y mantenimiento del código.  

ejemplo:

```js
setTimeout(() => {
  console.log('Tarea 1');
  setTimeout(() => {
    console.log('Tarea 2');
    setTimeout(() => {
      console.log('Tarea 3');
    }, 0);
  }, 0);
}, 0);
```

Esto aunque suele verse problemático, es una forma de manejar la asincronía en JavaScript.
sin embargo con el tiempo se crearon mejores formas de manejar la asincronía como las promesas y async/await.
por lo cual esto debe de evitarse en el código moderno.

### Promesas

Las promesas son una forma de manejar la asincronía en JavaScript de manera más elegante que los callbacks.
el estado inicial de una promesa es "pending" (pendiente).
La promesa es una función tipo callback que recibe como parametro  lo que se va a hacer cuando se resuelve correctamente (resolve) y cuando no (reject).

Ejemplo:

```js
const promesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('Tarea asíncrona');
    } else {
      reject('Error');
    }
  }, 3000);
});

promesa.then((resultado) => {
  console.log(resultado);
}).catch((error) => {
  console.log(error);
}).finally(() => {
  console.log('Fin');
});
```

-promesa.then() - se ejecuta cuando la promesa se resuelve correctamente
-promesa.catch() - se ejecuta cuando la promesa se rechaza
-promesa.finally() - se ejecuta independientemente de si la promesa se resuelve o rechaza

### Encadenamiento de Promesas

```js
function step1promise(){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Tarea 1');
    }, 1000);
  });
}
function step2promise(){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Tarea 2');
    }, 1000);
  });
}
function step3promise(){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Tarea 3');
    }, 1000);
  });
}

step1promise()
.then(step2promise)
.then(step3promise)
.then(() => {
  console.log('Todas las tareas se completaron');
});
```

### Promesas con async/await

async/await es una forma de manejar la asincronía en JavaScript de manera más elegante que las promesas.
Ejemplo:

```js
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function process() {
  console.log("Inicio del proceso")

  await wait(5000)
  console.log("Proceso después de 5 segundos")

  await wait(1000)
  console.log("Proceso después de 1 segundo")

  await wait(2000)
  console.log("Proceso después de 2 segundos")

  console.log("Fin del proceso")
}

process()

```

#### Promise.all()

Se utiliza para ejecutar todas las promesas al mismo tiempo.

ejemplo:

```js
const promise1 = new Promise(resolve => setTimeout(() => resolve('Promesa 1'), 1000));
const promise2 = new Promise(resolve => setTimeout(() => resolve('Promesa 2'), 2000));
const promise3 = new Promise(resolve => setTimeout(() => resolve('Promesa 3'), 3000));

Promise.all([promise1, promise2, promise3]).then(values => {
  console.log(values);
});
```

## APIs

Una API (Interfaz de Programación de Aplicaciones) es un conjunto de reglas y protocolos que permite que diferentes aplicaciones de software se comuniquen e intercambien datos de manera segura y eficiente.

### Tipos de API

- Privadas: Solo accesibles dentro de una empresa.
- Para partners: Disponibles únicamente para socios autorizados.
- Públicas: Abiertas a cualquier desarrollador para crear aplicaciones o servicios que interactúen con ellas

### Cómo Funcionan

El funcionamiento básico de una API se basa en un modelo cliente-servidor:

- El cliente (la aplicación que solicita información) envía una solicitud a la API.
- El servidor (la aplicación que proporciona la información) procesa la solicitud y devuelve una respuesta con los datos o resultados requeridos

Por ejemplo, al pedir un taxi mediante una app, la aplicación envía una solicitud a la API del servicio de pagos del banco, que responde confirmando la transacción

### Beneficios

- Facilita la integración de servicios y aplicaciones sin necesidad de desarrollar todo desde cero.
- Permite compartir solo la información necesaria, manteniendo la seguridad de los sistemas.
- Acelera el desarrollo de nuevas aplicaciones y mejora la interoperabilidad entre plataformas

## APIs REST full (http + URLs + JSON)

Una API REST (Interfaz de Programación de Aplicaciones basada en Transferencia de Estado Representacional) es un tipo de API que sigue los principios arquitectónicos de REST. Este estilo fue definido por Roy Fielding en el año 2000 y se utiliza para facilitar la comunicación entre sistemas distribuidos, como aplicaciones web, servicios y bases de datos.

Las API REST son ampliamente utilizadas debido a su flexibilidad, escalabilidad y eficiencia. Permiten a los desarrolladores construir interfaces ligeras para el intercambio de datos entre aplicaciones, utilizando estándares como HTTP y formatos como JSON o XML.

### Principios clave de REST

- Interfaz uniforme: Todas las solicitudes para un recurso deben tener el mismo formato, utilizando identificadores únicos (URI = Uniform Resource Identifier) o URLs (Uniform Resource Locator). Esto asegura consistencia y simplicidad.

- Desacoplamiento cliente-servidor: El cliente y el servidor son independientes, lo que permite que evolucionen por separado.

- Sin estado: Cada solicitud debe contener toda la información necesaria, ya que el servidor no almacena el estado de las interacciones previas.

- Capacidad de almacenamiento en caché: Los recursos pueden ser almacenados en caché para mejorar el rendimiento y reducir la carga en el servidor.

- Sistema por capas: Las solicitudes y respuestas pueden pasar por múltiples capas intermedias, como servidores proxy o de seguridad.

- Código bajo demanda (opcional): En algunos casos, el servidor puede enviar código ejecutable al cliente para extender su funcionalidad.

### Funcionamiento de una API REST Metodos HTTP

Las API REST utilizan métodos HTTP estándar para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar). Por ejemplo:

- GET: Recupera recursos.

- POST: Crea nuevos recursos.

- PUT: Actualiza recursos existentes.

- DELETE: Elimina recursos.

Las solicitudes incluyen encabezados y parámetros que especifican detalles como el formato de datos (JSON, XML) y la autenticación. Las respuestas contienen códigos de estado HTTP (como 200 para éxito o 404 para recurso no encontrado) y los datos solicitados.

### Códigos de respuesta HTTP

Los códigos de respuesta HTTP son números de tres dígitos que indican el estado de una solicitud realizada a un servidor. Se agrupan en cinco categorías principales:

1xx (Informativos): Indican que la solicitud ha sido recibida y se está procesando.
2xx (Éxito): Indican que la solicitud fue exitosa (ej. 200 OK).
3xx (Redirección): Indican que se requiere una acción adicional para completar la solicitud (ej. 301 Moved Permanently).
4xx (Errores del cliente): Indican que hubo un error en la solicitud (ej. 404 Not Found).
5xx (Errores del servidor): Indican que el servidor falló al procesar una solicitud válida (ej. 500 Internal Server Error)

- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

### Método GET

// Consumir una API

```javascript
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => {
    // Transforma la respuesta a JSON
    return response.json()
  })
  .then(data => {
    // Procesa los datos
    console.log(data)
  })
  .catch(error => {
    // Captura errores
    console.log("Error", error)
  })
```

- fetch(): Es una función global que se utiliza para realizar solicitudes HTTP. Retorna una promesa que se resuelve con la respuesta de la solicitud.

// Consumir API con uso de Async/Await

```javascript
async function fetchPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error", error);
  }
}
```

### Método POST

// Enviar datos a una API

```javascript
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Mi post",
    body: "Contenido del post",
    userId: 1,
  }),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log("Error", error))
```

// De manera Asíncrona

```javascript
async function createPost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Mi post",
        body: "Contenido del post",
        userId: 1,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error", error);
  }
}
```

### Método PUT

- **Objetivo:** Actualizar un recurso **completo** en el servidor.  
- **Diferencia con POST:** POST crea, PUT reemplaza.  
- **Ejemplo:**

```javascript
// Actualizar un post completo
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: 1,
    title: "Post actualizado",
    body: "Contenido reemplazado",
    userId: 1,
  }),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log("Error", error));
```

// De manera Asíncrona

```javascript
async function updatePost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        title: "Post actualizado",
        body: "Contenido reemplazado",
        userId: 1,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error", error);
  }
}
```

 Aquí el recurso con `id:1` se **reemplaza totalmente** por lo que mandes en el `body`.

### Método PATCH

- **Objetivo:** Actualizar un recurso **parcialmente**.  
- **Diferencia con PUT:** PUT reemplaza todo, PATCH solo modifica lo que indiques.  
- **Ejemplo:**

```javascript
// Actualizar solo el título del post
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Título modificado",
  }),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log("Error", error));
```

👉 Aquí el `body` del post no se toca, solo cambia el `title`.

// De manera Asíncrona

```javascript
async function updatePost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Título modificado",
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error", error);
  }
}
```

### Método DELETE

- **Objetivo:** Eliminar un recurso del servidor.
- **Ejemplo:**

```javascript
// Eliminar un post
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE",
})
  .then(response => {
    if (response.ok) {
      console.log("Post eliminado");
    }
  })
  .catch(error => console.log("Error", error));
```

 No necesitas `body`, solo la URL con el recurso a borrar.

// De manera Asíncrona

```javascript
async function deletePost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("Post eliminado");
    }
  } catch (error) {
    console.log("Error", error);
  }
}
```

### Beneficios de las API REST

- Escalabilidad: Gracias a su diseño sin estado y al uso de caché, las API REST pueden manejar grandes volúmenes de tráfico.

- Flexibilidad: Permiten el uso de diferentes lenguajes de programación y tecnologías en cliente y servidor.

- Independencia tecnológica: Los cambios en una parte del sistema no afectan a las demás.

Las API REST son esenciales en arquitecturas modernas como microservicios y son ampliamente adoptadas en aplicaciones web y móviles debido a su simplicidad y eficiencia.

## Autenticación mediante API Key, Tokens, JWT

Esto sirve para proteger las API y evitar que cualquier persona pueda acceder a ellas.
De esta manera, solo las personas con la clave API pueden acceder a la API.
Esta clave se puede generar en el servidor y se puede usar para autenticar las peticiones.

Ejemplo:

```javascript
async function getWeather(city) {
    const apiKey = "c88acfa434a9b31f5b13be82910fc27a0d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("Error", error);
    }
}

getWeather("Madrid");
```

Esta API requiere que el usuario esté registrado y suscrito para poder crear una api key, con la cual puede hacer peticiones al servidor.

### Otros metodos de aAutenticació y Autorización

- BearerTokens
- JWT (JSON Web Tokens)

JWT (JSON Web Tokens) son un estándar abierto que define un formato compacto y seguro para la transferencia de claims entre dos partes. Los tokens JWT se utilizan comúnmente para autenticación y comunicación de información entre partes.

Ejemplo:

```javascript
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
```

## Versionado de APIS

El versionado de APIs es una práctica que permite gestionar cambios en las interfaces de programación de aplicaciones (APIs) de manera controlada y segura. Permite que los desarrolladores puedan actualizar y mejorar las APIs sin romper la compatibilidad con las aplicaciones existentes.

Ejemplo:

```javascript
const apiVersion = "v1";
const url = `https://api.example.com/${apiVersion}/users`;
```

## Uso del DOM

El DOM (Document Object Model) es una API que permite manipular el contenido de una página web.
Ejemplo:

```javascript
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

### Selección de Elementos

Java Script cuenta con distintas maneras de seleccionar los elementos del DOM estas pueden ser por clase, id, y mas modernamente con queryselector

Ejemplos:

```javascript
//Formas Clásicas (Selector HTML)
// - Por ID
const h1 = document.getElementById('titulo');
// - Por Class
const h1 = document.getElementsByClassName('titulo');
//Formas modernas (selector CSS)
// - Por QuerySelector
const h1 = document.querySelector('.titulo');
const h1 = document.querySelectorAll('.titulo');
```

### Manipulacion de elementos

Una vez seleccionados los elementos estos pueden tener diferentes funciones, operaciones, o procesos para ser manipulados o a los que pueden ser sometido dependiendo de el tipo de etiqueta que son y los atributos que maneje.

Ejemplo:

```javascript
// Manipulación de elementos

// Primero seleccionamos el elemento
const h1 = document.querySelector('h1');

// Luego lo manipulamos
h1.style.color = 'red';
h1.textContent = 'Hola, mundo!';

// Otros ejemplos
const title = document.getElementById("title")
title.textContent = "Hola JavaScript"

const container = document.querySelector(".container")
container.innerHTML = "<p>Esto es un nuevo párrafo</p>"

```

### Manipulación de atributos

Para manipular los atributos de una etiqueta u objeto en el DOM odemos utilizar

- `.getAttribute()` para obtener el valor de un atributo
- `.setAttribute()` para establecer el valor de un atributo
- `.hasAttribute()` para verificar si un atributo existe
- `.removeAttribute()` para eliminar un atributo

Ejemplo:

```javascript
const img = document.querySelector('img');
img.getAttribute('src'); // Obtiene el valor del atributo src
img.setAttribute('src', 'nueva-imagen.jpg'); // Establece el valor del atributo src
img.hasAttribute('alt'); // Verifica si el atributo alt existe
img.removeAttribute('alt'); // Elimina el atributo alt
```

### Interacción con clases CSS

Para interactuar con las clases CSS de un elemento en el DOM podemos utilizar

- `.classList.add()` para agregar una clase
- `.classList.remove()` para eliminar una clase
- `.classList.toggle()` para alternar una clase
- `.classList.contains()` para verificar si una clase existe
- `.classList.replace()` para reemplazar una clase

Ejemplo:

```javascript
const h1 = document.querySelector('.titulos');
h1.classList.add('titulo-destacado'); // Agrega la clase titulo-destacado
h1.classList.remove('titulo-destacado'); // Elimina la clase titulo-destacado
h1.classList.toggle('titulo-destacado'); // Alterna la clase titulo-destacado
h1.classList.contains('titulo-destacado'); // Verifica si la clase titulo-destacado existe
h1.classList.replace('titulo-destacado', 'titulo-secundario'); // Reemplaza la clase titulo-destacado por titulo-secundario

const button = document.querySelector("button")
button.style.backgroundColor = "blue"
button.style.color = "white"
button.style.padding = "10px"

```

### Creación y eliminación de elementos

Para crear elementos en el DOM podemos utilizar

- `.createElement()` para crear un elemento
- `.appendChild()` para agregar un elemento al final de un elemento
- `.removeChild()` para eliminar un elemento
- `.remove()` para eliminar un elemento

Ejemplo:

```javascript
// Crear un div
const div = document.createElement('div');
div.textContent = 'Hola, mundo!';
// Estilo css
div.style.backgroundColor = "blue"
div.style.color = "white"
div.style.padding = "10px"
// Agregar el div al body
document.body.appendChild(div);

// Eliminar el botón
const button = document.querySelector("button")
button.remove()
```

#### Inserción en un lugar concreto

```javascript
const secondItem = itemsList.children[1]
itemsList.insertBefore(newItem, secondItem)

// Otras formas de insertar
itemsList.append(newItem)      // al final de la lista
itemsList.prepend(newItem)     // al inicio de la lista
secondItem.before(newItem)     // justo antes del segundo elemento
secondItem.after(newItem)      // justo después del segundo elemento

```

#### Eliminación

```javascript
// Eliminación directa
newParagraph.remove()

// Eliminación tradicional
const parent = newParagraph.parentElement
parent.removeChild(newParagraph)
```

### Eventos del DOM

Los eventos son acciones que ocurren en el DOM, como clics, hover, teclas presionadas, etc.
Todos los elementos del DOM tienen eventos disponibles.

```javascript
// Función que se ejecutará cuando se produzca el evento
function showMsg() {
    alert("Clic!");
}

const sendButton = document.querySelector("#send");
sendButton.addEventListener("click", showMsg);

sendButton.addEventListener("click", () => {
    alert("Clic con una arrow function!");
});

// Eventos comunes

document.addEventListener("DOMContentLoaded", () => {
    console.log("El DOM está completamente cargado");
});

sendButton.addEventListener("mouseenter", () => {
    sendButton.style.backgroundColor = "green";
});

sendButton.addEventListener("mouseleave", () => {
    sendButton.style.backgroundColor = "blue";
});

// Evento en formulario
const form = document.querySelector('form')
form.addEvenListener("submit",(event)=>{
    event.preventDefault()
    console.log("Formulario enviado")
})
```

### Acceso al DOM desde el HTML

Teniendo un documento HTML con su estructura básica, contamos con la etiqueta `<script>`, la cual nos permite interactuar con el **DOM** mediante el uso de **JavaScript**.

Ejemplo:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Mi página web</title>
    <style>
      /* Estilo inicial del botón */
      #miBoton {
        background-color: blue;
        color: white;
        padding: 10px 20px;
        border: none;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <button id="miBoton">Haz clic aquí</button>

    <script>
      // Seleccionamos el botón
      const boton = document.querySelector("#miBoton");

      // Evento cuando el mouse entra
      boton.addEventListener("mouseenter", () => {
        boton.style.backgroundColor = "green";
      });

      // Evento cuando el mouse sale
      boton.addEventListener("mouseleave", () => {
        boton.style.backgroundColor = "blue";
      });
    </script>
  </body>
</html>
```

Para evitar que el archivo principal crezca puedes referenciar tu ficheros JS o Script

Ejemplo:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Mi página web</title>
  </head>
  <body>
    <button id="miBoton">Haz clic aquí</button>

    <script src="script.js"></script>
  </body>
</html>
```

```js
// script.js
const boton = document.querySelector("#miBoton");

boton.addEventListener("mouseenter", () => {
  boton.style.backgroundColor = "green";
});

boton.addEventListener("mouseleave", () => {
  boton.style.backgroundColor = "blue";
});
```
