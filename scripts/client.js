$(document).ready(onReady);

function onReady() {
    // buttons
        $('#additionButton').on('click', sendData);
        $('#subtractionButton').on('click', sendData);
        $('#multiplicationButton').on('click', sendData);
        $('#divisionButton').on('click', sendData); 

}
let arrayCS = [];

function sendMath(event) {
    event.preventDefault(); 

    let mathObjectCS = {
        number1: $('#number1').val(), 
        number2: $('#number2').val(),
        operator: $('.operatorButton').val()
    }



}
// handle get requests 

