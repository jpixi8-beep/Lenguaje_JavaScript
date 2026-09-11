// Ejercicio 07: Diferencia entre let y var
function ejemplo() {
  if (true) {
    var mensajeVar = 'Soy var';
    let mensajeLet = 'Soy let';
    console.log(mensajeLet);
  }

  console.log(mensajeVar);
  // console.log(mensajeLet); // Error: mensajeLet no está disponible aquí
}

ejemplo();
