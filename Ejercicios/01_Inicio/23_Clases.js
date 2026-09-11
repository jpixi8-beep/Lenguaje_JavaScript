//Introducidas en Ecmascript 2015
//Es una plantilla para crear objetos
//Se define con la palabra clave class y el nombre de la clase
//requiere de un funcion o metodo constructor para inicializar su estructura basica
//El metodo costructor es el primero que se ejecuta al crear un objeto
//Todas los metodos o funciones pueden tener propiedades con valores por defecto,
//Privadas o publicas
//Para declarar variables privadas se usa el simbolo # antes del nombre de la variable

class Persona {
    #pass;//Variable privada
    constructor(nombre = "User", edad = 0, pass = 0) {
        //Inicializacion de variables publicas y privadas
        this.nombre = nombre;
        this.edad = edad;
        this.#pass = pass;
    }
    saludar() {
        console.log('Hola, soy ' + this.nombre);
    }
    verificarPass(pass) {
        return this.#pass === pass;
    }
}

//Una vez creada la clasa esta debe instanciarse para poder ser creada o utilizada

let persona = new Persona('Ana', 25);
var persona2 = new Persona('Lechu', 29)

//Acceder a propiedades publicas por punto (.)
console.log(persona.nombre); // Ana
console.log(persona.edad); // 25
//console.log(persona.#pass); // Esto manda error porque es privado

//Acceder a variables publicas con []
console.log(persona2['nombre']); // Lechu
console.log(persona2['edad']); // 29
//console.log(persona2['#pass']); // Esto manda error porque es privado

//Si imprimimos el tipo de dasto que son nos retorna que son objetos
console.log(typeof persona)// objet
console.log(typeof persona2)//object

// Llamada a metodos
persona.saludar(); // Hola, soy Ana
persona2.saludar(); // Hola, soy Lechu

//Para acceder a variables privadas se debe usar un metodo
console.log(persona.verificarPass(0)); // true
console.log(persona2.verificarPass(0)); // false

// o utilizar los metodos get y set
//explicados en el siguiente archivo