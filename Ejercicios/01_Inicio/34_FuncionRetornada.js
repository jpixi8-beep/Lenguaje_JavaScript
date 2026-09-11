// una funcion puede ser retornada desde otra funcion 

function crearFuncion() {
    return function() {
        console.log("Hola desde la funcion retornada");
    };
}

const miFuncion = crearFuncion();
miFuncion();
