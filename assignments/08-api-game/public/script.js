let higherButton = document.querySelector("#higherButton");
let lowerButton = document.querySelector("#lowerButton");
let higherLowerForm = document.querySelector("#higherLowerForm");

let cardImageDiv = document.querySelector("#cardImageDiv");
let leaderboardDiv = document.querySelector("#leaderboardDiv");




higherLowerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Preventing page from loading after clicking either button.
    console.log("submitted!");

    let clickedButton = e.submitter; // checking which button was clicked

    // doesn't do anything beyond console right now, but this makes sure I can detect whether
    // a player thinks the next card will be higher or lower value
    // if (clickedButton.value == "higherButton") {
    //     console.log("Next card will be higher value.")
    // } else if (clickedButton.value == "lowerButton") {
    //     console.log("Next card will be lower.")
    // } else if (clickedButton.value == "restart") {
    //     console.log("Restart game.")
    // }
    if (clickedButton.value == "restart") {
        console.log("restart game")
    } else {
        
        // let response = await fetch("/guess/:higherOrLower")

    }


}) 
