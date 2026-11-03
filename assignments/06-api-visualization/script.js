
let dogs = [];
let totalDogs = 5;

async function getDog() {
    let response = await fetch("https://dogapi.dog/api/v2/breeds");
    let json = await response.json();
    return json.data;

    // Accessing dogAPI data. I didn't return all the json because 
    // I don't think the "meta" or "links" data is useful for me and makes
    // accessing other data slightly more difficult in the setup.
}

class Dog {
    constructor(breedName, energy, coatColor, height,x,y) {
        this.breedName = breedName; 
        this.energy = energy; // Speed is based of a breeds energy.
        this.coatColor = coatColor; // Circle fill is based on the first available coat color, but it doesn't always parse correctly because of how colors are listened in the API (E.g. "tricolor")
        this.height = height; // Circle radius is based off max male height of a breed's dogs.
        this.x = x;
        this.y = y;

        this.xSpeed = this.energy
        this.ySpeed = this.energy

    }

    update() {
        fill(this.coatColor)
        circle(this.x,this.y,this.height);
        
        fill("purple");
        stroke("black");
        textSize(15);
        textAlign(CENTER);
        text(this.breedName, this.x, this.y, this.height, this.height);

        // Whenever one of the dog circles hits a wall, it should change direction.
        // Originally I wanted these to have the image of dogs, but I kept running 
        // into a CORS error and I couldn't figure out how to resolve it.

        if (this.x <= 0 || this.x >= width) {
            this.xSpeed = -this.xSpeed
        }

        if (this.y <= 0 || this.y >= height) {
            this.ySpeed = -this.ySpeed
        }

        this.x += this.xSpeed
        this.y += this.ySpeed
        

        fill(this.coatColor)
        circle(this.x,this.y,this.height);
        
    }

}

async function setup() {
    createCanvas(500,500);
    imageMode(CENTER)

    let dogData = await getDog();

    let filteredDogData = dogData.filter((_, index) => index !== 27);


    console.log(filteredDogData)

    for (let i = 0; i < totalDogs; i++) {

        let randomDogBreedAttributes = filteredDogData[Math.floor(random(0,29))].attributes;
        // Everything besides the attributes isn't especially useful.
        // 30 dog breeds total so choosing a random integer out of 30.

        // // console.log(randomDogBreedAttributes)
        // console.log(randomDogBreedAttributes.coat)

        let dog = new Dog( // All attributes accessed are used to construct dogs and are part of the visualization.
                randomDogBreedAttributes.name,
                randomDogBreedAttributes.traits.energy,
                randomDogBreedAttributes.coat.colors[1],
                randomDogBreedAttributes.male_height.max,
                Math.floor(random(0,height)),
                Math.floor(random(0,width))
                );
        
        dogs.push(dog);
        }

    }
    
    

function draw() {

    background(100,100,100);

    for (let pups of dogs) {
        pups.update(); // updating dog positions
    }

}

