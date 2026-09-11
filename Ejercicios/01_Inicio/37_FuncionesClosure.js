function madre(num) {
    let numglobal = num; // ahora sí es privada

    function imprimir() {
        console.log(numglobal);
    }

    function incrementar() {
        numglobal++;
    }

    function decrementar() {
        numglobal--;
    }

    function get() {
        return numglobal;
    }

    function set(valor) {
        numglobal = valor;
    }

    return {
        imprimir,
        incrementar,
        decrementar,
        get,
        set
    };
}

const counter = madre(10);
counter.imprimir();    // 10
counter.incrementar();
counter.imprimir();    // 11
console.log(counter.get()); // 11
