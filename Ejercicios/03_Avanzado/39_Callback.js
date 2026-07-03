// Función que suma números
function sum(...numbers) {
  let result = 0;
  for (let number of numbers) {
    result += number;
  }
  return result;
}

function processdata(data, callback) {
  const result = sum(...data);
  callback(result);
}

// Función que recibe el resultado de la suma y lo muestra en consola 
//data es el parámetro que recibe el callback
function showdata(data) {
  console.log(data);
}

processdata([2, 3, 8], showdata);
processdata([1, 2, 3, 4, 5], showdata);
processdata([10, 20, 30], showdata);
processdata([100, 200], showdata);
