let higherLowerForm = document.querySelector("#higherLowerForm");

let cardImageDiv = document.querySelector("#cardImageDiv");
let leaderboardDiv = document.querySelector("#leaderboardDiv");

let currentDeck;


async function getDeck() {
    let newDeck = await fetch("https://card-game-0kfd.onrender.com/newdeck");
    let json = await newDeck.json();

    return json.deck_id; // Only intial necessary part to hand over to frontend is deck ID.
}



higherLowerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Preventing page from loading after clicking either button.
    console.log("submitted!");

    let clickedButton = e.submitter; // checking which button was clicked

    if (clickedButton.value == "Start") {
        currentDeck = getDeck();
        console.log(currentDeck);

    } else {
       console.log("button other than start");

    }


}) 
