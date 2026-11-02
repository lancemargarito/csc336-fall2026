
let randomDogImage;

async function getDog() {
    let response = await fetch("https://dogapi.dog/api/v2/breeds");
    let json = await response.json();
    // console.log(json);
    
    // First look, the Dog api is a page consisting of data, "meta", and "links."


    // for (let i = 0; i < 30; i++) { // iterating through the 30 data objects with the json data
    //     //console.log(json.data[i]);
    //     console.log(json.data[i].attributes);

    //     // Now have an array of objects listing:
    //     // ID, type (all "breed"), attributes (actual characteristics of dogs), and relationships
    //     // Everything besides attributes doesn't seem especially useful for data visualization.
    // }

    return json.data;
}




async function setup() {
    createCanvas(1000,1000);
    
    let dogData = await getDog();
    console.log(dogData)

    let randomDogIndex = Math.floor(random(0,30))
    let randomDogImagesLength = dogData[randomDogIndex].attributes.images.length
    let randomDogImagesIndex = Math.floor(random(0,randomDogImagesLength))
    console.log("length is" + randomDogImagesLength)


    // For both fetching random dogs and random images of those respective dogs
    // I needed the floor function so i get integers.
    

    randomDogImage = await loadImage(
        dogData[randomDogIndex].attributes.images[randomDogImagesIndex].url
    );

}

function draw() {
    image(randomDogImage, 100, 100)
}