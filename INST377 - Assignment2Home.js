//Allows HTML document to load first
document.addEventListener('DOMContentLoaded', function () {
    //API URL
    const api_url = "https://zenquotes.io/api/random/";
    const quotes = document.getElementById('quotes-box');
  
    //Function calls API and fetches a quote
    async function getapi(url) {
      try {
        const response = await fetch(url); //Fetches data
        const data = await response.json(); //Convert response to JSON
        console.log(data);
        //Quote display
        quotes.innerHTML += "\"" + data[0].q + "\"" + " - " + data[0].a + "<br />";
      } catch (error) {
        console.error("Failed to fetch quote:", error);
        quotes.innerHTML = "Sorry, couldn't load a quote at the moment.";
      }
    }
  
    getapi(api_url); //Call function
  });
  

let isListening = false;

if (annyang) {
    //Voice commands
    const commands = {
    //Say "hello"
      'hello': () => {
        alert('Hello World');
      },
      // Say "Change the color to any color, background color changes"
      'change the color to *color': (color) => {
        document.body.style.backgroundColor = color;
      },
      //Say "Navigate" to any page available
      'navigate to *page': (page) => {
        const pageLower = page.toLowerCase();
        if (pageLower.includes('home')) {
          window.location.href = 'INST377 - Assignment2.html';
        } else if (pageLower.includes('stocks')) {
          window.location.href = 'INST377 - A2Stocks.html';
        } else if (pageLower.includes('dogs')) {
          window.location.href = 'INST377 - A2Dogs.html';
        } else {
          alert('Page not recognized');
        }
      }
    };
  
    // Add commands and start Annyang
    annyang.addCommands(commands);
    /*annyang.start();
  }*/
 // Toggle button behavior - Start and Stop
 const listenOnB = document.getElementById('listen-on');
 const listenOffB = document.getElementById('listen-off');
 //When listen on button is clicked, start
 listenOnB.addEventListener('click', () => {
     annyang.start();
     console.log('Voice recongition started');
   });

       //Stop listening when listen off button is clicked
    listenOffB.addEventListener('click', () => {
    annyang.abort();
    console.log('Voice recognition stopped');
 });
}
  