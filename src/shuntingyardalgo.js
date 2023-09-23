function operations(a, b, operator) {
    let result = 0;
    switch (operator) {
        case "+":
            result = Number(a) + Number(b);
            return String(result);
        case "-":
            result = Number(a) - Number(b);
            return String(result);
        case "*":
            result = Number(a) * Number(b);
            return String(result);
        case "/":
            result = parseFloat(a) / parseFloat(b);
            return String(result);
    }
}

function shuntingyardalgo(expression) {
    const operators = [];
    const operands = [];
    let num = "";
    for (let i = 0; i < expression.length; i++) {
        if (expression[i].match(/[\d.]/)) {
            num += expression[i];
        if (((i === 1 && operators[0] === "-"))) {
            operators.shift();
            num = "-" + num;
        }
        if (operators.length >= 2 && operators[0] === "-" && expression[i - 2].match(/[-+*/]/)) {
            operators.shift();
            num = "-" + num;
        }
        } else {
            num != "" && operands.push(num);
            num = "";
            operators.unshift(expression[i]);
        }
    }
    operands.push(num);

    operators.forEach(operator => {
            let i = operands.length - 1;
            let a = operands[i]; let b = operands[i - 1];
            operands.pop(); operands.pop();
            operands.push(operations(a, b, operator));
            console.log(operations(a, b, operator))
    })

    console.log(num)
    console.log(operands);
}

export {shuntingyardalgo}