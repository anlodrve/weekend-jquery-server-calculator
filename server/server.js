// logic for the calculator must be located on the server

// here are the global variables
const express = require('express');
const app = express(); 
const PORT = 5000;
// array server side
const arraySS = [];


app.use(express.urlencoded({extended:true}))
// static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })

  //initial server receiving the post
app.post('/calculation', (request, response) => {
    console.log('inside post');
    // get the data from client
    let mathObjectSS = request.body;
    // push to array on server side 
    arraySS.push(mathObjectSS); 
    response.sendStatus(201);
})

app.get('/calculation', (request, response) => {
  // this is where caluculations need to go 
  for (let object of arraySS){
    if (object.operator === '+'){
    object.answer = Number(object.number1) + Number(object.number2) 
    }
    else if (object.operator === '-'){
      object.answer = Number(object.number1) - Number(object.number2) 
    }
    else if (object.operator === '*'){
      object.answer = Number(object.number1) * Number(object.number2) 
    }
    else if (object.operator === '/'){
      object.answer = Number(object.number1) / Number(object.number2) 
    }
  console.log(arraySS);
  };
  response.send(arraySS);
});



// takes two input values and puts them into a mathematical equation 
// 
