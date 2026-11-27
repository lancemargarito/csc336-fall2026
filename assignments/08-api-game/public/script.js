let startForm = document.querySelector("#startForm");
let lowerHigherForm = document.querySelector("#lowerHigherForm");

let cardDiv = document.querySelector("#cardDiv");
let leaderboardDiv = document.querySelector("#leaderboardDiv");

let currentDeck;

// These will hold the card json.
let currentCard;
let nextCard;

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

function render() {
    cardDiv.innerHTML = "";
    lowerHigherForm.innerHTML = "";

    let currentCardDiv = document.createElement("div");
    currentCardDiv.innerHTML = "The current card is the " + currentCard.value + " of " + currentCard.suit;
    cardDiv.append(currentCardDiv);

    let questionDiv = document.createElement("div");
    questionDiv.innerHTML = "Will the next card be of higher or lower value?"
    cardDiv.append(questionDiv);

    let lowerButton = document.createElement("button");
    lowerButton.value = "lower";
    lowerButton.innerHTML = "Lower!";
    lowerHigherForm.append(lowerButton);

    let higherButton = document.createElement("button");
    higherButton.value = "higher";
    higherButton.innerHTML = "Higher!";
    lowerHigherForm.append(higherButton);

} 

startForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    currentDeck = await getDeck();

    console.log("Deck:")
    console.log(currentDeck)

    currentCard = await drawCard(currentDeck);
    nextCard = await drawCard(currentDeck)

    render();

    startForm.remove();

    // When the player hits start, it draws a card. The player then has to guess 
    // whether the next will be higher or lower. The lowerHigherForm event listener takes
    // over from.
    
})

lowerHigherForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Preventing page from loading after clicking either button.

    let clickedButton = e.submitter; // Checking which button was clicked.

    discardCard(currentCard.code);
    currentCard = nextCard;
    nextCard = drawCard(currentDeck);

    render();

    console.log(clickedButton.value);

}) 



