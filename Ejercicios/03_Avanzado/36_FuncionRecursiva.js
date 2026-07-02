function potencia(base, pote, count = 0, res = 1) {
  if (count < pote) {
    return potencia(base, pote, count + 1, res * base);
  } else {
    return res;
  }
}

// Uso:
console.log(potencia(2, 3)); // imprime 8
