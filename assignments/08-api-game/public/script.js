let higherLowerForm = document.querySelector("#higherLowerForm");

let cardImageDiv = document.querySelector("#cardImageDiv");
let leaderboardDiv = document.querySelector("#leaderboardDiv");

let currentDeck;

async function getDeck() {
    let newDeck = await fetch("https://card-game-0kfd.onrender.com/newdeck");
    let json = await newDeck.json();
    return json.deck_id; // Only intial necessary part to hand over to frontend is deck ID.
}

async function drawCard(deck) {
    let card = await fetch("https://card-game-0kfd.onrender.com/drawcard/" + deck)
    return card;
}

function lowerOrHigher(card_val, guess) {
    
}

higherLowerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Preventing page from loading after clicking either button.
    console.log("submitted!");

    let clickedButton = e.submitter; // checking which button was clicked

    if (clickedButton.value == "Start") {

        currentDeck = getDeck();
        console.log(currentDeck);

        clickedButton.remove();

        let card = drawCard(currentDeck);
        console.log("card is:" + card);
        
        // Calls getDeck, which fetches from my server, which in turn fetches from the card of
        // decks API. The only part of the json that the frontend ultimately gets is the deckID,
        // then the start button is removed afterwards.

    } else {
       
    }

}) 