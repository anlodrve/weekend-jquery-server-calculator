$(document).ready(onReady);

// array on the client side 
let arrayCS = [];


function onReady() {
    // buttons
        $('.buttonRow button').on('click', addInput)
        $('#clear').on('click', clearInputs);
        $('.operatorButton').on('click', setOperatorFunction);
        $('#decimal').on('click', addInput);
        $('#equals').on('click', sendMath);
}

function addInput(){
  let buttonValue = $(this).val();
  let currentInput = $('#inputField').val();
  let totalInput = currentInput + buttonValue

  $('#inputField').val(totalInput);
  console.log('this is the total input', totalInput);
  }


function setOperatorFunction(event){
  //put variable in here for operator
   event.preventDefault
   // assign the operator to a variable
   $('.operatorButton').prop('disabled', true);
}

//  for clear button and for the render reset 
function clearInputs(){
  $('.operatorButton').prop('disabled', false);
  $('#inputField').val('');
}

// initial POST -send object to the server 
function sendMath(event) {
    event.preventDefault(); 
  // build out the object to send 
    
  let equation = $('#inputField').val();
  
  let number1 = '';
  let operator = '';
  let number2 = '';
  let completedNumber1 = false;

  for (i in equation) {
    if(equation[i]=== '+' || equation[i]=== '-' || equation[i]=== '*' || equation[i]=== '/'){
      operator = equation[i]; 
      completedNumber1 = true;
    }
    else if (completedNumber1 === true) {
        number2 += equation[i];
    } else if(equation[i] === '.' ){
      number1 += '.'
    } else if(isNaN(equation[i]) === false) {
        number1 += equation[i];
    }
  }
  
  let mathObjectCS = {
        number1: number1, 
        operator: operator, 
        number2: number2 
    }
    console.log(mathObjectCS);

  if(number1 !== '' && operator !== '' && number2 !== ''){
    // ajax to post 
    $.ajax({
        url: '/calculation',
        method: 'POST',
        data: mathObjectCS
      }).then((response) => {
        getResult();
      }).catch((error) => { 
        alert('Unable to post data to server')
        console.log(error)
      })} else {
        $('#placeForHistory').empty();
        $('placeForHistory').text('Invalid Input, please try again.');
      } // end else 
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



// function setOperatorFunction(event){
//   //put variable in here for operator
//    event.preventDefault
//    // assign the operator to a variable
//    setOperator = $(this).attr('value')
// }