const numbersArray = [];
let operation = '';
let numberInput = '';

const numbersDisplay = document.getElementById('display-numbers'); // numbers display
const operatorsDisplay = document.getElementById('display-operator'); //operator display

/* performs calculation based on the operation passed */
/* Modifies the Array passed as paramemter to contain only the result of the calculation */
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

/* handling number button clicks */
document.getElementById('button-numbers').addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
    if(numberInput.length > 11){
        alert('max-limit reached');//max limit of 12 digits
        return;
    }
    if(e.target.value == '.'){
        e.target.disabled = true; //limiting to use decimal point only once in a number
    }
    if(operatorsDisplay.innerHTML == '='){
        operatorsDisplay.innerHTML = '';
        numbersArray.splice(0);//clearing the array for new calculation
    }
    numberInput += e.target.value;
    numbersDisplay.innerHTML = numberInput;
    document.getElementById('equals-btn').disabled = false; //enabling equals button after a number input
}
});

/* handling operation button click */
document.getElementById('button-operations').addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
    document.getElementById('decimal-btn').disabled = false; //enabling decimal button for next number input

    if(numberInput === '' && numbersArray == '' && e.target.value != '-'){
        alert('A number is required before an operation'); // preventing operation without a number input
        return;
    }
    if(e.target.value == 'clear'){
        /*clears everything if clear button is clicked */
        numbersArray.splice(0,numbersArray.length);
        numberInput = '';
        numbersDisplay.innerHTML = '';
        operatorsDisplay.innerHTML = '';
        return;
    }
    if(operation == '='){
        document.getElementById('equals-btn').disabled = true; //preventing multiple equals clicks
    }
    if(operatorsDisplay.innerHTML == '='){
        /* handling immediate click of operators after clicking equal */
        operatorsDisplay.innerHTML = e.target.value;
        numberInput = '';
        operation = e.target.value;
        return;
    }else{
        numbersArray.push(Number(numberInput)); //pushing the current number input to the array
    }

    /* code below this will run everytime on clicking a operator (except clear button)*/

    numberInput = ''; //resetting number input for next number
    calculation(numbersArray,operation); //performing calculation based on previous operation
    operation = e.target.value;
    operatorsDisplay.innerHTML = operation; //displaying current operation
    if(String(numbersArray[numbersArray.length -1]).length > 12){ //handling display for large numbers
        if(numbersArray[numbersArray.length -1] < 10000 && !Number.isInteger(numbersArray[numbersArray.length -1]) && numbersArray[numbersArray.length -1] > -10000){
            numbersDisplay.innerHTML = (numbersArray[numbersArray.length - 1]).toFixed(9); //displaying up to 9 decimal places for numbers including larger decimals
            return;
        }
        numbersDisplay.innerHTML = (numbersArray[numbersArray.length - 1]).toExponential(6);//displaying in exponential form for large numbers
        return;
    }
    if(numbersArray[numbersArray.length - 1] === Infinity){ //handling infinity display
         numbersDisplay.innerHTML = 'NaN';
         numbersArray.splice(0);
        return;
    }
    numbersDisplay.innerHTML = (numbersArray[numbersArray.length - 1]) //displaying the result of the calculation
}
})
