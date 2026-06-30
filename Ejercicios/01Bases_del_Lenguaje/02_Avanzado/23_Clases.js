//Introducidas en Ecmascript 2015
//Es una plantilla para crear objetos
//Se define con la palabra clave class y el nombre de la clase
//requiere de un funcion o metodo constructor para inicializar su estructura basica
//El metodo costructor es el primero que se ejecuta al crear un objeto
//Todas los metodos o funciones pueden tener propiedades con valores por defecto,
//Privadas o publicas

class Persona {
    constructor(nombre = "User", edad = 0) {
        this.nombre = nombre;
        this.edad = edad;
    }
    saludar() {
        console.log('Hola, soy ' + this.nombre);
    }
}

//Una vez creada la clasa esta debe instanciarse para poder ser creada o utilizada

let persona = new Persona('Ana', 25);
var persona2 = new Persona('Lechu', 29)

//Acceder a propiedades publicas por punto (.)
console.log(persona.nombre); // Ana
console.log(persona.edad); // 25

//Acceder a variables publicas con []
console.log(persona2['nombre']); // Lechu
console.log(persona2['edad']); // 29

//Si imprimimos el tipo de dasto que son nos retorna que son objetos
console.log(typeof persona)// objet
console.log(typeof persona2)//object
// Llamada a metodos
persona.saludar(); // Hola, soy Ana
persona2.saludar(); // Hola, soy Lechu