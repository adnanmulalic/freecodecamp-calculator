function shuntingyardalgo(expression) {
    const operators = [];
    const operands = [];
    let num = "";
    for (let i = 0; i < expression.length; i++) {
        if (expression[i].match(/\d/)) {
            num += expression[i];
        if (operators.length >= 2 && operators[0] === "-" && expression[i - 2].match(/[-+*/]/)) {
            console.log("negative num", num)
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

    console.log(num)
    console.log(operands, operators);
}

export {shuntingyardalgo}