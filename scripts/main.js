function startGame() {
  // music
  let menutheme = document.getElementById("menutheme");
  menutheme.play();


  gameRunning = true;

  newLine(
    'Welcome to Sleepwalker! <br> You will get options on what to say or do, and you can choose between them by simply typing the number before each option.'
  );
  newLine(
    'You wake up and notice you are lying on the ground and not in bed. You look around your room and notice it\'s very out of order. Some of the large furniture has been knocked over. You realize that you must have been sleepwalking. <br> You decide to investigate further. '
  );
  goSomewhere("bedroom");
}

function gameInput(number) {
  let input = number;
  if (nextPlaces[input - 1] === undefined) {
    newLine("That's not one of the options.");
    return;
  }
  lastGameInput = input;
  goSomewhere(nextPlaces[input - 1]);
}

function goSomewhere(place) {
  if (typeof places[place] !== "function") {
    newLine("You can't go there.");
    return;
  }
  lastPlace = activePlace;
  activePlace = place;
  let startIdx = linesElement.children.length;
  places[place]();
  lastPlaceOutputStart = startIdx;
  lastPlaceOutputEnd = linesElement.children.length;
}

const rooms = {
  bedroom: {
    clean: false
  },
  kitchen: {
    clean: false
  },
  bathroom: {
    clean: false
  },
  park: {
    visited: false
  },
  oldman: {
    visited: false,
    happy: false,
    collectedReward: false,
    leavingCoin: false
  },
  femaleneighbor: {
    visited: false,
    happy: false,
    collectedReward: false,
    leavingMap: false
  }
}

