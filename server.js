/* Empty JS object to act as endpoint for all routes */
projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());


/* Initialize the main project folder*/
app.use(express.static('website'));

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
  res.send(projectData)
})


// Post Route
app.post('/addData', addData);

function addData(req,res){

projectData['date'] = req.body.date;
projectData['temperature'] = req.body.temperature;
projectData['feelings'] = req.body.feelings;

res.send(projectData);
// console.log("The data pushed is "+newData)
}


const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };
