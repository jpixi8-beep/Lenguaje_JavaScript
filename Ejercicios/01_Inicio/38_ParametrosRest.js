function sum(multi, ...numbers){
    let result = 0;
    for (let number of numbers) {
        result += number;
    }
    return result * multi;
}

console.log(sum(2, 1, 2, 3, 4, 5)); // 30
