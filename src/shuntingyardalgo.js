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
            console.log("negative num")
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
                    console.log(expression[i])
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
            console.log(token)
        })

        if (operatorStack.length > 0){
            output = [...output, ...operatorStack];
        }

        console.log(output)
        let i = 0;
        while (output.length > 1) {
            if (output[i].length === 1 && output[i].match(/[-+/*]/)) {
                let a = output[i - 2]; let b = output[i - 1];
                let result = operations(a, b, output[i]);
                console.log(result)
                output.splice(i - 2, 3, result);
                console.log(output);
                i = 0;
            } else {
                i++;
            }
        }

        //console.log(operands, operators)
        //console.log(postfix)
        console.log(output)



    // operators.forEach(operator => {
    //         let i = operands.length - 1;
    //         let a = operands[i - 1]; let b = operands[i];
    //         operands.pop(); operands.pop();
    //         operands.push(operations(a, b, operator));
    //         //console.log(operations(a, b, operator))
    // })

}

export {shuntingyardalgo}