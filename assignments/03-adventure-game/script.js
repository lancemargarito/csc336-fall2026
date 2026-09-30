let rootDiv = document.querySelector("#root");
let buttonDataDiv = document.querySelector("#buttonDataDiv");
let buttonsDiv = document.querySelector("#buttonsDiv");

let rooms = {

    gameStart: {
        name: "Welcome.",
        description:"While going out urban exploring, you find a structure large enough for you to consider that it may house something interesting. You enter.",
        linkedRooms: ["smallLobby"]
    },

    smallLobby: {
        name: "Small Lobby",
        description: `As you enter, you see a front desk and a small bell and some papers on top of the desk.
            The place looks like it hasn't seen people in quite some time. Behind the desk, there's a corridor.
            The door you had entered through clicks, and as you twist the door knob you now realize it's locked.`,
        linkedRooms: ["oldCorridor"]
    },
    oldCorridor: {
        name: "Old Corridor",
        description: `This long corridor is decorated with wallpapers of various styles, while the floor is covered in black-and-white tiles.
            Up above there's an old chandelier. There's an old blue door at the end of the corridor, while the door to the left has a small glass window that is too foggy to see through.
            Lastly, the door to your right has a small gold plaque reading "Bar."`,
        linkedRooms: ["bar","greenhouse","smallLobby","artGallery"]
    },
    bar: {
        name: "Bar",
        description: `Entering the room, you realize it used to be a (quite stylish) bar teeming with people.
            There's a wooden counter with a few seats, and a collection of alcoholic drinks on the shelf behind it.
            The floor is made up of black-and-white tiles. On the side of the room opposite the counter, there's a grand piano.`,
        linkedRooms: ["oldCorridor"]
    },
    greenhouse: {
        name: "Greenhouse",
        description:
            `This relatively small room is made even smaller by a large growth of thorned and hardy vines that prevent passage or even seeing through them.
            In the space that you can see, there's a fountain at the center, and an old water pump towards the back.
            The water pump seems to be connected to the fountain and along the ceiling towards other parts of the room.
            The fountain is humble, and is surrounded by plant growth (as is everything else).`,
        linkedRooms: ["oldCorridor"]
    },
    artGallery: {
        name: "Large Gallery",
        description: `In this room is a large corridor. At the end is a painting of a woman wearing a green crown, a yellow bracelet and a purple pendant. There's a switch underneath.
            There are also paintings showing a sage wearing a pendant, a saint wearing a crown, and a valiant wearing a bracelet. All of these paintings are orange, and there are buttons underneath all these paintings.`,
        linkedRooms: ["oldCorridor"],
        buttonData: ["Woman's switch", "Sage's button", "Saint's button", "Valiant's button"]
    },
    storeroom: {
        name: "Storeroom",
        description: `Whatever was once here is now gone: the place has been picked clean. Walking further towards the back does reveal a bag of chemicals, however.`,
        linkedRooms: ["oldCorridor"],
        buttonData: ["Collect Bag of Chemicals"]
    }
};

items = {
    musicNotes: {
        name: "Music Notes",
        description: "You recognize these notes as the Moonlight Sonata. You could play it with some effort.",
        useRoom: "bar",
        actionName: "Play Moonlight Sonata on the Piano"
    },
    bagOfChemicals: {
        name: "Bag of Chemicals",
        description: "Upon further inspection, you realize this bag of chemical agent is a sack of strong weed killer.",
        useRoom: "greenhouse",
        actionName: "Use Weed Killer on the vines"
    },
    key: {
        name: "Key",
        description: "This large gold key has a sword emblem on one side.",
        useRoom: "smallLobby",
        actionName: "Unlock front door"
    }
};

let selectedItem = "";

let currentRoom = rooms.gameStart;

let inventory = [];
artGalleryColors = [
    "Orange",
    "Green",
    "Purple"
];

artGalleryPaintingColors = {
    sagePainting: "Orange",
    saintPainting: "Orange",
    valiantPainting: "Orange"
};

function colorCalculator(color) {
    let currentIndex = artGalleryColors.indexOf(color);
    let nextIndex = (currentIndex + 1) % artGalleryColors.length;
    return artGalleryColors[nextIndex];
}

function navButtonClicked(e) {

    roomName = e.target.innerHTML;
    currentRoom = rooms[roomName];

    selectedItem = null;
    buttonDataDiv.innerHTML = "";
    visualizeRoom(currentRoom);
}

