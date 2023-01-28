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
        operator: setOperator,
        number2: $('#number2').val(),
        answer: ''
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
        console.log('inside GET');
        arrayCS = response;
        console.log(arrayCS);
        render();
      })
    }

function render(){
    //remove the old text
    $('#placeForAnswer').empty(); 
    $('#placeForHistory').empty();

    // remove input values
  console.log('in render mf');
    $('#number1').val('');
    $('#number2').val('');


   for(let mathObject of arrayCS){
    $('#placeForAnswer').text(`
      ${mathObject.answer}
    `)
    console.log(`${mathObject.number1} ${mathObject.operator} ${mathObject.number2} ${mathObject.answer}`)
    $('#placeForHistory').append(`
      <li>${mathObject.number1} ${mathObject.operator} ${mathObject.number2} = ${mathObject.answer} </li>`)
   };
};



