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

app.get("/newdeck", async (req,res) => {
    let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    let json = await response.json();

    res.send(json)
}) // Get a new deck.

app.get("/drawcard/:deckID", async (req, res) => {
    let deckID = req.params.deckID

    let card = await fetch("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1");
    let json = await card.json();

    res.send(json.cards[0]) // Accessing object inside array, inside of cards, inside of returned json.
}) // Drawing a card from a given deck.

app.get("/discard/:deckID/:cardCode", async (req,res) => {
    let cardCode = req.params.cardCode;
    let deckID = req.params.deckID;

    let pile = await fetch("https://deckofcardsapi.com/api/deck/" + deckID + "/pile/trash" + "/add/?cards=" + cardCode);
    let json = await pile.json();

    console.log(cardCode + "discarded")

    res.send(json) // I don't actually need anything sent back, but I'm having the server send the response so I can verify on the front end that the card has been discarded from the actual deck.
})

app.get("/guess/:higherOrLower", async (req, res) => {
    let guess = req.params.higherOrLower;
    
    if (guess == "higher") {
        console.log("higher");
    } 
    if (guess == "lower") {
        console.log("lower");
    }

    let nextCard = await fetch("https://deckofcardsapi.com/api/deck/xnek1tte1dvu/draw/?count=52");
    let nextCardJson = await nextCard.json();

    res.send(nextCardJson);

})

app.listen(port, () => {
    console.log("Server running.");
});
