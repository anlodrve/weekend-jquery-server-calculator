$(document).ready(onReady);

// array on the client side 
let arrayCS = [];
// setting global variable for operator
let setOperator = '';

function onReady() {
    // buttons
        $('.operatorButton').on('click', setOperatorFunction);
        $('#equals').on('click', sendMath);
        $('#clear').on('click', clearInputs);
}

//  for clear button and for the render reset 
function clearInputs(){
  $('#number1').val('');
  $('#number2').val('');
}

function setOperatorFunction(event){
   //put variable in here for operator
    event.preventDefault
    // assign the operator to a variable
    setOperator = $(this).attr('value')
}

// initial POST -send object to the server 
function sendMath(event) {
    event.preventDefault(); 
  // build out the object to send 
    let mathObjectCS = {
        number1: $('#number1').val(), 
        operator: setOperator,
        number2: $('#number2').val(),
        answer: ''
    }
    console.log(mathObjectCS);
    // ajax to post 
    $.ajax({
        url: '/calculation',
        method: 'POST',
        data: mathObjectCS
      }).then((response) => {
    
        getResult();
      }).catch((error) => { 
        console.log(`POST error` )}) 
    } //end sendMath

// handle get requests 
    function getResult(){
      $.ajax({
        url: '/calculation',
        method: 'GET',
      }).then((response) => {
        console.log('inside GET');
        // put response from server into the Client Side array
        arrayCS = response;
        console.log(arrayCS);
        render();
      }).catch((error) => { 
        console.log(`GET error`)}) 
    }

function render(){
    //remove the old text
    $('#placeForAnswer').empty(); 
    $('#placeForHistory').empty();

    // remove input values
  console.log('in render mf');
  clearInputs();

   for(let mathObject of arrayCS){
    $('#placeForAnswer').text(`
      ${mathObject.answer}
    `)
    console.log(`${mathObject.number1} ${mathObject.operator} ${mathObject.number2} ${mathObject.answer}`)
    $('#placeForHistory').append(`
      <li>${mathObject.number1} ${mathObject.operator} ${mathObject.number2} = ${mathObject.answer} </li>`)
   };
};



