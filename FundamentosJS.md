# Fundamentos de Java Script (JS) Bases Del Lenguaje

## Qué es JS?

Fue creado en 1993 por Brendan Eich.

En ese entonces la web era totalmente estática. JavaScript fue creado con la idea de hacer más interactivos los sitios web.

Su implementación estándar se llama **ECMAScript**, que es el **lenguaje predeterminado en todos los navegadores web**.
Se puede ejecutar en un navegador igual que el lenguaje WebAssembly.
También se puede ejecutar en el escritorio o en un servidor gracias a herramientas como Node.js o Deno.

JavaScript es un lenguaje de scripting.
> Un script es un conjunto de instrucciones escritas en un lenguaje de programación que se ejecutan de manera secuencial para realizar tareas específicas.

Puede ser ejecutado sobre la marcha desde la consola del navegador.

Es un lenguaje interpretado; es decir, no requiere ser compilado a código máquina, solo requiere una interpretación.
Esto es realizado por el JS Engine, un motor de interpretación de código que viene incluido en todos los navegadores.
Utiliza un proceso de compilación justo a tiempo, o por sus siglas en inglés JIT (just in time).

## Historia de JS

| **Año**              | **Suceso**                                                                                                                                                                                                                                                                                                                                     |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1995**             | Brendan Eich crea JavaScript en Netscape, inicialmente llamado *Mocha* y luego *LiveScript*. Finalmente se renombra como **JavaScript** para aprovechar la popularidad de Java.  [Luis Llamas](https://www.luisllamas.es/historia-y-evolucion-de-javascript/)                                                                                  |
| **1996**             | Microsoft lanza **JScript** en Internet Explorer, lo que genera incompatibilidades y la necesidad de un estándar.  [Luis Llamas](https://www.luisllamas.es/historia-y-evolucion-de-javascript/)                                                                                                                                                |
| **1997**             | Se publica el primer estándar **ECMAScript 1** por ECMA International, estableciendo las bases del lenguaje.  [lineadetiempo.top](https://lineadetiempo.top/linea-del-tiempo-de-javascript/)                                                                                                                                                   |
| **1999–2000**        | Llega **ECMAScript 3**, con mejoras como expresiones regulares, manejo de excepciones y manipulación avanzada de cadenas.  [lineadetiempo.top](https://lineadetiempo.top/linea-del-tiempo-de-javascript/)                                                                                                                                      |
| **2004**             | Surge **AJAX**, revolucionando la web al permitir aplicaciones dinámicas sin recargar la página.  [esquemasde.com](https://esquemasde.com/historia-de-javascript/)                                                                                                                                                                             |
| **2009**             | Se lanza **ECMAScript 5**, con *strict mode* y métodos modernos como `Array.map()` y `Object.keys()`. Ese mismo año Ryan Dahl crea **Node.js**, llevando JavaScript al servidor.  [lineadetiempo.top](https://lineadetiempo.top/linea-del-tiempo-de-javascript/)  [Luis Llamas](https://www.luisllamas.es/historia-y-evolucion-de-javascript/) |
| **2010 en adelante** | Aparecen frameworks como **AngularJS, React y Vue.js**, que transforman el desarrollo web.  [esquemasde.com](https://esquemasde.com/historia-de-javascript/)                                                                                                                                                                                   |
| **2015**             | Se publica **ECMAScript 6 (ES6)**, con grandes novedades: clases, módulos, arrow functions, promesas, destructuring, etc.  [lineadetiempo.top](https://lineadetiempo.top/linea-del-tiempo-de-javascript/)                                                                                                                                      |
| **2016–2019**        | Versiones **ES7–ES10**, añadiendo async/await, operadores modernos y mejoras en arrays y objetos.  [lineadetiempo.top](https://lineadetiempo.top/linea-del-tiempo-de-javascript/)                                                                                                                                                              |
| **2021–2022**        | Nuevas versiones anuales de ECMAScript, consolidando la evolución continua del lenguaje.  [lineadetiempo.top](https://lineadetiempo.top/linea-del-tiempo-de-javascript/)                                                                                                                                                                       |

## EcmaScript

Es un estándar de lenguaje de programación que define la sintaxis, semántica y características de los lenguajes de programación basados en ECMAScript, como JavaScript.
El estándar es mantenido por ECMA International, una organización que se encarga de desarrollar y promover estándares de tecnología de la información y las comunicaciones.
Tabla de Version y año de publicación de ECMAScript:

| **Versión**       | **Año de publicación** | **Lo más significativo**                                  |
| ----------------- | ---------------------- | --------------------------------------------------------- |
| **ES1**           | 1997                   | Primer estándar oficial del lenguaje                      |
| **ES2**           | 1998                   | Ajustes menores para compatibilidad                       |
| **ES3**           | 1999                   | Expresiones regulares y manejo de excepciones             |
| **ES4**           | *Cancelada* (2008)     | Demasiado ambiciosa, nunca publicada                      |
| **ES5**           | 2009                   | Strict mode y métodos modernos de arrays                  |
| **ES6 (ES2015)**  | 2015                   | Clases, módulos, arrow functions, promesas                |
| **ES7 (ES2016)**  | 2016                   | ``includes()`` en arrays y operador exponenciación ``**`` |
| **ES8 (ES2017)**  | 2017                   | ``async/await`` y mejoras en objetos                      |
| **ES9 (ES2018)**  | 2018                   | Rest/spread en objetos y ``Promise.finally()``            |
| **ES10 (ES2019)** | 2019                   | ``flat()``, ``flatMap()`` y ``Object.fromEntries()``      |
| **ES11 (ES2020)** | 2020                   | Nullish coalescing ``??`` y optional chaining ``?.``      |
| **ES12 (ES2021)** | 2021                   | ``replaceAll()``, operadores lógicos de asignación        |
| **ES13 (ES2022)** | 2022                   | Top-level await y mejoras en clases                       |
| **ES14 (ES2023)** | 2023                   | Nuevas funciones de arrays y mejoras en regex             |
| **ES15 (ES2024)** | 2024                   | Optimizaciones de rendimiento y sintaxis más clara        |
| **ES16 (ES2025)** | 2025                   | Mejoras en módulos y soporte extendido para tipado        |

## Uso de JS

JS es un lenguaje de programación que se utiliza principalmente para crear contenido dinámico en páginas web, como animaciones, formularios interactivos, juegos y aplicaciones web. También se puede utilizar para desarrollar aplicaciones móviles y de escritorio.

JS es un **lenguaje interpretado**, lo que significa que no necesita ser compilado antes de ejecutarse. Esto permite a los desarrolladores escribir y probar código rápidamente, desde la consola del navegador o desde un editor de texto.

**Su interprete es** el motor de JS, que se encarga de ejecutar el código y convertirlo en instrucciones que la computadora pueda entender.

En el navegador suele ser el motor **V8 de Google Chrome**, SpiderMonkey de Mozilla Firefox, Chakra de Microsoft Edge o JavaScriptCore de Safari.

En el servidor JS puede ser ejecutado con **Node.js,** que utiliza el motor **V8 de Google Chrome** para ejecutar código JavaScript fuera del navegador.

> Otras alternativas para ejecutar JS en el servidor son Deno, Bun y JXcore.

JS puede ser utilizado desde el código HTML de una página con la etiqueta `<script>`.
También podemos referenciar un documento con extensión `.js` usando el atributo `src`.

HTML

```html
<html>
  <head></head>
  <body>
    <script src="ejemplo.js"></script>
  </body>
</html>
```

Script

```js
console.log('hi mom!');
```

JS es un lenguaje **Multi-paradigma**, lo que significa que soporta diferentes estilos de programación, como la programación orientada a objetos, la programación funcional y la programación imperativa.

Es **multu-propósito**, lo que significa que puede ser utilizado para desarrollar aplicaciones web, móviles, de escritorio y de servidor.

## Node.js

Node.js es un entorno de ejecución de JavaScript que permite ejecutar código JS fuera del navegador, en el servidor o en la línea de comandos.

Para instalar Node.js en Linux, puedes utilizar el administrador de paquetes de tu distribución o descargar el instalador desde la página oficial.

```bash
# Download and install nvm: que es un gestor de versiones de Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash

# in lieu of restarting the shell: carga nvm en la sesión actual
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js: Descarga e instala la versión 26 de Node.js
nvm install 26

# Verify the Node.js version: Verifica la versión de Node.js instalada
node -v # Should print "v26.4.0".

# Verify npm version: Verifica la versión de npm instalada
npm -v # Should print "11.17.0".
```

Esto instalará la última versión de Node.js y npm (el administrador de paquetes de Node.js) en tu sistema.

nvm (Node Version Manager) es una herramienta que permite instalar y gestionar múltiples versiones de Node.js en un mismo sistema, lo que facilita la compatibilidad con diferentes proyectos.

npm (Node Package Manager) es una herramienta que permite instalar y gestionar paquetes de código JavaScript, como librerías y frameworks, que pueden ser utilizados en tus proyectos.

Ambos son herramientas muy útiles para el desarrollo de aplicaciones con Node.js y JavaScript en general.
Existen alternativas a npm como **yarn** y **pnpm**, que ofrecen características adicionales y mejoras de rendimiento.
y alternativas a nvm como **fnm** y **n** que ofrecen características adicionales y mejoras de rendimiento.

### Primeros pasos con Node.js

La forma más sencilla de ejecutar código JS con Node.js es crear un archivo con extensión `.js` y ejecutarlo desde la terminal.

`ejemplo.js`

Para ejecutar el archivo, abre la terminal y navega hasta la carpeta donde se encuentra el archivo y ejecuta el siguiente comando:

```bash
node ejemplo.js
```

## Variables y Constantes: Tipado dinámico  y Variables (let, var)

### Tipado dinámico y Variables (let, var)

Las variables son espacion en memoria que pueden cambiar su valor durante la ejecucion del programa.
Estas pueden ser declaradas con `let` o `var` y pueden contener cualquier tipo de dato, lo que se conoce como tipado dinámico.

Ejemplo:

```js
let numero = 42;
let texto = 'Hola';
let verdadero = true;
numero = 13;
var name = 'jorge';
```

Para saber el tipo de dato que es una variable podemos usar el operador `typeof`.

```js
console.log(typeof numero); // number
console.log(typeof texto); // string
console.log(typeof verdadero); // boolean
console.log(typeof name); // string
```

Las variables declaradas con `var` tienen un alcance global o de función, mientras que las variables declaradas con `let` tienen un alcance de bloque.

### Constantes (const)

Se utilizan para asignar espacion en memoria el cual no cambia su valor durante la ejecucion de un programa.

```js
const saludo = "Hola Mundo"
```

## Entorno lexico/Ambito Local y Global

Las variables pueden ser declaradas como let o como var
Esto depende de que alcance quieres que tenga la variable.
Las variables pueden ser;

- Globales
Accesibles desde cualquier parte del código
- Locales
Accesibles desde son creadas

Ejemplo

```js
let a = 'global'

function fun (){
    let a = 'localfunction';
    //bloque
    if(true){
        let a = 'localblock';
        var b = 'hoisted';//var puede ser accedida desde afuera del bloque a eso se le llama hoisting

    }
}
```

## Tipos de datos primitivos y no primitivos

JS maneja 7 tipos de datos primitivos:

- String
- Number
- BigInt
- Boolean
- Undefined
- Symbol Valor unico e inmutable
- Null

Los datos primitivos funcionan en la memoria stack, lo que los hace más rápidos de acceder y manipular.

Ejemplo:

```js
let variable1 ='23';//variable1 = Cadena
let variable2 = 23;//variable2 = Numerico
let variable3 = BigInt(9999999999999999999999999999999999);//variable2 = Numero muy garde
let variable3_2 = 99999999999999999999999999999999999999n;//Forma 2 de Numero muy garde
let variable4 = true;
variable4 = false;// variable4 = Boolean
let variable5;
console.log(var5);//variable1 = Undefinied/Indefinida
let variable6 = Symbol("👌")= ;//Symbol 
let variable7 = null;//Variable6 = Sin valor
```

Cualquier dato no primitivo hereda de la clase objeto

```js
numRandom = new Object();
```

Los `;` no son obligatorios ya que en una fase de la interpretacn JIT se hace un analisis de sintaxis dondeestos son agregados de manera automatica

```js
let numRandom
numRandom = "Hola Mundo"
```

Entre los datos no primitivos tenemos los objetos, arrays, funciones, etc.
Estos funcionan en la memoria heap, lo que los hace más lentos de acceder y manipular pero permiten almacenar estructuras de datos más complejas.

## Objetos

Un objeto (tipo de dato no primitivo) es una colección de propiedades, donde cada propiedad es una asociación entre un nombre (clave) y un valor.
Los objetos pueden contener cualquier tipo de dato, incluyendo otros objetos, funciones, etc.
en el formato par clave-valor, lo que los hace muy flexibles para representar datos complejos.

Ejemplo:

```js
let persona = {
  nombre: 'Juan',
  edad: 30,
  esEstudiante: true,
  direccion: {
    calle: 'Calle Falsa',
    numero: 123
  },
  saludar: function() {
    console.log('Hola, soy ' + this.nombre);//por punto
    console.log('Hola, soy ' + persona['nombre']);//por corchete
  }
  CambiarValor: function(nuevoNombre) {
    //por punto
    this.nombre = nuevoNombre;
    //por corchete
    persona['nombre'] = nuevoNombre;
  }
};
```

Perfecto, vamos a hacer una **mini‑guía completa sobre objetos en JavaScript** con ejemplos prácticos.  

---

### Crear y acceder a propiedades

```js
// Crear objeto
let persona = {
  nombre: "Ana",
  edad: 25
};

// Acceder con punto
console.log(persona.nombre); // "Ana"

// Acceder con corchetes
console.log(persona["edad"]); // 25
```

---

### Agregar nuevas propiedades

```js
persona.apellido = "García";
persona["profesion"] = "Ingeniera";

console.log(persona);
// { nombre: "Ana", edad: 25, apellido: "García", profesion: "Ingeniera" }
```

---

### Cambiar propiedades

```js
persona.edad = 26;
console.log(persona.edad); // 26
```

---

### Eliminar propiedades

```js
delete persona.profesion;
console.log(persona);
// { nombre: "Ana", edad: 26, apellido: "García" }
```

---

### Formas de iterar propiedades

```js
let coche = { marca: "Toyota", modelo: "Corolla", año: 2020 };

// for...in
for (let clave in coche) {
  console.log(clave, coche[clave]);
}

// Object.keys()
Object.keys(coche).forEach(clave => console.log(clave));

// Object.values()
Object.values(coche).forEach(valor => console.log(valor));

// Object.entries()
Object.entries(coche).forEach(([clave, valor]) => console.log(clave, valor));
```

---

### Métodos o funciones dentro de objetos

Se llaman **métodos** porque son funciones asociadas a un objeto.

```js
let calculadora = {
  sumar: function(a, b) {
    return a + b;
  },
  restar(a, b) {
    return a - b; // sintaxis corta
  }
};

console.log(calculadora.sumar(5, 3)); // 8
console.log(calculadora.restar(10, 4)); // 6
```

---

### Objetos anidados

```js
let usuario = {
  nombre: "Luis",
  direccion: {
    ciudad: "CDMX",
    calle: "Av. Reforma",
    numero: 123
  },
  contacto: {
    email: "luis@mail.com",
    telefono: "555-1234"
  }
};

// Acceder a propiedades anidadas
console.log(usuario.direccion.ciudad); // "CDMX"
console.log(usuario.contacto.email);   // "luis@mail.com"
```

### Acceder a propiedades desde adentro de un objeto con this

Excelente tema 👌. En JavaScript, cuando tienes **funciones dentro de objetos**, puedes acceder a las propiedades del mismo objeto usando la palabra clave **`this`**.  

---

#### ¿Qué es `this`?

- Dentro de un **método** (función dentro de un objeto), `this` hace referencia al **objeto actual**.  
- Permite acceder a sus propiedades y otros métodos.  

---

#### Ejemplo 1: Acceder a propiedades con `this`

```js
let persona = {
  nombre: "Ana",
  edad: 25,
  saludar: function() {
    console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
  }
};

persona.saludar();
// Hola, soy Ana y tengo 25 años.
```

👉 Aquí `this.nombre` y `this.edad` acceden a las propiedades del mismo objeto.

---

#### Ejemplo 2: Cambiar propiedades desde un método

```js
let coche = {
  marca: "Toyota",
  modelo: "Corolla",
  año: 2020,
  actualizarAño: function(nuevoAño) {
    this.año = nuevoAño;
  }
};

coche.actualizarAño(2025);
console.log(coche.año); // 2025
```

👉 El método usa `this.año` para modificar la propiedad interna.

---

#### Ejemplo 3: Objetos anidados y `this`

```js
let usuario = {
  nombre: "Luis",
  direccion: {
    ciudad: "CDMX",
    mostrarCiudad: function() {
      console.log(`Vivo en ${this.ciudad}`);
    }
  }
};

usuario.direccion.mostrarCiudad();
// Vivo en CDMX
```

👉 Aquí `this.ciudad` funciona dentro del objeto anidado `direccion`.

### Funciones constructora Deberia ser una clase

Son funciones que se utilizan para crear objetos y se invocan con la palabra clave `new

```js
function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
  this.saludar = function() {
    console.log('Hola, soy ' + this.nombre);
  };
}
const persona1 = new Persona('Ana', 25);
persona1.saludar(); // Hola, soy Ana
const persona2 = new Persona('Luis', 30);
persona2.saludar(); // Hola, soy Luis
```

## Colecciones o Arrays

Un array es un tipo de dato no primitivo que representa una lista ordenada de elementos.
Los arrays pueden contener cualquier tipo de dato, incluyendo otros arrays, objetos, funciones, etc.
Ejemplo:

```js
let numeros = [1, 2, 3, 4, 5];
let mezclado = [1, 'dos', true, { clave: 'valor' }, [6, 7, 8]];
//Imprimir
console.log(numeros[0]); // 1
console.log(mezclado[3].clave); // valor
console.log(mezclado[4][0]); // 6
//Tipo de dato typeof devuelve object para arrays
console.log(typeof numeros); // object
console.log(typeof mezclado); // object
//Longitud del array
console.log(numeros.length); // 5
```

### Metodos comunes

En JavaScript, los métodos **`push()`** y **`pop()`** sirven para manejar arrays como si fueran pilas (stack):  

- **`push()`** ➝ agrega un elemento al **final** del array.  
- **`pop()`** ➝ elimina el **último** elemento del array y lo devuelve.

- **`unshift()`** ➝ agrega elementos al **inicio** del array.  
- **`shift()`** ➝ elimina el **primer** elemento del array y lo devuelve.  

#### Ejemplo push y pop

```js
let numeros = [1, 2, 3];

// Agregar al final
numeros.push(4);
numeros.push(5);

console.log(numeros); 
// [1, 2, 3, 4, 5]

// Quitar el último
let eliminado = numeros.pop();

console.log("Número eliminado:", eliminado); 
// 5
console.log(numeros); 
// [1, 2, 3, 4]
```

#### Ejemplo unshift y shift

```js
let colores = ["rojo", "verde", "azul"];

// Agregar al inicio con unshift()
colores.unshift("amarillo");
console.log(colores);
// ["amarillo", "rojo", "verde", "azul"]

// Quitar el primer elemento con shift()
let eliminado = colores.shift();
console.log("Se eliminó:", eliminado);
// Se eliminó: amarillo

console.log(colores);
// ["rojo", "verde", "azul"]
```

---

#### Comparación rápida 📝

| Método      | Acción | Posición |
| ----------- | ------ | -------- |
| `push()`    | Agrega | Final    |
| `pop()`     | Quita  | Final    |
| `unshift()` | Agrega | Inicio   |
| `shift()`   | Quita  | Inicio   |

---

#### Slice()

**`slice()`** sirve para obtener una copia parcial del array sin modificar el original.  

---

##### Sintaxis

```js
array.slice(inicio, fin);
```

- **inicio** → índice desde donde empieza la copia (incluido).  
- **fin** → índice donde termina la copia (excluido).  

---

##### Ejemplo básico 📦

```js
let numeros = [10, 20, 30, 40, 50];

// Copiar desde índice 1 hasta 3 (sin incluir el 3)
let subArray = numeros.slice(1, 3);

console.log(subArray); 
// [20, 30]
```

---

##### Ejemplo sin `fin`

```js
let letras = ["a", "b", "c", "d", "e"];

// Copiar desde índice 2 hasta el final
let parte = letras.slice(2);

console.log(parte); 
// ["c", "d", "e"]
```

---

##### Ejemplo con índices negativos 🔙

```js
let frutas = ["manzana", "pera", "uva", "mango"];

// Copiar los últimos 2 elementos
let ultimos = frutas.slice(-2);

console.log(ultimos); 
// ["uva", "mango"]
```

---

### Limpiar arreglo

- Reasignar a un nuevo arreglo

```js
let numeros = [1, 2, 3, 4];
numeros = []; // ahora está vacío
console.log(numeros); // []
```

- Cambiar longitud a cero

```js
let numeros = [1, 2, 3, 4];
numeros.length = 0;
console.log(numeros); // []
```

- Usar splice()  

```js
let numeros = [1, 2, 3, 4];
numeros.splice(0, numeros.length);
console.log(numeros); // []
```

- Usar pop() en un ciclo

```js
let numeros = [1, 2, 3, 4];
while (numeros.length > 0) {
  numeros.pop();
}
console.log(numeros); // []
```

## Estructuras de datos

### Set

En JavaScript, la estructura de datos **`Set`** es como un array especial pero con reglas distintas:  

- **No permite elementos duplicados** → cada valor es único.  
- **No tiene índices** → no accedes con `[0]`, sino que recorres con métodos.  
- **Mantiene el orden de inserción** → los elementos se guardan en el orden en que los agregas.  

---

#### Crear un Set

```js
let conjunto = new Set();

// Agregar valores
conjunto.add(1);
conjunto.add(2);
conjunto.add(2); // duplicado, no se agrega

console.log(conjunto); 
// Set { 1, 2 }
```

---

#### Métodos principales 🔧

- **`.add(valor)`** → agrega un valor.  
- **`.delete(valor)`** → elimina un valor.  
- **`.has(valor)`** → devuelve `true` si existe.  
- **`.clear()`** → vacía el Set.  
- **`.size`** → número de elementos.  

---

#### Ejemplo práctico

```js
let frutas = new Set();

frutas.add("manzana");
frutas.add("pera");
frutas.add("uva");
frutas.add("manzana"); // no se repite

console.log(frutas.size); // 3
console.log(frutas.has("pera")); // true

frutas.delete("uva");//Retorna true si se borro con exito
console.log(frutas); // Set { "manzana", "pera" }
```

---

#### Recorrer un Set 🔄

```js
for (let fruta of frutas) {
  console.log(fruta);
}
// manzana
// pera
```

También puedes convertirlo a array:

```js
let arrayFrutas = [...frutas];
console.log(arrayFrutas); // ["manzana", "pera"]
```

### Mapas (MAP)

El objeto **`Map`** en JavaScript es una estructura de datos muy poderosa que funciona como un diccionario o tabla de pares **clave → valor**, pero con ventajas frente a los objetos tradicionales `{}`.  

---

#### 🔑 Características principales

- Permite **cualquier tipo de clave** (no solo strings o símbolos, también objetos, funciones, números, etc.).  
- Mantiene el **orden de inserción** de los pares.  
- Tiene un tamaño accesible con `.size`.  
- Itera fácilmente con métodos integrados.  

---

#### 📦 Crear un Map

```js
// Crear vacío
let mapa = new Map();

// Crear con valores iniciales
let mapa2 = new Map([
  ["nombre", "Jorge"],
  ["edad", 25],
  ["activo", true]
]);
```

---

#### 🔧 Métodos principales

- **`.set(clave, valor)`** → agrega o actualiza un par.  
- **`.get(clave)`** → obtiene el valor asociado.  
- **`.has(clave)`** → devuelve `true` si existe la clave.  
- **`.delete(clave)`** → elimina un par.  
- **`.clear()`** → vacía el Map.  
- **`.size`** → número de pares.  

---

#### 📝 Ejemplo práctico

```js
let usuarios = new Map();

// Agregar pares
usuarios.set("id1", { nombre: "Ana", rol: "admin" });
usuarios.set("id2", { nombre: "Luis", rol: "editor" });

// Obtener valores
console.log(usuarios.get("id1")); 
// { nombre: "Ana", rol: "admin" }

// Verificar existencia
console.log(usuarios.has("id3")); // false

// Eliminar
usuarios.delete("id2");
console.log(usuarios.size); // 1
```

---

#### 🔄 Recorrer un Map

```js
for (let [clave, valor] of usuarios) {
  console.log(clave, valor);
}
// id1 { nombre: "Ana", rol: "admin" }
```

También puedes usar:

```js
usuarios.forEach((valor, clave) => {
  console.log(clave, valor);
});
```

---

#### 📌 Diferencias con `Object`

| Aspecto        | `Map`                                    | `Object`                                                   |
| -------------- | ---------------------------------------- | ---------------------------------------------------------- |
| Tipos de clave | Cualquier tipo (objeto, función, número) | Solo string o symbol                                       |
| Orden          | Mantiene orden de inserción              | No garantiza orden (aunque moderno sí lo respeta en parte) |
| Tamaño         | `.size`                                  | `Object.keys(obj).length`                                  |
| Iteración      | Fácil con `for...of`                     | Necesita `Object.keys/values/entries`                      |

## Declaraciones, sentencias y expresiones (Declarations, Statements and Expressions)

Declaración: Es una instrucción que define una variable, función o clase. No produce un valor por sí misma.

```js
let x; // Declaración de variable
function saludar() { // Declaración de función
  console.log('Hola');
}
```

Sentencia: Es una instrucción completa que realiza una acción. Puede contener declaraciones y expresiones.

```js
if (x > 10) { // Sentencia if
  console.log('x es mayor que 10');
}
```

Expresión: Es una combinación de valores, variables, operadores y funciones que produce un valor. Puede ser parte de una declaración o sentencia.

```js
let y = x + 5; // Expresión aritmética
let mensaje = 'El valor de x es ' + x; // Expresión de concatenación
console.log(mensaje); // Expresión de llamada a función
```

## Operadores

### Operadores aritméticos

Se usan para realizar cálculos matemáticos.

```js
let a = 12;
let b = 3;
// Suma, resta, multiplicación, división, módulo y potencia
console.log(b + a); // 15
console.log(b * a); // 36
console.log(b - a); // -9
console.log(b / a); // 0.25
console.log(b % a); // 3
console.log(a ** b); // 1728
// Incremento y decremento
// antes de ser usada se incrementa
console.log(++a);// 13
// despues de ser usada se incrementa 
console.log(a++); // 13
console.log(a); // 14
// antes de ser usada se decrementa
console.log(--b); // 2
// despues de ser usada se decrementa
console.log(b--); // 2
console.log(b); // 1
```

### Operadores de Asignación

Se usan para asignar valores a variables.

```js
let x = 10;
x += 5; // x = x + 5
console.log(x); // 15
x -= 5; // x = x - 5
console.log(x); // 10
x *= 2; // x = x * 2
console.log(x); // 20
x /= 2; // x = x / 2
console.log(x); // 10

```

### Operadores de comparación

Se usan para comparar valores y devuelven un valor booleano (true o false).

```js
let num1 = 5;
console.log(num1 > 5); // false
console.log(num1 >= 5); // true
console.log(num1 < 10); // true
console.log(num1 <= 10); // true
```

### Operadores de igualdad y desigualdad

Se usan para comparar valores y devuelven un valor booleano (true o false).

```js
let num1 = 5;
console.log(num1 == '5'); // true (comparación de valor)
console.log(num1 != '5'); // false (comparación de valor)
console.log(num1 === '5'); // false (comparación de valor y tipo)
console.log(num1 !== '5'); // true (comparación de valor y tipo)
```

Truthy values (Valores Verdaderos)

- Todos los úmeros positivos y negativos menos el cero
- Todas las cadenas de texto menos las vacias
- Boolean = True

Falsy values (Valores Falsos)

- 0
- 0n
- null
- undefined
- NaN
- Boolean = False
- Cadenas de Texto Vacias

### Operadores lógicos

Sirven para combinar comparaciones o condiciones.
El operador `&&` (AND) devuelve true si ambas condiciones son verdaderas.
El operador `||` (OR) devuelve true si al menos una de las condiciones es verdadera.
El operador `!` (NOT) invierte el valor de una condición.

```js
let tienePermiso = true;
let esAdmin = false;

console.log(tienePermiso && esAdmin); // false
console.log(tienePermiso || esAdmin); // true
console.log(!tienePermiso); // false
```

También se pueden usar con comparaciones:

```js
let edad = 20;
console.log(edad >= 18 && edad < 65); // true
```

### short-circuiting

Es un comportamiento especial de los operadores Logicos

Esto sirve para optimizar el código evitando evaluaciones innecesarias.

El operador `&&` devuelve el primer valor falso o el último valor verdadero.
Si el operador lógico `&&` encuentra un valor falso, no evalúa el resto de la expresión porque el resultado ya es falso.

```js
console.log(false && "hola"); // false
// No evalúa "hola" porque ya sabe que el resultado será falso.
```

El operador `||` devuelve el primer valor verdadero o el último valor falso.
Si el operador lógico `||` encuentra un valor verdadero, no evalúa el resto de la expresión porque el resultado ya es verdadero.

```js
console.log(true || "hola"); // true
// No evalúa "hola" porque ya sabe que el resultado será verdadero.
```

Ejemplo

```js
let valor1 = false;
let valor2 = true;
console.log(valor1 && valor2); // false (valor1 es falso, no se evalúa valor2)
console.log(valor2 && valor1); // false (valor2 es verdadero, se evalúa valor1 que es falso)
console.log(valor1 || valor2); // true (valor1 es falso, se evalúa valor2 que es verdadero)
console.log(valor2 || valor1); // true (valor2 es verdadero, no se evalúa valor1)
```

### Operadores Bitwise

Se usan para manipular bits individuales de números enteros.
es decir trabajan a nivel de bits, lo que los hace muy rápidos para ciertas operaciones como encriptación, compresión de datos, etc.

```js
let a = 5; // 0101 en binario
let b = 3; // 0011 en binario
console.log(a & b); // 1 (0001 en binario) Devuelve 1 si ambos bits son 1 y 0 si al menos uno de los bits es 0
console.log(a | b); // 7 (0111 en binario) Devuelve 1 si al menos uno de los bits es 1 y 0 si ambos bits son 0
console.log(a ^ b); // 6 (0110 en binario) Devuelve 1 si los bits son diferentes y 0 si son iguales
console.log(~a); // -6 (1111...1010 en binario) Devuelve el complemento a uno de a, es decir, invierte todos los bits de a
console.log(a << 1); // 10 (1010 en binario) Desplaza los bits de a hacia la izquierda 1 posición, agregando un 0 al final
console.log(a >> 1); // 2 (0010 en binario) Desplaza los bits de a hacia la derecha 1 posición, eliminando el bit de la izquierda
```

#### Operador de encadenamiento opcional (?.)

Permite acceder a propiedades de un objeto sin causar un error si la propiedad no existe o es null/undefined.

```js
let persona = {
  nombre: 'Juan',
  direccion: {
    calle: 'Calle Falsa',
    numero: 123
  }
};

console.log(persona.nombre); // 'Juan'
console.log(persona.direccion.calle); // 'Calle Falsa'
console.log(persona.direccion.numero); // 123
console.log(persona.telefono); // undefined
console.log(persona.telefono?.numero); // undefined (no causa error)
```

#### Operador Ternario (?:)

Es una forma abreviada de escribir una sentencia if-else.

```js
let edad = 20;
let mensaje = edad >= 18 ? 'Eres mayor de edad' : 'Eres menor de edad';
console.log(mensaje); // 'Eres mayor de edad'
```

## Strings

Los **strings** son cadenas de texto que se usan para representar palabras, frases o cualquier secuencia de caracteres.

```js
// Concatenación
let myName = "Lechu"
let greeting = "Hola, " + myName + "!"
console.log(greeting)          // "Hola, Lechu!"
console.log(typeof greeting)   // "string"

//el número de caracteres de la cadena.
console.log(greeting.length)   // 12

//Acceso a caracteres
console.log(greeting[0])   // "H"
console.log(greeting[11])  // "!"
// `greeting[0]` devuelve la primera letra, y `greeting[11]` el último carácter.

let texto = "JavaScript";

// Convertir a mayúsculas
console.log(texto.toUpperCase()); // "JAVASCRIPT"

// Convertir a minúsculas
console.log(texto.toLowerCase()); // "javascript"

// Extraer parte de la cadena
console.log(texto.slice(0, 4)); // "Java"

// Reemplazar texto
console.log(texto.replace("Script", "Coder")); // "JavaCoder"
```

### Interpolacion de variables dentro de Strings

La interpolación de variables dentro de strings en JavaScript es la forma de insertar valores dinámicos (como variables o expresiones) directamente dentro de un texto, sin tener que concatenar con +.

👉 Se hace usando template literals, que son strings definidos con backticks ` en lugar de comillas simples ' o dobles ".

```js
const nombre = "Lechugas";
const edad = 25;

console.log(`Hola, mi nombre es ${nombre} y tengo ${edad} años.`);
```

Aquí dentro de ${...} no solo va una variable, también puede ir una operación o cualquier expresión válida de JS.

## Condicionales y bucles

### Condicional IF / IF ELSE

Permiten ejecutar un bloque de código si una condición es verdadera.

```js
let edad = 17;

if (edad >= 18) {
  console.log('Eres mayor de edad');
} else {
  console.log('Eres menor de edad');
}
```

También puedes usar `else if` para varias opciones.

```js
let nota = 8;

if (nota >= 9) {
  console.log('Excelente');
} else if (nota >= 7) {
  console.log('Aprobado');
} else {
  console.log('Reprobado');
}
```

### Ciclo For

Se usa cuando sabes cuántas veces quieres repetir una acción.

```js
for (let i = 1; i <= 5; i++) {
  console.log('Iteración:', i);
}
```

### For...of

Permite iterar sobre elementos de una colección u estructura de datos como arrays o strings, Mapas, o Set´s

```js
let frutas = ['manzana', 'banana', 'cereza'];
for (let fruta of frutas) {
  console.log(fruta);
}
```

Con while seria algo asi

```js
let frutas = ['manzana', 'banana', 'cereza'];
let index = 0;
while (index < frutas.length) {
  console.log(frutas[index]);
  index++;
}
```

Para recorrer un map

```js
let mapa = new Map([
  ["nombre", "Ana"],
  ["edad", 25]
]);

for (let [clave, valor] of mapa) {
  console.log(clave, valor);
}
// nombre Ana
// edad 25
```

Para recorrer un Set

```js
let conjunto = new Set(["manzana", "pera", "uva"]);

for (let fruta of conjunto) {
  console.log(fruta);
}
// manzana
// pera
// uva
```

Para recorrr un string

```js
let texto = "JS";

for (let letra of texto) {
  console.log(letra);
}
// J
// S
```

### For...in

Permite iterar sobre las propiedades enumerables de un objeto.

```js
let persona = {
  nombre: 'Juan',
  edad: 30,
  ciudad: 'Madrid'
};
for (let clave in persona) {
  console.log(clave + ': ' + persona[clave]);
}
```

### Ciclo while

Se repite mientras una condición sea verdadera.

```js
let contador = 1;

while (contador <= 5) {
  console.log('While:', contador);
  contador++;
}
```

### Ciclo do while

Primero ejecuta el bloque y luego evalúa la condición.

```js
let numero = 0;

 do {
  console.log('Do While:', numero);
  numero++;
} while (numero < 3);
```

### Break y continue

`break` se usa para salir de un ciclo antes de que termine.
`continue` se usa para saltar a la siguiente iteración del ciclo.

```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue; // Salta el número 3
  }
  if (i === 4) {
    break; // Sale del ciclo cuando i es 4
  }
  console.log(i);
}
```

Ejemplo 2

```js
let numero = 0;
while (numero < 5) {
  numero++;
  if (numero === 2) {
    continue; // Salta el número 2
  }
  if (numero === 4) {
    break; // Sale del ciclo cuando numero es 4
  }
  console.log(numero);
}
```

### switch

Es útil cuando tienes muchas opciones posibles sobre una misma variable.

```js
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
```

## Funciones

Una función es un bloque de código reutilizable que realiza una tarea específica.

### Definición de función

- Se declaran con la palabra `function`
- Pueden recibir parámetros
- Pueden regresar un valor con `return`

```js
function sumar(a, b) {
  return a + b;
}

console.log(sumar(4, 6)); // 10
```

### Función Anonimas o como expresión

JavaScript permite declarar funcionrs sin nombre solo con la palabra reservada `function` estas deben ser guardadas en variables.

```js
const restar = function (a, b) {
  return a - b;
};

console.log(restar(10, 4)); // 6
```

Ejemplo 2

```js
// Funciones anónimas
const myFunc2 = function (name) {
  console.log(`Hola, ${name}!`)
}

myFunc2('Lechuganster')

```

### Funciones flecha (Arrow functions)

Son una forma más corta de escribir funciones.

```js
const multiplicar = (a, b) => a * b;

console.log(multiplicar(3, 5)); // 15
```

### Parámetros y retorno

Puedes pasar datos a una función y devolver un resultado.

```js
function saludar(nombre) {
  return 'Hola, ' + nombre + '!';
}

console.log(saludar('Carlos'));
```

Se pueden tener parametros con valores por defecto

```js
function saludar(nombre = "Invitado") {
  console.log(`Hola, ${nombre}!`);
}

saludar("Jorge");   // Hola, Jorge!
saludar();          // Hola, Invitado!
```

### Funciones anidadas

Una función puede devolver otra función.

```js
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
```

### Funcion de Orden superior

En JavaScript, una **función de orden superior** es aquella que **recibe otra función como parámetro** o **devuelve una función**. Son muy comunes porque permiten trabajar con callbacks y con patrones funcionales.  

---

#### Características

- Tratan las funciones como **valores** (first-class citizens).  
- Permiten **abstracción** y **reutilización** de lógica.  
- Se usan mucho en métodos de arrays (`map`, `filter`, `reduce`).  

---

#### Ejemplo 1: Función que recibe otra función

```js
function operar(x, y, funcion) {
  return funcion(x, y);
}

function sumar(a, b) {
  return a + b;
}

console.log(operar(5, 3, sumar)); 
// 8
```

👉 Aquí `operar` es de orden superior porque recibe otra función (`sumar`) como argumento.

---

#### Ejemplo 2: Función que devuelve otra función

```js
function crearMultiplicador(factor) {
  return function (numero) {
    return numero * factor;
  };
}

const duplicar = crearMultiplicador(2);
const triplicar = crearMultiplicador(3);

console.log(duplicar(5));  // 10
console.log(triplicar(5)); // 15
```

👉 `crearMultiplicador` devuelve una nueva función personalizada según el factor.

---

#### Ejemplo 3: Uso con arrays

```js
let numeros = [1, 2, 3, 4];

// map recibe una función como parámetro
let cuadrados = numeros.map(n => n * n);

console.log(cuadrados); 
// [1, 4, 9, 16]
```

### Factory Functions

Son funciones que crean y devuelven objetos.Es una forma de crear objetos sin usar clases.

```js
function crearPersona(nombre, edad) {
  return {
    nombre: nombre,
    edad: edad,
    saludar: function() {
      console.log('Hola, soy ' + this.nombre);
    }
  };
}
const persona1 = crearPersona('Ana', 25);
persona1.saludar(); // Hola, soy Ana
const persona2 = crearPersona('Luis', 30);
persona2.saludar(); // Hola, soy Luis
```

### Funciones constructora vs clases

Las funciones constructora son una forma de crear objetos y se invocan con la palabra clave `new`

```js
function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
  this.saludar = function() {
    console.log('Hola, soy ' + this.nombre);
  };
}
const persona1 = new Persona('Ana', 25);
persona1.saludar(); // Hola, soy Ana
const persona2 = new Persona('Luis', 30);
persona2.saludar(); // Hola, soy Luis
```

Las clases son una forma más moderna de crear objetos y se invocan con la palabra clave `new`

```js
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
}
const persona1 = new Persona('Ana', 25);
persona1.saludar(); // Hola, soy Ana
const persona2 = new Persona('Luis', 30);
persona2.saludar(); // Hola, soy Luis
```

La diferencia principal es que las clases son más modernas y fáciles de entender.

### call y apply

Permiten invocar una función con un contexto específico (el valor de `this`).

```js
function saludar() {
  console.log('Hola, soy ' + this.nombre);
} 
const persona = { nombre: 'Carlos' };
saludar.call(persona); // Hola, soy Carlos
saludar.apply(persona); // Hola, soy Carlos
```

call y apply son métodos de las funciones que permiten invocar una función con un contexto específico (el valor de `this`).

## Desestructuración

Es una forma de extraer valores de arrays o objetos y asignarlos a variables individuales.

### Desestructuración de **Arrays**

```js
let numeros = [10, 20, 30];

// Extraer valores
let [a, b, c] = numeros;
console.log(a, b, c); // 10 20 30

// Saltar posiciones
let [primero, , tercero] = numeros;
console.log(primero, tercero); // 10 30

// Con valor por defecto
let [x, y, z = 99] = [1, 2];
console.log(x, y, z); // 1 2 99
```

---

### Desestructuración de **Objetos**

```js
let persona = { nombre: "Ana", edad: 25 };

// Extraer propiedades
let { nombre, edad } = persona;
console.log(nombre, edad); // Ana 25

// Cambiar nombre de variable
let { nombre: n, edad: e } = persona;
console.log(n, e); // Ana 25

// Con valor por defecto
let { profesion = "Desconocida" } = persona;
console.log(profesion); // Desconocida
```

---

### Desestructuración **Anidada**

```js
let usuario = {
  nombre: "Luis",
  direccion: {
    ciudad: "CDMX",
    calle: "Reforma"
  }
};

let { direccion: { ciudad, calle } } = usuario;
console.log(ciudad, calle); // CDMX Reforma
```

---

### En **Funciones**

```js
function mostrar({ nombre, edad }) {
  console.log(`Nombre: ${nombre}, Edad: ${edad}`);
}

mostrar({ nombre: "Ana", edad: 25 });
// Nombre: Ana, Edad: 25
```

---

### Con **Arrays en parámetros**

```js
function sumar([a, b]) {
  return a + b;
}

console.log(sumar([5, 7])); // 12
```

---

### Uso combinado con **Rest/Spread**

```js
let [primero, ...resto] = [1, 2, 3, 4];
console.log(primero); // 1
console.log(resto);   // [2, 3, 4]

let { nombre, ...otros } = { nombre: "Ana", edad: 25, ciudad: "CDMX" };
console.log(nombre); // Ana
console.log(otros);  // { edad: 25, ciudad: "CDMX" }
```

## Operador de propagación

Es una forma de expandir arrays o objetos en otro array o objeto.
Ejemplo:

```js
let numeros = [1, 2, 3, 4, 5];
let numeros2 = [...numeros, 6, 7, 8];
console.log(numeros2); // [1, 2, 3, 4, 5, 6, 7, 8]

let persona = { nombre: "Ana", edad: 25 };
let persona2 = { ...persona, ciudad: "CDMX" };
console.log(persona2); // { nombre: "Ana", edad: 25, ciudad: "CDMX" }
```

## Operador de resto

Es una forma de extraer los elementos de un array o objeto.
Ejemplo:

```js
let numeros = [1, 2, 3, 4, 5];
let [primero, ...resto] = numeros;
console.log(primero); // 1
console.log(resto); // [2, 3, 4, 5]
```

## POO en JavaScript

La programación orientada a objetos en JavaScript es una forma de programar que se basa en la creación de objetos que tienen propiedades y métodos.

### Clases

Las clases en JavaScript son una forma de crear objetos que tienen propiedades y métodos.
on como Plantilla para crear objetos.
Las clases son similares a las funciones constructora pero son más modernas y fáciles de entender.

Funciones constructora mala practica

```js
function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}
const persona = new Persona('Ana', 25);
console.log(persona.nombre); // Ana
console.log(persona.edad); // 25
```

Clase buena practica:

```js
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
}
//Instanciar la clase
const persona = new Persona('Ana', 25);
console.log(persona.nombre); // Ana
console.log(persona.edad); // 25
```

#### Propiedades y métodos

Las propiedades y métodos son las características de los objetos.
Las propiedades son las variables que pertenecen a los objetos.
Los métodos son las funciones que pertenecen a los objetos.
Ejemplo:

```js
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
  saludar() {
    console.log('Hola, soy ' + this.nombre);
  }
}
//Instanciar la clase
const persona = new Persona('Ana', 25);
//Llamar al método
persona.saludar(); // Hola, soy Ana
//Llamar a la propiedad
console.log(persona.nombre); // Ana
//Llamar a la propiedad
console.log(persona.edad); // 25
```

#### Propiedades con valores por defecto

Las propiedades con valores por defecto son las propiedades que tienen un valor por defecto si no se le pasa un valor.
Ejemplo:

```js
class Persona {
  constructor(nombre='Sin nombre', edad = 1) {
    this.nombre = nombre;
    this.edad = edad;
  }
}
const persona = new Persona('Ana');
console.log(persona.nombre); // Ana
console.log(persona.edad); // 1
const persona2 = new Persona();
console.log(persona2.nombre); // Sin nombre
console.log(persona2.edad); // 1
const persona3 = new Persona('Lechuga',29);
console.log(persona3.nombre); // Lechuga
console.log(persona3.edad); // 29
```

#### Propiedades privadas

Las propiedades privadas son las propiedades que no se pueden acceder desde fuera de la clase.
Ejemplo:

```js
class Persona {
  #nombre;
  #edad;
  constructor(nombre, edad) {
    this.#nombre = nombre;
    this.#edad = edad;
  }
  getNombre() {
    return this.#nombre;
  }
  getEdad() {
    return this.#edad;
  }
}
const persona = new Persona('Ana', 25);
console.log(persona.getNombre()); // Ana
console.log(persona.getEdad()); // 25
console.log(persona.#nombre); // Error
console.log(persona.#edad); // Error
```

### Herencia

La herencia es un mecanismo que permite que una clase (la clase derivada) herede propiedades y métodos de otra clase (la clase base). La clase derivada es la que hereda y la clase base es la que proporciona las propiedades y métodos.

Ejemplo:

```js
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
}
class Empleado extends Persona {
  constructor(nombre, edad, salario) {
//Llamar al constructor de la clase padre 
super(nombre, edad);
    this.salario = salario;
  }
}
const empleado = new Empleado('Ana', 25, 1000);
console.log(empleado.nombre); // Ana
console.log(empleado.edad); // 25
console.log(empleado.salario); // 1000
```

## Uso del DOM

El DOM (Document Object Model) es una API que permite manipular el contenido de una página web.
Ejemplo:

```js
const h1 = document.createElement('h1');
h1.textContent = 'Hola, mundo!';
document.body.appendChild(h1);
```

El DOM es una API que permite manipular el contenido de una página web.

# Front end con JS

El front end es la parte de la aplicación que se encarga de la presentación del contenido.
se conforma de HTML, CSS y JS.
Practicamente es el diseño de la pagina web. lo que el usuario ve.

Ejemplo:

Estructura HTML:

```html
<html>
  <head>
    <title>Mi página web</title>
  </head>
  <body>
    <h1>Hola, mundo!</h1>
  </body>
</html>
```

Dinamismo con JS:

```js
// movimiento de un elemento
const h1 = document.createElement('h1');//crea un elemento h1
h1.textContent = 'Hola, mundo!';//agrega texto al elemento h1
document.body.appendChild(h1);//agrega el elemento h1 al body
```

# Back end con JS

Node.js es un entorno de ejecución de JavaScript que permite ejecutar código JS fuera del navegador, en el servidor o en la línea de comandos.
Ejemplo:

```js
const http = require('http');
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola, mundo!');
});
server.listen(3000, 'localhost', () => {
  console.log('Server running at http://localhost:3000/');
});
