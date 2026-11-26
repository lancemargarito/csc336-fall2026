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
    let json = await card.json();
    return json;
}

function lowerOrHigher(card_val, guess) {
    
}

higherLowerForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Preventing page from loading after clicking either button.

    let clickedButton = e.submitter; // checking which button was clicked

    if (clickedButton.value == "Start") {
        currentDeck = await getDeck();
        console.log("This is the current deck:" + currentDeck);

        clickedButton.remove();

        let drawnCard = await drawCard(currentDeck);
        console.log(drawnCard);
        
    } else {
       
    }

}) 