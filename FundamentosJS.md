## Fundamentos de JS

Fue creado en 1993 por Brendan Eich.

En ese entonces la web era totalmente estática. JavaScript fue creado con la idea de hacer más interactivos los sitios web.

Su implementación estándar se llama ECMAScript, que es el lenguaje predeterminado en todos los navegadores web.
Se puede ejecutar en un navegador igual que el lenguaje WebAssembly.
También se puede ejecutar en el escritorio o en un servidor gracias a herramientas como Node.js o Deno.

JavaScript es un lenguaje de scripting.
> Un script es un conjunto de instrucciones escritas en un lenguaje de programación que se ejecutan de manera secuencial para realizar tareas específicas.

Puede ser ejecutado sobre la marcha desde la consola del navegador.

Es un lenguaje interpretado; es decir, no requiere ser compilado a código máquina, solo requiere una interpretación.
Esto es realizado por el JS Engine, un motor de interpretación de código que viene incluido en todos los navegadores.
Utiliza un proceso de compilación justo a tiempo, o por sus siglas en inglés JIT (just in time).

## Uso de JS

Aparte de poder ser ingresado desde la consola de un navegador, JS puede ser utilizado desde el código HTML de una página con la etiqueta `<script>`.
También podemos referenciar un documento con extensión `.js` usando el atributo `src`.

HTML

~~~html
<html>
  <head></head>
  <body>
    <script src="ejemplo.js"></script>
  </body>
</html>
~~~

Script

~~~js
console.log('hi mom!');
~~~

## Variables y Constantes: Tipado, Tipos de datos

### Tipado dinámico

Las variables son espacion en memoria que pueden cambiar su valor durante la ejecucion del programa. 

Ejemplo:

~~~js
let numero = 42;
let texto = 'Hola';
let verdadero = true;
numero = 13;
var name = 'jorge';
~~~

### Tipos de datos primitivos

JS maneja 7 tipos de datos primitivos:

- String
- Number
- BigInt
- Boolean
- Undefined
- Symbol
- Null

Ejemplo:

~~~js
let numRandom;
console.log(numRandom);//Undefinied
numRandom = null;
numRandom = 23;
numRandom ='23';
~~~

Cualquier dato no primitivo hereda de la clase objeto 

~~~js
numRandom = new Object();
~~~

Los `;` no son obligatoros ya que en una fase de la interpretacn JIT se hace un analisis de sintaxis dondeestos son agregados de manera automatica

~~~js
let numRandom
numRandom = "Hola Mundo"
~~~

### Constantes (const)

Se utilizan para asignar espacion en memoria el cual no cambia su valor durante la ejecucion de un programa.

~~~js
const saludo = "Hola Mundo"
~~~

### Entorno lexico, Ambito Local y Global

Las variables pueden ser declaradas como let o como var 
Esto depende de que alcance quieres que tenga la variable.
Las variables pueden ser; 
- Globales 
Accesibles desde cualquier parte del código
- Locales
Accesibles desde son creadas

Ejemplo 

~~~js
let a = 'global'

function fun (){
    let a = 'localfunction';
    //bloque
    if(true){
        let a = 'localblock';
        var b = 'hoisted';//var puede ser accedida desde afuera del bloque a eso se le llama hoisting

    }
}
~~~

## Operadores

### Operadores aritméticos

Se usan para realizar cálculos matemáticos.

~~~js
let a = 10;
let b = 3;

console.log(a + b); // 13
console.log(a - b); // 7
console.log(a * b); // 30
console.log(a / b); // 3.333...
console.log(a % b); // 1
console.log(a ** b); // 1000
~~~

### Operadores lógicos

Sirven para combinar comparaciones o condiciones.

~~~js
let tienePermiso = true;
let esAdmin = false;

console.log(tienePermiso && esAdmin); // false
console.log(tienePermiso || esAdmin); // true
console.log(!tienePermiso); // false
~~~

También se pueden usar con comparaciones:

~~~js
let edad = 20;
console.log(edad >= 18 && edad < 65); // true
~~~

## Condicionales y bucles

### Condicional IF / IF ELSE

Permiten ejecutar un bloque de código si una condición es verdadera.

~~~js
let edad = 17;

if (edad >= 18) {
  console.log('Eres mayor de edad');
} else {
  console.log('Eres menor de edad');
}
~~~

También puedes usar `else if` para varias opciones.

~~~js
let nota = 8;

if (nota >= 9) {
  console.log('Excelente');
} else if (nota >= 7) {
  console.log('Aprobado');
} else {
  console.log('Reprobado');
}
~~~

### switch

Es útil cuando tienes muchas opciones posibles sobre una misma variable.

~~~js
let dia = 'viernes';

switch (dia) {
  case 'lunes':
    console.log('Inicio de semana');
    break;
  case 'viernes':
    console.log('Ya casi es fin de semana');
    break;
  default:
    console.log('Día no identificado');
}
~~~

### Ciclo For

Se usa cuando sabes cuántas veces quieres repetir una acción.

~~~js
for (let i = 1; i <= 5; i++) {
  console.log('Iteración:', i);
}
~~~

### Ciclo while

Se repite mientras una condición sea verdadera.

~~~js
let contador = 1;

while (contador <= 5) {
  console.log('While:', contador);
  contador++;
}
~~~

### Ciclo do while

Primero ejecuta el bloque y luego evalúa la condición.

~~~js
let numero = 0;

 do {
  console.log('Do While:', numero);
  numero++;
} while (numero < 3);
~~~

## Funciones

Una función es un bloque de código reutilizable que realiza una tarea específica.

### Definición de función

- Se declaran con la palabra `function`
- Pueden recibir parámetros
- Pueden regresar un valor con `return`

~~~js
function sumar(a, b) {
  return a + b;
}

console.log(sumar(4, 6)); // 10
~~~

### Función como expresión

JavaScript permite guardar funciones en variables.

~~~js
const restar = function (a, b) {
  return a - b;
};

console.log(restar(10, 4)); // 6
~~~

### Funciones flecha (Arrow functions)

Son una forma más corta de escribir funciones.

~~~js
const multiplicar = (a, b) => a * b;

console.log(multiplicar(3, 5)); // 15
~~~

### Parámetros y retorno

Puedes pasar datos a una función y devolver un resultado.

~~~js
function saludar(nombre) {
  return 'Hola, ' + nombre + '!';
}

console.log(saludar('Carlos'));
~~~

### Funciones anidadas

Una función puede devolver otra función.

~~~js
function crearContador() {
  let valor = 0;

  return function () {
    valor++;
    return valor;
  };
}

const contador = crearContador();
console.log(contador()); // 1
console.log(contador()); // 2
~~~
