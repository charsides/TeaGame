var allPlayers = [];
const gif = document.getElementById("gif");
const submit = document.getElementById("submitButton");
const input = document.getElementById("nameInput");
const ul = document.getElementsByTagName('ul')[0];
const play = document.getElementById("pickButton");
const reset = document.getElementById("resetButton");
const players = document.getElementById("playersList");
const loser = document.getElementById("loserName");
const reveal = document.getElementById("revealLoser");
const preGameText = document.getElementById("preGameText");
// Giphy API - gif variables
const api = "https://api.giphy.com/v1/gifs/search?";	
const apiKey = "&api_key=npwRMkXxt3amqE6cqXg4T4gI0sWHNqZm";
const coffeeGif = "&q=coffee";
const dislikeGif = "&q=facepalm";
var html;
var chosenGif;

const noPlayers = {
    "closeButton": true,
    "debug": true,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
    };
const onePlayer = {
    "closeButton": true,
    "debug": true,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
    };
  const emptyInput = {
    "closeButton": true,
    "debug": true,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
    };


// function to add names inputted to the list of players and print to page

function addPlayer() {
    let li = document.createElement("li");
    let newPlayer = input.value;
    if (newPlayer != "") {
        newPlayer = newPlayer.charAt(0).toUpperCase() + newPlayer.slice(1);
        allPlayers.push(newPlayer);
        console.log(allPlayers);
        players.style.display = "block";
        li.innerHTML = newPlayer + ", ";
        ul.appendChild(li);
        input.value = "";
    } else {
        toastr.options = emptyInput;
        toastr["info"]("Cannot add players, input field is empty", "No new player");
    }
};

// event listener for clicking add button

submit.addEventListener('click', addPlayer);

// event listener for pressing enter to submit new player

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      submit.click();
    }
  });

// function to randomly pick an element from the array of players

function pickBrewer() {
    if (play.innerHTML == "Pick a brewer") {
        if (allPlayers.length == 1) {
            toastr.options = onePlayer;
            toastr["info"]("Please enter at least two player's names", "More players needed!")
        } else if (allPlayers != "") {
            var brewer = allPlayers[Math.floor(Math.random() * allPlayers.length)];
            preGameText.style.display = "none";
            reveal.style.display = "block";
            loser.style.display = "block";
            setTimeout( () => {
                loser.innerHTML = brewer;
                play.innerHTML = "Pick again";
                setGif(dislikeGif);
            }, 3000)
            } else {
                toastr.options = noPlayers;
                toastr["info"]("Please enter at least two player's names", "No players");
            }
    } else if (play.innerHTML == "Pick again") {
        brewer = allPlayers[Math.floor(Math.random() * allPlayers.length)];
        loser.innerHTML = brewer;
        setGif(dislikeGif);
    }
}


// event listener for when 'Pick a brewer' button is clicked, the pickBrewer function is called

play.addEventListener('click', pickBrewer);

// function to clear array and hide ul

function resetPlayers() {
    allPlayers.length = 0;
    ul.innerHTML = "";
    players.style.display = "none";
    reveal.style.display = "none";
    loser.style.display = "none";
    loser.innerHTML = "";
    play.innerHTML = "Pick a brewer";
    preGameText.style.display = "block";
    input.value = "";
    setGif(coffeeGif);
}

// event listener for when 'Refresh list' is clicked, the resetPlayers function is called

reset.addEventListener('click', resetPlayers);

// giphy api functions

function setGif(value){
    fetchData(api + apiKey + value)
    .then(data => {
        var randomGifNumber = Math.floor(Math.random() * data.data.length); 
        chosenGif = data.data[randomGifNumber].images.fixed_height.url;
        generateGif(chosenGif);
        console.log(data);
    })
}
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const res = await checkStatus(response);
        return res.json();
    }
    catch (error) {
        return console.log('error', error);
    }
}

setGif(coffeeGif);

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText)); 
    }
}

function generateGif(data) {
    html = `
        <img src='${data}' alt="gif">
        `;
    gif.innerHTML = html;
}
