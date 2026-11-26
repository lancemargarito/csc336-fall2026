let startForm = document.querySelector("#startForm")

let cardDiv = document.querySelector("#cardDiv");
let leaderboardDiv = document.querySelector("#leaderboardDiv");

let currentDeck;

// These will hold the card json.
let currentCard;
let previousCard;

// These will be strings formatted as "X of Y" of the cards.
let currentCardFormatted;
let previousCardFormatted;

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

async function discardCard(code) {

    let discard = await fetch("https://card-game-0kfd.onrender.com/discard/" + currentDeck + "/" + code);
    let json = await discard.json();
    return json;
}

startForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    currentDeck = await getDeck();
    console.log("Deck:", currentCard)

    previousCard = "No previous card."
    currentCard = await drawCard(currentDeck);

    previousCardFormatted = "No previous card."
    currentCardFormatted = currentCard.value + " of " + currentCard.suit;

    let previousCardDiv = document.createElement("div");
    previousCardDiv.innerHTML = "The last card was: " + previousCardFormatted;
    cardDiv.append(previousCardDiv);

    let currentCardDiv = document.createElement("div");
    currentCardDiv.innerHTML = "The current card is the " + currentCard
    cardDiv.append(currentCardDiv);

    let lowerHigherForm = document.createElement("form");
    lowerHigherForm.id = "lowerHigherForm";

    let lowerButton = document.createElement("button");
    lowerButton.value = "lower";
    lowerButton.innerHTML = "Lower!";
    lowerHigherForm.append(lowerButton);

    let higherButton = document.createElement("button");
    higherButton.value = "higher";
    higherButton.innerHTML = "Higher!";
    lowerHigherForm.append(higherButton);

    startForm.remove();
})

let lowerHigherForm = document.querySelector("#lowerHigherForm");

lowerHigherForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Preventing page from loading after clicking either button.

    let clickedButton = e.submitter; // Checking which button was clicked.

    console.log(clickedButton);

}) 



