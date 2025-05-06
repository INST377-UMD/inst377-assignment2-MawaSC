//URL defined for random dog images
const imgU = "https://dog.ceo/api/breeds/image/random"
const dogImg = "https://dogapi.dog/api/v2/breeds"

//Carousel and dog info
const carousel = document.getElementById('slider-carousel')
const dogInfoDiv = document.getElementById('dog-info')

//Populate site with dog images in carousel
function populateSite() {
        const pop = [];

        //10 random dog images
        for (let i = 0; i < 10; i++) {
          pop.push(fetch(imgU).then(res => res.json()));
        }
      
        //Append images to carousel
        Promise.all(pop).then(results => {
          results.forEach(res => {
            const img = document.createElement("img");
            img.src = res.message;
            img.width = 750;
            img.height = 650;
            carousel.appendChild(img);
          });
      
          // Tell the HTML it's time to start the slider
          document.dispatchEvent(new Event('dogs-loaded'));
        });
      
  }

  //Event listener for buttons to show dog info when clicked
  document.getElementById('buttons').addEventListener('click', function(e) {
    if (e.target && e.target.matches('button')) {
        const dogInfo = document.getElementById('dog-info');
        dogInfo.innerHTML = "<p>This is info about the selected dog.</p>"; // Customize as needed
        dogInfo.style.display = "block"; // Show the white box
    }
    });

 //Fetch breed data and generate buttons for each breed
  var temp = ""
  fetch(dogImg)
    .then(res => res.json())
    .then((res) => {
          res.data.forEach(breed => {
            temp += "<button class = \"button-1\" role = \"button\" onclick = \"dogInfo('" + breed.id + "')\">" + breed.attributes.name + "</button>" + "<br />"
          });
          document.getElementById("buttons").innerHTML += temp 
          
    })
  

// Function to fetch and display info about dog breed
function dogInfo(dogId) {
    fetch(dogImg + "/" + dogId)
    .then(res => res.json())
    .then((res) => {
        //Dog breed info
        var name = res.data.attributes.name
        var desc = res.data.attributes.description
        var min = res.data.attributes.life.min
        var max = res.data.attributes.life.max
  
        dogInfoDiv.innerHTML = "<div class=\"w3-container w3-blue\"> <h1>Name: " 
        + name + "</h1> <h2> Description: " 
        + desc + "</h2> <h2> Min Life: " 
        + min + "</h2> <h2> Max Life: " 
        + max + "</h2> </div>"
    })
  }

  let isListening = false;

if (annyang) {
    //Voice commands
    const commands = {
      'hello': () => {
        alert('Hello World');
      },
      'change the color to *color': (color) => {
        document.body.style.backgroundColor = color;
      },
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
      },
      'load dog *breed': (breed) => {
        const buttons = document.querySelectorAll('#buttons button');
        const match = Array.from(buttons).find(btn =>
            btn.textContent.toLowerCase().includes(breed.toLowerCase())
        );

        if (match) {
            match.click(); // Simulate button click
        } else {
            alert(`Breed "${breed}" not found`);
        }
        }

    };
  
    // Add commands and start Annyang
    annyang.addCommands(commands);
    /*annyang.start();
  }*/
 // Toggle button behavior
 const listenOnB = document.getElementById('listen-on');
 const listenOffB = document.getElementById('listen-off');
 listenOnB.addEventListener('click', () => {
     annyang.start();
     console.log('Voice recongition started');
   });

       // Stop listening
    listenOffB.addEventListener('click', () => {
    annyang.abort();
    console.log('Voice recognition stopped');
 });
}
  
  window.onload = populateSite;