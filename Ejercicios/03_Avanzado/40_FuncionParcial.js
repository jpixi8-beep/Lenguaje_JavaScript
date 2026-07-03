function add(a) {
  return function(b,c) {
    return a + b + c;
  };
}

const add1 = add(5); //a = 5
console.log(add1(3,2)); // b = 3, c = 2,
//  resultado = (5 + 3 + 2) = 10