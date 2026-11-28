let startForm = document.querySelector("#startForm");
let lowerHigherForm = document.querySelector("#lowerHigherForm");

let cardDiv = document.querySelector("#cardDiv");
let leaderboardDiv = document.querySelector("#leaderboardDiv");

let currentDeck;

// These will hold the card json.
let currentCard;
let nextCard;

let streak = 0;

let specialCards = {
    "ACE": 1,
    "JACK": 11,
    "QUEEN": 12,
    "KING": 13
}

let suits = {
    "SPADES": 4,
    "HEARTS": 3, 
    "DIAMONDS": 2, 
    "CLUBS": 1 
} // The closest thing I can find to a universally agreed upon suit ranking is
// reverse alphabetical so that's what this game will use.

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
    questionDiv.innerHTML = "Will the next card be of higher or lower value?";
    cardDiv.append(questionDiv);

    let streakDiv = document.createElement("div");
    streakDiv.innerHTML = "Your streak is " + streak + "!";
    cardDiv.append(streakDiv);

    let lowerButton = document.createElement("button");
    lowerButton.value = "lower";
    lowerButton.innerHTML = "Lower!";
    lowerButton.id = "lowerButton";
    lowerHigherForm.append(lowerButton);

    let higherButton = document.createElement("button");
    higherButton.value = "higher";
    higherButton.innerHTML = "Higher!";
    higherButton.id = "higherButton";
    lowerHigherForm.append(higherButton);

} 

function compareCards(current, next) {
    let currentValue = 0;
    let nextValue = 0;

    let currentSuit = 0;
    let nextSuit = 0;

    if (!(current.value in specialCards)) {
        currentValue = Number(current.value);
    } else {
        currentValue = specialCards[current.value];
    }

    if (!(next.value in specialCards)) {
        nextValue = Number(next.value);
    } else {
        nextValue = specialCards[next.value];
    }

    currentSuit = suits[current.suit];
    nextSuit = suits[next.suit];

    if (nextValue > currentValue) {
        return 1;
    } else if (currentValue > nextValue) {
        return 0;
    } else {
        if (nextSuit > currentSuit) {
            return 1;
        } else if (currentSuit > nextSuit) {
            return 0;
        }
    }
        
}  
// This function turns the value and suits of both inputted cards into numerical values. Then, it compares them, returning 1 if the Next card is bigger or 0 if the currentCard is bigger.

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

    let lowerButton = document.querySelector("#lowerButton");
    let higherButton = document.querySelector("#higherButton");

    lowerButton.remove();
    higherButton.remove();

    // Remove buttons so they can't be spammed, causing current and next card to briefly be the same.

    let clickedButton = e.submitter; // Checking which button was clicked.

    let result = compareCards(currentCard,nextCard)

    if (
        ((clickedButton.value == "lower") && (result == 0))
        ||
        ((clickedButton.value == "higher") && (result == 1))
    ) // If the player was right, add one to their streak.
    {
        streak += 1;
    } else { // If the player was wrong, reset their streak.
        streak = 0;
    }
    
    await discardCard(currentCard.code);
    currentCard = nextCard;
    nextCard = await drawCard(currentDeck);

    render();

    console.log(currentCard.value + currentCard.suit);
    console.log(nextCard.value + nextCard.suit)
    console.log("Next card will be: " + clickedButton.value);

}) 



