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
    return json;
}

async function drawCard() {
    let card = await fetch("https://card-game-0kfd.onrender.com/drawcard/" + currentDeck.deck_id)
    let json = await card.json();
    return json;
}

async function discardCard(code) {
    let response = await fetch("https://card-game-0kfd.onrender.com/discard/" + currentDeck.deck_id + "/" + code);
    let json = await response.json();
    return json;
}

async function returnCardsAndShuffle() {
    let response = await fetch("https://card-game-0kfd.onrender.com/returnCardsAndShuffle/" + currentDeck.deck_id);
    let json = await response.json();
    return json;
}

function render() {
    cardDiv.innerHTML = "";
    lowerHigherForm.innerHTML = "";

    let currentCardDiv = document.createElement("div");
    currentCardDiv.innerHTML = "The current card is the " + currentCard.cards[0].value + " of " + currentCard.cards[0].suit;
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
    lowerHigherForm.append(lowerButton);

    let higherButton = document.createElement("button");
    higherButton.value = "higher";
    higherButton.innerHTML = "Higher!";
    lowerHigherForm.append(higherButton);

} 

async function lossRender() {
    cardDiv.innerHTML = "";
    lowerHigherForm.innerHTML = "";

    let lostDiv = document.createElement("div");
    lostDiv.innerHTML = "You lost!"
    cardDiv.append(lostDiv);

    let streakDiv = document.createElement("div");
    streakDiv.innerHTML = "Your streak was " + streak + "!";
    cardDiv.append(streakDiv);

    let scoreSubmissionForm = document.createElement("form");
    lowerHigherForm.append(scoreSubmissionForm);

    let usernameInput = document.createElement("input");
    usernameInput.placeholder = "Enter username";
    scoreSubmissionForm.append(usernameInput);

    let submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit"
    scoreSubmissionForm.append(submitButton);
    
    scoreSubmissionForm.addEventListener("submit", (e) => {
        e.preventDefault();
        postScore(String(usernameInput.value), Number(streak));

    })
}

async function postScore(username, score) {
    let message = await fetch("https://card-game-0kfd.onrender.com/postScore/" + username + "/" + score)
    let json = message.json();
    return json;
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
    console.log(currentDeck.deck_id)

    currentCard = await drawCard();
    nextCard = await drawCard()

    render();
    
    startForm.remove();

    // When the player hits start, it draws a card. The player then has to guess 
    // whether the next will be higher or lower. The lowerHigherForm event listener takes
    // over from.

    console.log(currentCard.cards[0].value + " of " + currentCard.cards[0].suit);
    console.log(nextCard.cards[0].value + " of " + nextCard.cards[0].suit);
    
})

lowerHigherForm.addEventListener("submit", async (e) => {

    e.preventDefault(); // Preventing page from loading after clicking either button.

    let clickedButton = e.submitter; // Checking which button was clicked.

    let result = compareCards(currentCard.cards[0],nextCard.cards[0]);

    if (
        ((clickedButton.value == "lower") && (result == 0))
        ||
        ((clickedButton.value == "higher") && (result == 1))
    ) // If the player was right, add one to their streak.
    {
        streak += 1;
    } else { // If the player was wrong.
        lossRender();
    }
    
    let discard = await discardCard(currentCard.cards[0].code); 
    currentCard = nextCard;

     console.log("Remaining cards: " + currentCard.remaining);

    if (nextCard.remaining < 1) { // Card json has the number of remaining cards in deck (that aren't in a pile).
        console.log("Shuffling the deck...");
        let shuffle = await returnCardsAndShuffle();
    }

    nextCard = await drawCard();

    console.log("Current card: " + currentCard.cards[0].value, currentCard.cards[0].suit);
    console.log("Next card: " + nextCard.cards[0].value, nextCard.cards[0].suit)
    console.log("Button clicked: " + clickedButton.value)

    render();

}) 



