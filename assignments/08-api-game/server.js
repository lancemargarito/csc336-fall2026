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

app.get("/newdeck", async (req,res) => {
    let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    let json = await response.json();
    res.send(json)
}) // Get a new deck.

app.get("/drawcard/:deckID", async (req, res) => {
    let deckID = req.params.deckID

    let card = await fetch("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1");
    let json = await card.json();

    res.send(json);
}) // Drawing a card from a given deck.

app.get("/discard/:deckID/:cardCode", async (req,res) => {
    let cardCode = req.params.cardCode;
    let deckID = req.params.deckID;

    let response = await fetch("https://deckofcardsapi.com/api/deck/" + deckID + "/pile/trash/add/?cards=" + cardCode);
    let json = await response.json();
    res.send(json);
})

app.get("/returnCardsAndShuffle/:deckID", async (req, res) => {
    let deckID = req.params.deckID;

    let response = await fetch("https://deckofcardsapi.com/api/deck/" + deckID + "/pile/trash/return/");
    // Returns everything from the discarded ("trash") cards pile back to the main deck.
    let jsonOne = await response.json();
    
    let responseTwo = await fetch("https://deckofcardsapi.com/api/deck/" + deckID + "/shuffle/");
    // Shuffle the deck.
    let jsonTwo = await responseTwo.json();
    
    res.send(jsonOne,jsonTwo);
})

app.post("/postScore/:user/:score", async (req, res) => {
    let username = req.params.user;
    let score = req.params.score;

    let scoreSubmission = {
        username : username,
        score: score
    };

    await games.insertOne(scoreSubmission);

    res.send("Posted!")
})



app.listen(port, () => {
    console.log("Server running.");
});
