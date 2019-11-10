/******************************************
Treehouse Techdegree:
Eduardo Rafael Palacios Hernandez
FSJS project 5 - Public API Requests
******************************************/


//div with ID "gallery" where all 12 individual cards will go
const fullCard = document.querySelector('#gallery')
let results = [];

//API request
fetchData('https://randomuser.me/api/?results=12') //return a select # of users w/"RESULTS"
    //send data to "makeCards"
  .then( data => makeCards(data) )
    //catch error and display in console
  .catch( error => console.log('there\'s a problem ->', error) )


//function for API request and parsing of data for usage
async function fetchData(url){
  const users = await fetch(url); //API request
  const parseUsers = await users.json(); //parse to JSON
  return parseUsers.results;
}

//function to generate the user cards
function makeCards(data){
  //forEach as each user needs own card
  data.forEach( data => {
    //create div where each user card will inserted
    const div = document.createElement("div");
    //append new div to end of div w/ID "gallery" -> fullCard
    fullCard.appendChild(div);
    //provided template
    //set inner HTML of div with user information
    div.innerHTML =
    `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${data.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="card-text">${data.email}</p>
            <p class="card-text cap">${data.location.city}</p>
        </div>
    </div>
    `;

    //event listener to create a modular window for user that is selected
    div.addEventListener('click', event => {
      //create modal window
      makeModal(data);
    })
  })
}

//function to create the modal window
function makeModal(data){
  //format for correct date
  const dobMonth = data.dob.date.slice(5,7); //B-Day month
  const dobDay = data.dob.date.slice(8,10);
  const dobYear = data.dob.date.slice(0,4);

  //create div for modular window
  const modalDiv = document.createElement('div');
  //append newly created modular window to "fullCard" w/appendChild
  fullCard.appendChild(modalDiv);

  //provided template
  //set inner HTML of modalDiv with user information
  modalDiv.innerHTML =
  `
  <div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${data.picture.large}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
              <p class="modal-text">${data.email}</p>
              <p class="modal-text cap">${data.location.city}</p>
              <hr>
              <p class="modal-text">${data.cell}</p>
              <p class="modal-text">${data.location.street.number} ${data.location.street.name} ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
              <p class="modal-text">Birthday: ${dobMonth}/${dobDay}/${dobYear}</p>
          </div>
      </div>
      `;

  //select button to close the modal window
  const modalButton = document.querySelector('#modal-close-btn');
  modalDiv.addEventListener('click', event => {
    if( event.target.innerText === 'X' ){ //if the innerText of what is clicked is "X"
      modalDiv.style.display = 'none'; //hide the display
    }
  })
}


///
