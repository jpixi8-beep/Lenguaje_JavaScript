// 1. Función con Spread (ejercicio 8)
function sumarConMultiplicador(multiplier, ...nums) {
  // 2. Retorno implícito con arrow (ejercicio 9)
  const suma = () => nums.reduce((acc, n) => acc + n, 0);
  return suma() * multiplier;
}

// 3. Objeto con this léxico (ejercicio 10)
const persona = {
  nombre: "Lechu",
  hobbies: ["skate", "codear"],
  mostrarHobbies() {
    // Arrow function hereda el this del objeto
    this.hobbies.forEach(hobby => {
      console.log(`${this.nombre} disfruta ${hobby}`);
    });
  }
};

// 🚀 Probando todo
console.log(sumarConMultiplicador(2, 1, 2, 3)); // 12
persona.mostrarHobbies();
// Lechu disfruta skate
// Lechu disfruta codear
