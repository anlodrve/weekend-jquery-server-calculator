$(document).ready(onReady);

let arrayCS = [];

function onReady() {
    // buttons
        $('#equals').on('click', sendMath);
        $('.operatorButton').on('click', sendMath);

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
    }

    


// handle get requests 