function bedroom() {
  if (!rooms.bedroom.clean) {
    if (itemQuantity("wallet") > 0 && itemQuantity("wallet") >= howManyItemsDoesPersonNeed("you", "wallet")) {
      if (itemQuantity("key") > 0 && itemQuantity("key") >= howManyItemsDoesPersonNeed("you", "key")) {
        removeItemFromInventory("wallet", 1);
        removeItemFromInventory("key", 1);
        rooms.bedroom.clean = true;
        completeQuest("you", "wallet");
        completeQuest("you", "key");
        bedroom();
        return;
      }
    }
  }
  if (!rooms.bedroom.clean) {
    newLine(
      'As you walk around your bedroom, you see your lamp is knocked over, and your desk is a mess. You seem to be missing your wallet, as well as your spare house key. <br> What would you like to investigate next? ',
      "",
      ['Press "1" to check out the kitchen.', 'Press "2" to check out the bathroom', 'Press "3" to leave the house',]
    );
    nextPlaces = ["kitchen", "bathroom", "outside"];
    addQuest("you", "Find the wallet you lost while sleepwalking", "wallet", 1);
    addQuest("you", "Find the key you lost while sleepwalking", "key", 1);
  }
  else {
    newLine('It\'s your room. The bed is made, the desk is clean, and everything is in it\'s place. Where do you want to go next? ', "",
      ['Press "1" to check out the kitchen.', 'Press "2" to go to the bathroom', 'Press "3" to leave the house']);
    nextPlaces = ["kitchen", "bathroom", "outside"];
  }
}
function kitchen() {
  if (itemQuantity("plate") > 0 && itemQuantity("plate") >= howManyItemsDoesPersonNeed("you", "plate") && !rooms.kitchen.clean) {
    removeItemFromInventory("plate", howManyItemsDoesPersonNeed("you", "plate"));
    rooms.kitchen.clean = true;
    completeQuest("you", "plate");
    kitchen();
    return;
  }
  if (!rooms.kitchen.clean) {
    newLine(
      'There are shards of fine china and dented pots strewn across the floor. The silverware drawers are empty, and all your chairs seem to be missing. You notice a bag of flour spilled on the ground, and there are multiple sets of footsteps in the fine white powder. <br> Where would you like to investigate next? ',
      "",
      ['Press "1" to check out the bedroom.', 'Press "2" to check out the bathroom.', 'Press "3" to leave the house']
    );
    nextPlaces = ["bedroom", "bathroom", "outside"];
    addQuest("you", "Get new plates to replace the ones you broke", "plate", 2);
  }
  else {
    newLine('The kitchen is clean, the dishes stacked, and everything is in its place. Where would you like to go next? ', "",
      ['Press "1" to check out the bedroom.', 'Press "2" to check out the bathroom.', 'Press "3" to leave the house']
    );
    nextPlaces = ["bedroom", "bathroom", "outside"];
  }
}
function bathroom() {
  if (!rooms.bathroom.clean) {
    newLine(
      'As you walk into the bathroom, you notice that your toiletries are spilled all over the floor, and the paintings that were once on your wall are on the floor. You quickly tidy up and wipe down the surfaces.<br> Where would you like to investigate next? ',
      "",
      ['Press "1" to check out the bedroom.', 'Press "2" to check out the kitchen.', 'Press "3" to leave the house']
    );
    rooms.bathroom.clean = true;
    nextPlaces = ["bedroom", "kitchen", "outside"];
  }
  else {
    newLine('The marble surfaces sparkle, the toiletries are in their place, and the paintings are up on the wall, staring down upon the toilet.');
    newLine('Where would you like to go next? ', "",
      ['Press "1" to check out the bedroom.', 'Press "2" to check out the kitchen.', 'Press "3" to leave the house']
    );
    nextPlaces = ["bedroom", "kitchen", "outside"];
  }
}
function outside() {
  newLine(
    "Since you already investigated all the rooms in your house, you decide to go outside. From here, you can go to the park or stop by and visit your neighbor. ",
    "",
    ['Press "1" to go to the park.', 'Press "2" to visit your neighbor.', 'Press "3" to go further up the road.']
  );
  nextPlaces = ["park", "oldmanHouse", "femaleNeighbor"];
}
function park() {
  newLine("It's the park at the end of your neighborhood. There's a walking trail that goes through the woods with benches scattered along either side.");
  if (!rooms.park.visited) {
    rooms.park.visited = true;
    newLine("Oh! It's your wallet lying next to a park bench. You pick it up.");
    addItemToInventory("wallet");
    addItemToInventory("money");
    addItemToInventory("money");
    addItemToInventory("money");
    addItemToInventory("money");
  }
  newLine('Press "1" to go back');
  nextPlaces = ["outside"];
}
function oldmanHouse() {
  if (itemWasNeeded("lamp")) rooms.oldman.happy = true;
  newLine("You go to talk to your neighbor, who often likes to sit on the porch, and ask him what happened. You know he is retired and does not work, but he does not appear to be home. You knock on the door several times and eventually he comes out. After he sees you, he yells:");
  if (!rooms.oldman.visited && !rooms.oldman.happy) {
    rooms.oldman.visited = true;
    newDialog(
      "assets/img/oldmanneighbor.png",
      "oldmanneighbor",
      "You have no right to show your face around here after what you did last night!"
    );
    newLine(
      'How do you respond? ',
      "",
      ['Press "1" to say "I am so sorry, I think I was sleepwalking last night, what happened?"', 'Press "2" to say "What the hell are you talking about, old man?']
    );
    addQuest("oldmanneighbor", "Get something that will make the old man happy", "lamp", 1);
    nextPlaces = ["questionOldman", "angryOldman"];
  }
  else if (rooms.oldman.visited && !rooms.oldman.happy) {
    let needsSomething = newDialog(
      "assets/img/oldmanneighbor.png",
      "oldmanneighbor",
      "What do you think you're doing here? I'm not talkin' to you 'till you make amends."
    );
    if (needsSomething) newLine('Use "g &#60;item>" to give items');
  }
  else {
    newDialog(
      "assets/img/oldmanneighbor.png",
      "oldmanneighbor",
      "Thanks for bringing me that lovely lamp! Oh, by the way, you dropped this while you were out an' about last night."
    );
    if (!rooms.oldman.collectedReward) {
      rooms.oldman.collectedReward = true;
      addItemToInventory("key");
    }
    newLine("Press \"1\" to go back outside");
    nextPlaces = ["outside"];
  }
}
function questionOldman() {
  let needsSomething = newDialog(
    "assets/img/oldmanneighbor.png",
    "oldmanneighbor",
    "You showed up at my house at three in the morning and threw a chair at my window! Sleepwalking or not, you will need to pay for the damages!"
  );
  newLine(
    'How do you respond?',
    "",
    ['Press "1" to say "Of course I will pay you back, but do you know if I did anything else when I was sleepwalking?"', 'Press "2" to say "We can talk about payment later, but do you know if I did anything else while I was sleepwalking?"']
  );
  nextPlaces = ["leaveOldman", "leaveOldman"];
  if (needsSomething) newLine('Use "g &#60;item>" to give items');
}
function angryOldman() {
  newDialog(
    "assets/img/oldmanneighbor.png",
    "oldmanneighbor",
    "Don't be snarky with me, you know damn well you broke my window last night! I'm calling the cops!"
  );
  newLine(
    "He slams the door in your face and refuses to answer any questions you yell at his locked door."
  );
  newLine(
    'You have lost the game. Press "1" to reset. You will need to run the command "start" again. ',
    "red"
  );
  nextPlaces = ["endGame"];
}
function leaveOldman() {
  let needsSomething = newDialog(
    "assets/img/oldmanneighbor.png",
    "oldmanneighbor",
    "I believe you went over that way afterward, I was tired and not paying very much attention though. You can go check it out, but I expect you to come back and pay me later!"
  );
  newLine("Oh! There's a coin on the floor, you pick it up.");
  if (!rooms.oldman.leavingCoin) {
    rooms.oldman.leavingCoin = true;
    addItemToInventory("money");
  }
  newLine(
    'You start walking in the direction he pointed, and as you walk, you feel the area is vaguely familiar, but you cannot put your finger on it. “I must be starting to remember parts of my sleepwalking”, You think to yourself. After some walking, you come across a stream and you see a tree branch that you could use to cross the stream. You also see a bridge in the distance, but it appears to be a few minutes walk away. What would you like to do? ',
    "",
    ['Press "1" to cross the thin tree branch', 'Press "2" to walk to the bridge and cross it.']
  );
  nextPlaces = ["crossBranch", "crossBridge"];
  if (needsSomething) newLine('Use "g &#60;item>" to give items');
}
function crossBranch() {
  newLine(
    "As you cross the tree branch, it snaps beneath your weight. You fall into the stream, and the current takes you far from your home."
  );
  newLine(
    'You have lost the game. Press "1" to reset.',
    "red",
    ['Press "1" to reset. You will need to run the command "start" again.']
  );
  nextPlaces = ["endGame"];
}
function crossBridge() {
  newLine(
    "You cross the stream and get to another house. You start to have a foggy memory of your dream, and you definitely remember this house. You walk up to the house and knock on the door"
  );
  let needsSomething = newDialog("assets/img/femaleneighbor.png", "femaleneighbor", "Who are you, and what do you want?");
  newLine(
    'What would you  like to say: ',
    "",
    ['Press "1" to say "Why are you so upset?"', 'Press "2" to say "Did you see me around here last night?"']
  );
  if (needsSomething) newLine('Use "g &#60;item>" to give items');
  nextPlaces = ["femaleNeighbor", "angryFemaleNeighbor"];
}
function femaleNeighbor() {
  if (itemWasNeeded("flower")) rooms.femaleneighbor.happy = true;
  if (!rooms.femaleneighbor.visited && !rooms.femaleneighbor.happy) {
    rooms.femaleneighbor.visited = true;
    let needsSomething = newDialog(
      "assets/img/femaleneighbor.png",
      "femaleneighbor",
      "Someone ripped all the plants out of my garden last night! Do you have any idea who it could have been?"
    );
    addQuest("femaleneighbor", "Find some flowers to replace the ones that were uprooted", "flower", 3);
    newLine(
      'How would you like to respond: ',
      "",
      ['Press "1" to say "I have been sleep walking recently and was told I came over here, the person who tore out your plants might have been me..."', 'Press "2" to say "I am sorry to hear that, hope you can find who did it."']
    );
    if (needsSomething) newLine('Use "g &#60;item>" to give items');
    nextPlaces = ["angryFemaleNeighbor", "leaveFemaleNeighbor"];
  }
  else if (rooms.femaleneighbor.visited && !rooms.femaleneighbor.happy) {
    let needsSomething = newDialog(
      "assets/img/femaleneighbor.png",
      "femaleneighbor",
      "My beautiful flowers! All gone! If only someone would pull me out of this utter despair."
    );
    if (needsSomething) newLine('Use "g &#60;item>" to give items');
    nextPlaces = ["angryFemaleNeighbor", "leaveFemaleNeighbor"];
  }
  else {
    newDialog(
      "assets/img/femaleneighbor.png",
      "femaleneighbor",
      "Oh, you brought me some flowers! Thank you so much! I'll go plant them immediately. And, by the way, I've got these lovely plates I don't use anymore, you can have them if they tickle you fancy."
    );
    if (!rooms.femaleneighbor.collectedReward) {
      rooms.femaleneighbor.collectedReward = true;
      addItemToInventory("plate");
      addItemToInventory("plate");
    }
    newLine("Press \"1\" to go back outside");
    nextPlaces = ["outside"];
  }
}
function angryFemaleNeighbor() {
  newDialog("assets/img/femaleneighbor.png", "femaleneighbor", "WHAT THE HELL! You are going to stay here for the rest of the day, and replant for me, or I will be calling the cops!");
  newLine(
    'You have lost the game.',
    "red",
    ['Press "1" to reset. You will need to run the command "start" again.']
  );
  nextPlaces = ["endGame"];
}
function leaveFemaleNeighbor() {
  newDialog("assets/img/femaleneighbor.png", "femaleneighbor", "Ok, but you better let me know if you find out anything. And it\'d be great if you could get me some plants to replace the ones that were stolen.");
  newLine("You continue heading down the road, where you see something flying in the wind. You catch it - it's a map!");
  if (!rooms.femaleneighbor.leavingMap) {
    rooms.femaleneighbor.leavingMap = true;
    addItemToInventory("map");
  }
  newLine("You have found a map! Press 'm' to view it.");
}
function store() {
  newLine("A shopkeeper welcomes you loudly as you enter the store. The shelves are lined with goods from shoelaces to laced shoes and apple turnovers to turned over apples.");
  newLine("What would you like to buy?", "", ["Press '1' to buy a lamp.", "Press '2' to buy a flower.", "Press '3' to go home."]);
  nextPlaces = ["buyLamp", "buyFlower", "bedroom"];
}
function buyLamp() {
  if (itemQuantity("money") >= 2) {
    addItemToInventory("lamp");
    removeItemFromInventory("money", 2);
  }
  else {
    newLine("You don't have enough money to buy this");
  }
  store();
}
function buyFlower() {
  if (itemQuantity("money") >= 1) {
    addItemToInventory("flower");
    removeItemFromInventory("money", 1);
  }
  else {
    newLine("You don't have enough money to buy this");
  }
  store();
}



function endGame() {
  gameRunning = false;
  clearTerminal();
  location.reload();
}

const places = {
  bedroom,
  kitchen,
  bathroom,
  outside,
  park,
  oldmanHouse,
  questionOldman,
  angryOldman,
  leaveOldman,
  crossBranch,
  crossBridge,
  femaleNeighbor,
  angryFemaleNeighbor,
  leaveFemaleNeighbor,
  store,
  buyLamp,
  buyFlower,
  endGame
};

function howtoplay() {
  if (document.getElementsByClassName("play")[0]) {
    var instructions = document.getElementsByClassName("play")[0]
    instructions.remove()
  } else {

    newLine(`Welcome to Sleepwalker! Navigate a world of mysteries and challenges to complete your quest and make things right with your neighbors. Here’s how:
            Getting Started:
            Run the “start” command to begin the game inside the terminal input.<br>
            Controls:<br>
            Keyboard: Use digits (e.g. 1, 2, 3) to select options, and press i to view your items.<br>
            Actions: Press [Enter] to confirm choices or interact with objects.<br>
            Talk with your neighbors and explore your community to learn about what you’ve been doing at night. Use strategy to progress through the story.
    `, "play");
  }
}
