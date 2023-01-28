$(document).ready(onReady);

// array on the client side 
let arrayCS = [];

function onReady() {
    // buttons
        $('.operatorButton').on('click', setLastOperator);
        $('#equals').on('click', sendMath);
}

function setLastOperator(event){
    event.preventDefault
  //put variable in here for .val()
}

//initial POST -send object to the server 
function sendMath(event) {
    event.preventDefault(); 

    let mathObjectCS = {
        number1: $('#number1').val(), 
        number2: $('#number2').val(),
        operator: $('.operatorButton').val()
    }

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




