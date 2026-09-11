// Función Currificada

function multiplicar(a) {
    return function(b) {
        return function(c) {
            return a * b * c;
        };
    };
}

console.log(multiplicar(2)(3)(4)); // 24

