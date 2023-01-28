$(document).ready(onReady);

// array on the client side 
let arrayCS = [];
// setting global variable for operator
let setOperator = '';

function onReady() {
    // buttons
        $('.operatorButton').on('click', setOperatorFunction);
        $('#equals').on('click', sendMath);
}

function setOperatorFunction(event){
   //put variable in here for operator
    event.preventDefault
    setOperator = $(this).attr('value')
 
}

//initial POST -send object to the server 
function sendMath(event) {
    event.preventDefault(); 

    let mathObjectCS = {
        number1: $('#number1').val(), 
        number2: $('#number2').val(),
        operator: setOperator
    }
    console.log(mathObjectCS);

    $.ajax({
        url: '/calculation',
        method: 'POST',
        data: mathObjectCS
      }).then((response) => {
    
        getResult();
      })
    } //end sendMath

// handle get requests 
    function getResult(){
      $.ajax({
        url: '/calculation',
        method: 'GET',
      }).then((response) => {
        console.log('inside GET')
        arrayCS = response
        //render();
      })
    }




