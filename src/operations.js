function operations(a, b, operator) {
    let result = 0;
    switch (operator) {
        case "add":
            result = Number(a) + Number(b);
            return String(result);
        case "subtract":
            result = Number(a) - Number(b);
            return String(result);
    }
}

export {operations}

// function add(a, b) {
//     let c = Number(a) + Number(b);
//     return String(c);
// }

// function subtract(a, b) {
//     return a - b;
// }

// function multiply(a, b) {
//     return a * b;
// }

// function divide(a, b) {
//     return a / b;
// }