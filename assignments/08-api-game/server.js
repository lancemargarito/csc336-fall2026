// The server will be the part that fetches the outside API and sends back what's needed.

import "dotenv/config";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

let app = express();
let port = process.env.PORT || 3000;

// app.use(express.json());
app.use(express.static("public"));

let client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
console.log("Connected to MongoDB");

let database = client.db("assignment08")
let games = database.collection("games")

// Making a database to store games and fetch best ones for the leaderboards. 


async function getDeck() {
    let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    let json = await response.json();
    return json.data;
}

app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});