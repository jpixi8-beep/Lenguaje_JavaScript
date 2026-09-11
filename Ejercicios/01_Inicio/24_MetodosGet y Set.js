// Métodos Get y Set en JavaScript
// Los métodos get y set permiten controlar el acceso y modificación de propiedades privadas
// Get: para obtener el valor de una propiedad privada
// Set: para modificar el valor de una propiedad privada con validación

console.log('\n--- Ejemplo con Producto ---');

class Producto {
    #precio;
    #stock;

    constructor(nombre, precio, stock) {
        this.nombre = nombre; // Propiedad pública
        this.#precio = precio; // Propiedad privada
        this.#stock = stock; // Propiedad privada
    }

    get precioget() {
        //  Retorno el valor de la propiedad privada
        return this.#precio;
    }

    set preciesset(nuevoPrecio) {
        if (nuevoPrecio <= 0) {
            console.log('Error: El precio debe ser mayor a 0');
            return;
        }
        //  Modifico el valor de la propiedad privada
        this.#precio = nuevoPrecio;
    }

    get stockget() {
        //  Retorno el valor de la propiedad privada
        return this.#stock;
    }

    set stockset(nuevoStock) {
        if (nuevoStock < 0) {
            console.log('Error: El stock no puede ser negativo');
            return;
        }
        //  Modifico el valor de la propiedad privada
        this.#stock = nuevoStock;
    }
    //  Aqui mostramos la informacion del producto sin usar get
    mostrarInfo() {
        console.log(`Producto: ${this.nombre}`);
        console.log(`Precio: $${this.#precio}`);
        console.log(`Stock: ${this.#stock} unidades`);
    }
}

const laptop = new Producto('Laptop Gamer', 1500, 10);
laptop.mostrarInfo();

//  Aqui usamos el set para modificar el precio y stock
laptop.preciesset = 1400;
laptop.stockset = 8;
console.log('\nDespués de modificar:');
//  Aqui usamos el get para obtener el precio y stock
console.log(`Precio: $${laptop.precioget}`);
console.log(`Stock: ${laptop.stockget} unidades`);

laptop.mostrarInfo();

//  Intentos fallidos
laptop.preciesset = -100; // Error: El precio debe ser mayor a 0
laptop.stockset = -5; // Error: El stock no puede ser negativo