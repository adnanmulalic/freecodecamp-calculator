function operations(a, b, operator) {
    let result = 0;
    switch (operator) {
        case "+":
            result = parseFloat(a) + parseFloat(b);
            return String(result);
        case "-":
            result = parseFloat(a) - parseFloat(b);
            return String(result);
        case "*":
            result = parseFloat(a) * parseFloat(b);
            return String(result);
        case "/":
            result = parseFloat(a) / parseFloat(b);
            return String(result);
    }
}

function shuntingyardalgo(expression) {
    let operators = [];
    let operands = [];
    const postfix = [];
    let num = "";
    for (let i = 0; i < expression.length; i++) {
        if (expression[i].match(/[\d.]/)) {
            num += expression[i];
        if (((i === 1 && operators[0] === "-"))) {
            operators.pop();
            postfix.pop();
            num = "-" + num;
        }
        if (operators.length >= 2 && expression[i - 1] === "-" && expression[i - 2].match(/[-+*/]/)) {
            operators.pop();
            postfix.pop();
            num = "-" + num;
        }
        
        } else {
            num != "" && operands.push(num);
            num != "" && postfix.push(num);
            num = "";
            if (operators.length < 1) {
                operators.push(expression[i]);
            } else {
            if (expression[i].match(/[*/]/)) {
                    for (let j = 0; j < operators.length; j++) {
                        if (operators[j].match(/[-+]/)) {
                            operators.splice(j, 0, expression[i]);
                            break;
                        }
                    }
                } else {
                    operators.push(expression[i]);
                }
            }
            !expression[i].match(/[\d]/) && postfix.push(expression[i]);
        }
        }
        postfix.push(num);
        operands.push(num);
        let operatorStack = [];
        let output = [];
        postfix.forEach(token => {
            if (token.match(/^-?\d+\.?\d*$/)) {
                output.push(token);
            } else if (token.match(/[-+/*]/)) {
            if (token.match(/[-+]/)) {
                while (operatorStack.length > 0 ) {
                    output.push(operatorStack[0]);
                    operatorStack.shift();
                }
                operatorStack.push(token);
                }
            else {
                operatorStack.unshift(token);
                }
            }
        })

        if (operatorStack.length > 0){
            output = [...output, ...operatorStack];
        }
        let i = 0;
        while (output.length > 1) {
            if (output[i].length === 1 && output[i].match(/[-+/*]/)) {
                let a = output[i - 2]; let b = output[i - 1];
                let result = operations(a, b, output[i]);
                output.splice(i - 2, 3, result);
                i = 0;
            } else {
                i++;
            }
        }
        console.log(output[0])
        return output[0];
        // return Math.round(output[0] * 10000) / 10000; rounded to 4 decimals
}

export {shuntingyardalgo}