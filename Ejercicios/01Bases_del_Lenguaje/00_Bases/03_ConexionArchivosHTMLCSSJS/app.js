// Ejercicio 03: Conexión entre HTML, CSS y JS
const boton = document.getElementById('boton');
const mensaje = document.getElementById('mensaje');

boton.addEventListener('click', () => {
  mensaje.textContent = '¡La conexión entre HTML, CSS y JS funciona!';
});
