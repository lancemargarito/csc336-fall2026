let startForm = document.querySelector("#startForm");
let lowerHigherForm = document.querySelector("#lowerHigherForm");

let cardDiv = document.querySelector("#cardDiv");
let leaderboardDiv = document.querySelector("#leaderboardDiv");

let currentDeck;

// These will hold the card json.
let currentCard;
let previousCard;
let nextCard;

// These will be strings formatted as "X of Y" of the cards.
let currentCardFormatted;
let previousCardFormatted;
let nextCardFormatted;

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

    // let previousCardDiv = document.createElement("div");
    // previousCardDiv.innerHTML = "The last card was the " + previousCard.value + " of " + previousCard.suit;
    // cardDiv.append(previousCardDiv);

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
    
})

// startForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     currentDeck = await getDeck();
//     console.log("Deck retrieved:")
//     console.log(currentDeck)

//     previousCard = "No previous card."
//     currentCard = await drawCard(currentDeck);

//     previousCardFormatted = "No previous card."
//     currentCardFormatted = currentCard.value + " of " + currentCard.suit;

//     let previousCardDiv = document.createElement("div");
//     previousCardDiv.innerHTML = "The last card was: " + previousCardFormatted;
//     cardDiv.append(previousCardDiv);

//     let currentCardDiv = document.createElement("div");
//     console.log("Current card is:")
//     console.log(currentCard)
//     currentCardDiv.innerHTML = "The current card is the " + currentCardFormatted;
//     cardDiv.append(currentCardDiv);

//     let questionDiv = document.createElement("div");
//     questionDiv.innerHTML = "Will the next card be of higher or lower value?"
//     cardDiv.append(questionDiv);

//     let lowerButton = document.createElement("button");
//     lowerButton.value = "lower";
//     lowerButton.innerHTML = "Lower!";
//     lowerHigherForm.append(lowerButton);

//     let higherButton = document.createElement("button");
//     higherButton.value = "higher";
//     higherButton.innerHTML = "Higher!";
//     lowerHigherForm.append(higherButton);

//     startForm.remove();
//     discardCard(currentCard.code)

//     nextCard = await drawCard(currentDeck);
//     nextCardFormatted = nextCard.value + " of " + nextCard.suit;

// })

lowerHigherForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Preventing page from loading after clicking either button.

    let clickedButton = e.submitter; // Checking which button was clicked.

    previousCard = currentCard
    previousCardFormatted = currentCardFormatted

    currentCard = nextCard
    currentCardFormatted = nextCardFormatted

    nextCard = await drawCard(currentDeck);
    nextCardFormatted = nextCard.value + " of " + nextCard.suit;

    console.log(clickedButton.value);

    discardCard(previousCard.code); // Whether right or wrong, discard the current card.

}) 



