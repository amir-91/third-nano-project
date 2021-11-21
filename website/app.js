/* Global Variables */
const zipCode = document.getElementById('zip')
const content = document.getElementById('feelings')

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// used zip codes
// 56273
// 25126


// Personal API Key for OpenWeatherMap API
const apiKey = '4bf6b925d171cc2f967453fca80a9092&units=imperial';


// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
document.getElementById('generate').addEventListener('click', ()=> {
  fetchData()
})

/* Function to GET Web API Data*/
const fetchData = () => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => postData('/addData', {temperature: data.main.temp, date: newDate, feelings: content.value}))
  .then(() =>retrieveData())
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    console.log(data)
    const response = await fetch (url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    try {
      const newData = await response.json()
      console.log(newData)
      return newData
    } catch(error) {
      console.log("error", error)
    }
}

/* Function to GET Project Data */
const retrieveData = async () =>{
  const request = await fetch('/all');
  try {
  // Transform into JSON
  const allData = await request.json()
  // Write updated data to DOM elements
  document.getElementById('temp').innerHTML = Math.round(allData.temperature)+ ' degrees';
  document.getElementById('date').innerHTML =allData.date;
  document.getElementById('content').innerHTML = allData.feelings
  }
  catch(error) {
    console.log('error', error);
    // appropriately handle the error
  }
 }