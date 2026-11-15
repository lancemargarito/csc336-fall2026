import express from 'express';

const app = express();
const port = process.env.port || 3000;

app.use(express.static("public")); // serves the actual files in the public folder

app.get('/about', (req, res) => {
    res.send(`This page uses information fetched from the Dog API (dogapi.dog) for a visualization
        of spheres bouncing around on a canvas, with the help of p5.js. The name of dog breeds are
        overlaid on the spheres, while the color of the spheres depends on the color of their coat
        (but doesn't always parse correctly because the way coats are categorized doesn't always allow for one color e.g. "Tri-color", "fawn", 
        in which case the spheres are purple instead), the radius of the circles is based on the
        maximum height of a male of the breed, while the speed is based on the energy level of the breed.
        `)
}
)

// Serves the about page for the visualization of assignment 6. I explain what the assignment actually is and what the different parts of the visualization are based on.

app.listen(port); // how the page can actually listen to requests

