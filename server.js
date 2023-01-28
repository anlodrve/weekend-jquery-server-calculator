// logic for the calculator must be located on the server

// here are the global variables
const express = require('express');
const app = express(); 
const PORT = 5000;
const arraySS = [];

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))
// static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })

  //initial server receiving the post
app.post('/calculation', (request, response) => {
    let mathObjectSS = request.body;
    arraySS.push(mathObjectSS); 

    response.sendStatus(201);
})



// takes two input values and puts them into a mathematical equation 
// 
