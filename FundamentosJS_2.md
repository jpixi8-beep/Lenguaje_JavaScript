# Fundamentos JS - Parte 2

## Funciones Avanzadas

### Ciudadanos de primera clase

Son entidades que pueden ser  tratados como valores, es decir, pueden ser asignados a variables, pasados como argumentos a funciones, retornados desde funciones, etc.

### Características

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

```js
(function() {
  console.log('Hello World');
})();
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
