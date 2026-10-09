let product_catalog = [
    { 
        recordName: "LA",
        artist: "Blu",
        genre: "Hip-Hop",
        price: "19.99",
        albumPhoto: "https://f4.bcbits.com/img/a4293948391_10.jpg",
        description: `Alongside Oakland-bred producer Sndtrak, Blu completely leans
        into the aesthetic of West Count Rap that most fans associate with the region by
        rapping about Los Angeles gang-culture and aspirations of wealth.` ,
    },
    {
        recordName: "Mellon Collie and The Infinite Sadness",
        artist: "The Smashing Pumpkins",
        genre: "Alternative Rock",
        price: "39.99",
        albumPhoto: "https://thumb.wikimedia.org/wikipedia/en/thumb/7/76/The_Smashing_Pumpkins_-_Mellon_Collie_And_The_infinite_Sadness.jpg/250px-The_Smashing_Pumpkins_-_Mellon_Collie_And_The_infinite_Sadness.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
        description: `The Smashing Pumpkin's third studio album is a 28-track record released as a triple-LP,
        featuring a wide array of music styles that include art rock, grunge, alternative rock, and heavy metal. The 
        two halves of the album conceptually represent day and night, with songwriter Billy Corgan aiming to 
        sum up his feelings as a youth that he "was never able to voice articulately."'
        `
    },
    {
        recordName: "The Return of the Space Cowboy",
        artist: "Jamiroquai",
        genre: "Acid Jazz",
        price: "29.99",
        albumPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4oBiV-91Faoj7GjJvAUHVAPb7bDipmDGv7OA0SYSmbA&s=10",
        description: `Following the musical direction of their debut, Emergency on Planet Earth (1993),
        this English funk and acid jazz album is characterized by complex songwriting that addresses street life, hope, loss,
        Jay Kay's drug use, and social matters regarding Native Americans youth protests.`
    }, 
    {
        recordName: "Glowing in the Darkest Night",
        artist: "Pretty Lights",
        genre: "Electronic",
        price: "29.99",
        albumPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeBfI5luN5___kRT9HIzDGL--b794xsRA3wpiE0R5PRA&s=10",
        description: `Pretty Light's 2010 EP is a soundscape of instruments, samples, and glitches
        that frequently veers across a variety of styles to create a dark, brooding, and bouncy project
        that matches the description: "Glowing in the Darkest Night."
        `
    },
    {
        recordName: "Black of Both Sides",
        artist: "Yasiin Bey",
        genre: "Hip-Hop",
        price: "29.99",
        albumPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOMiIjtBiC1msaFNgBXo_9Kb-q3qHZKgiAByd8La9dUA&s=10",
        description: `Formerly known as Mos Def, Yasiin Bey's debut album Black on Both Sides follows up
        the successful Mos Def and Talib Kweli Are Black Star (1999) with an album that 
        emphasizes live instrumentation and socially conscious lyrics.`
    },
    {
        recordName: "新しい日の誕生",
        artist: "2814",
        genre: "Ambient",
        price: "29.99",
        albumPhoto: "https://f4.bcbits.com/img/a4099353330_1x1_700.avif",
        description: `The British-American collaborative ambient and vaporwave project
        of Electronic Musicians Telepath and HKE can be described as a "late night cruise through
        the cyber-future dream highway", which has maintained a cult following from some internet
        users.`
    },
    {
        recordName: "King's Disease III",
        artist: "Nas",
        genre: "Hip-Hop",
        price: "19.99",
        albumPhoto: "https://upload.wikimedia.org/wikipedia/en/9/92/King%27s_Disease_III.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled",
        description: `The third entry in Nas' King's Disease series of album and his 
        sixteenth studio album overall, King's Disease III is both complex and effortless as Nas 
        raps over beats produced by Hit-Boy while showing that he still deliver insights 28 years
        after his debut.`
    },
    {
        recordName: "Discovery",
        artist: "Daft Punk",
        genre: "French House",
        price: "49.99",
        albumPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQe3smF2mQk9R-1PpweOyHoP6vpxEAbhlHdNOMKLrqg&s=10",
        description: `Moving from the Chicago House of their first album Homework (1997), this album
        delves into a house style inspired by disco, post-disco, garage house, and R&B. It also serves
        as an exploration of song structures, musical forms, and childhood nostalgia that makes extensive
        use of samples.
        `
    },
    {
        recordName: "Since I Left You",
        artist: "The Avalanches",
        genre: "Plundertronics",
        albumPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcVSftY5fcaXCsYZzN8qffMBhuDiBh29jJ0sUVrW8WUw&s=10",
        price: "29.99",
        description: `
        The Avalanches' highly acclaimed debut studio album Since I Left You uses more than 900 individual samples
        to make a "kaleidoscope" of music that explores various emotions and moods while sounding 
        unique and incredibly fun in it's own right.
        `
    },

]

rootDiv = document.querySelector("#root")

function renderAlbums(individualProduct) {
    let recordNameH1 = document.createElement("h1");
    recordNameH1.innerHTML = individualProduct.recordName;
    rootDiv.append(recordNameH1);

    let artistH2 = document.createElement("h2");
    artistH2.innerHTML = individualProduct.artist;
    rootDiv.append(artistH2);

    let genreH3 = document.createElement("h3");
    genreH3.innerHTML = individualProduct.genre;
    rootDiv.append(genreH3);

    let priceH4 = document.createElement("h4");
    priceH4.innerHTML = individualProduct.price;
    rootDiv.append(priceH4)

    let albumPhotoSrc = document.createElement("img");
    albumPhotoSrc.src = individualProduct.albumPhoto;
    albumPhotoSrc
    rootDiv.append(albumPhotoSrc);

    let descriptionP = document.createElement("p");
    descriptionP.innerHTML = individualProduct.description;
    rootDiv.append(descriptionP);

    let checkmarkButton = document.createElement("button");
    checkmarkButton.innerHTML = "";
    checkmarkButton.addEventListener("click", e =>
            {
        console.log("This button belongs to " + individualProduct.recordName)
            }

    )


    rootDiv.append(checkmarkButton);

}

product_catalog.forEach(renderAlbums)



