const numbersArray = [];
const resultArray = [];
let operation = '';
let numberInput = '';

const numbersDisplay = document.getElementById('display-numbers');
const operatorsDisplay = document.getElementById('display-operator');

function calculation(valueArray,operation){
    if(numbersArray.length >= 2){
        switch(operation){
        case '+':
            return valueArray.splice(0, valueArray.length, valueArray.reduce((acc,curr) => acc + curr));
        case '-':
            return valueArray.splice(0, valueArray.length, valueArray.reduce((acc,curr) => acc - curr));
        case 'x':
            return valueArray.splice(0, valueArray.length, valueArray.reduce((acc,curr) => acc * curr));
        case '/':
            return valueArray.splice(0, valueArray.length, valueArray.reduce((acc,curr) => acc / curr));
        }
    }
}

document.getElementById('button-numbers').addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
    if(numberInput.length > 9){
        alert('max-limit reached');
        return;
    }
    if(operatorsDisplay.innerHTML == '='){
        operatorsDisplay.innerHTML = '';
        numbersArray.splice(0);
    }
    numberInput += e.target.value;
    numbersDisplay.innerHTML = numberInput;
    document.getElementById('equals-btn').disabled = false;
}
});

document.getElementById('button-operations').addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
    if(numberInput === '' && numbersArray == ''){
        alert('A number is required before an operation');
        return;
    }
    if(e.target.value == 'clear'){
        numbersArray.splice(0,numbersArray.length);
        numberInput = '';
        numbersDisplay.innerHTML = '';
        operatorsDisplay.innerHTML = '';
        return;
    }
    if(operation == '='){
        numbersArray.push();
        document.getElementById('equals-btn').disabled = true;
    }
    if(operatorsDisplay.innerHTML == '='){
        operatorsDisplay.innerHTML = e.target.value;
        numberInput = '';
        operation = e.target.value;
        return;
    }else{
        numbersArray.push(Number(numberInput));
    }
    numberInput = '';
    calculation(numbersArray,operation);
    operation = e.target.value;
    operatorsDisplay.innerHTML = operation;
    if(String(numbersArray[numbersArray.length -1]).length > 10){
        numbersDisplay.innerHTML = (numbersArray[numbersArray.length - 1]).toFixed(9);
        return;
    }
    if(numbersArray[numbersArray.length - 1] === Infinity){
         numbersDisplay.innerHTML = 'NaN';
         numbersArray.splice(0);
        return;
    }
    numbersDisplay.innerHTML = (numbersArray[numbersArray.length - 1])
}
})
