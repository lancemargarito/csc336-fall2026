// The server will be the part that fetches the outside API and sends back what's needed.

import "dotenv/config";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

let app = express();
let port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

let client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
console.log("Connected to MongoDB");

let database = client.db("assignment08")
let games = database.collection("games")

// First, I want to make a route that fetches the outside API to create a new deck.

let deck_id;
let current_card;

app.get("/newdeck", async (req,res) => {
    
    let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    let json = await response.json();

    res.send(json)
}) // get a deck (the id)

app.get("/drawcard/:deckID", async (req, res) => {
    let deckID = req.params.deckID

    let card = await fetch("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1");
    let cardJson = await card.json();

    return cardJson.cards[1];
}) // Simplifying how much is returned to frontend, so that they only get the card code and images.

// app.get("/discard/:deckID/:cardCode", async (req,res) => {
//     let cardCode = req.params.cardCode;
//     let deckID = req.params.deckID;
//     pileFetch = "https://deckofcardsapi.com/api/deck/" + deckID + "/pile/trash" + "/add/?cards=" + cardCode

//     let discarded = await fetch(pileFetch);
//     discardedJson = await discarded.json();
//     res.send(discardedJson);
// })


// app.get("/guess/:higherOrLower", async (req, res) => {
//     const guess = req.params.higherOrLower;
    
//     if (guess == "higher") {
//         console.log("higher");
//     } 
//     if (guess == "lower") {
//         console.log("lower");
//     }

//     let nextCard = await fetch("https://deckofcardsapi.com/api/deck/xnek1tte1dvu/draw/?count=52");
//     let nextCardJson = await nextCard.json();

//     res.send(nextCardJson);

// })

app.get("/backOfCard", async (req, res) => {
    backImage = await fetch("https://deckofcardsapi.com/static/img/back.png");
    console.log(backImage);
})

app.listen(port, () => {
    console.log("Server running.");
});