function visualizeRoom(room) {
    rootDiv.innerHTML = "";
    buttonsDiv.innerHTML = "";

    let roomTitle = document.createElement("h1");
    roomTitle.innerHTML = room.name;
    rootDiv.append(roomTitle);

    let descriptionP = document.createElement("p");
    descriptionP.innerHTML = room.description;
    rootDiv.append(descriptionP);

    for (let i = 0; i < room.linkedRooms.length; i++) {
        let destination = room.linkedRooms[i];
        let navButton = document.createElement("button");
        navButton.innerHTML = destination;
        navButton.addEventListener("click", navButtonClicked);
        rootDiv.append(navButton);
    }

    if (room.buttonData) {

        for (let i = 0; i < room.buttonData.length; i++) {
            let buttonObj = document.createElement("button");
            buttonObj.innerHTML = room.buttonData[i];
            buttonObj.addEventListener("click", buttonClick);
            buttonsDiv.append(buttonObj);
        }
    }
    
    let currentRoomName = "";

    for (let key in rooms) {
        if (rooms[key] === currentRoom) {
            currentRoomName = key;
            break;
        }
    }

    if (selectedItem && selectedItem.useRoom === currentRoomName) {
        let useButton = document.createElement("button");
        useButton.innerHTML = selectedItem.actionName;
        useButton.addEventListener("click", useItemAction);
        buttonsDiv.append(useButton);
    }

    visualizeStatus();
}

function buttonClick(e) {
    action = e.target.innerHTML;

    if (action === "Woman's switch") {
        if (artGalleryPaintingColors.sagePainting === "Purple" &&
            artGalleryPaintingColors.saintPainting === "Green" &&
            artGalleryPaintingColors.valiantPainting === "Orange") {

            rooms.artGallery.buttonData = ["Collect Music Notes"];
            buttonDataDiv.innerHTML = "You hear gear turning somewhere in the wall before the painting of the woman proceeds to slide open, revealing a sheet of music.";
        }

        else {buttonDataDiv.innerHTML = "Nothing happens.";
        }
    }

    else if (action === "Sage's button") {
        artGalleryPaintingColors.sagePainting = colorCalculator(artGalleryPaintingColors.sagePainting);
        buttonDataDiv.innerHTML = "The sage's painting is now colored " + artGalleryPaintingColors.sagePainting;
    }
    else if (action === "Saint's button") {
        artGalleryPaintingColors.saintPainting = colorCalculator(artGalleryPaintingColors.saintPainting);
        buttonDataDiv.innerHTML = "The saint's painting is now colored " + artGalleryPaintingColors.saintPainting;
    }
    else if (action === "Valiant's button") {
        artGalleryPaintingColors.valiantPainting = colorCalculator(artGalleryPaintingColors.valiantPainting);
        buttonDataDiv.innerHTML = "The valiant's painting is now colored " + artGalleryPaintingColors.valiantPainting;
    }
    else if (action === "Collect Music Notes") {
        rooms.artGallery.buttonData = [];
        addToInventory(items.musicNotes);
        buttonDataDiv.innerHTML = "You collected the Music Notes.";
    }
    else if (action === "Collect Bag of Chemicals") {
        rooms.storeroom.buttonData = [];
        addToInventory(items.bagOfChemicals);
        buttonDataDiv.innerHTML = "You picked up the Bag of Chemicals.";
    }

    visualizeRoom(currentRoom);
}

function addToInventory(item) {
    inventory.push(item);
}

function visualizeStatus() {
    let invDiv = document.createElement("h3");
    invDiv.innerHTML = "Inventory";

    if (inventory.length < 1) {
        let emptyInvP = document.createElement("p");
        emptyInvP.innerHTML = "You currently have no items.";
        invDiv.append(emptyInvP);

    } else {

        let inventoryList = document.createElement("ul");
        invDiv.append(inventoryList);

        for (let i = 0; i < inventory.length; i++) {
            let invItem = document.createElement("li");
            invItem.innerHTML = inventory[i].name;
            invItem.style.cursor = "pointer";

            invItem.addEventListener("click", function () {

                    if (selectedItem === inventory[i]) {
                        selectedItem = "";
                    } else {
                        selectedItem = inventory[i];
                    }
                visualizeRoom(currentRoom);
                }
            );

            if (selectedItem === inventory[i]) {
                invItem.style.color = "blue";
                description = document.createElement("p")
                description.innerHTML = selectedItem.description;
                invItem.append(description);   
            }
            inventoryList.append(invItem);
        }
    }
    rootDiv.append(invDiv);
}

function useItemAction() {
    if (selectedItem === items.bagOfChemicals && currentRoom === rooms.greenhouse) {
        buttonDataDiv.innerHTML = "You pour the strong weed killer into the water pump in the back of the room."
        rooms.greenhouse.description = `The vines have withered away. The fountain is now clearly visible, and much of the plant life that blocked you is now gone.
        You spot a shelf towards the back of the room, where a key (among other things) is sitting.`

        addToInventory(items.key);
    }

    else if (selectedItem === items.musicNotes && currentRoom === rooms.bar) {
        buttonDataDiv.innerHTML = `You play the Moonlight Sonata on the piano. 
        As you finish playing, you realize that a wall moves open, revealing a hidden door with a plaque labeled "Storeroom".`;

        if (rooms.bar.linkedRooms.includes("storeroom") === false) {
            rooms.bar.linkedRooms.push("storeroom")
        }
    }
    else if (
        selectedItem === items.key && currentRoom === rooms.smallLobby) {
        buttonDataDiv.innerHTML = "The sword emblem key fits perfectly! " + "You turn the lock, open the door, and escape.";
        rooms.smallLobby.description = "The front door is unlocked.";
    }

    selectedItem = null;
    visualizeRoom(currentRoom);
}

visualizeRoom(currentRoom);
