function addQuest(personFor, text, item, amount) {
    if (questDoesNotExist(text)) {
        newLine("Added new quest! Press \"q\" to see it");
        quests.push([personFor, text, item, amount])    
    }
}

function questDoesNotExist(text) {
    for (let i = 0; i < quests.length; i++) {
        if (quests[i][1] == text) {
            return false;
        }
    }
    return true;
}

function giveItems(person, item, amount) {
    if (!personNeedsItem(person, item)) {
        newLine(`${people[person].name} doesn't want your useless ${item}!`);
        return;
    }

    let itemsOwned = itemQuantity(item);
    let itemsNeeded = howManyItemsDoesPersonNeed(person, item);

    if (itemsOwned >= itemsNeeded) {
        newLine(`Gave ${person} ${itemsNeeded} ${item}s!`);
        removeItemFromInventory(item, itemsNeeded);
        reduceItemsNeeded(person, item, itemsNeeded);
        completeQuest(person, item);
        newLine(`Quest complete!`);
        goSomewhere(activePlace)

        return;
    }
    if (itemsOwned < itemsNeeded) {
        newLine(`You don't have enough ${item}s! Gave ${itemsOwned}, ${people[person].name} still needs ${itemsNeeded - itemsOwned}`);
        reduceItemsNeeded(person, item, itemsOwned);
        removeItemFromInventory(item, itemsOwned);

        return;
    }

    function reduceItemsNeeded(person, item, amount) {
        for (let i = 0; i < quests.length; i++) {
            if (quests[i][0] == person && quests[i][2] == item) {
                if (quests[i][3] <= 0) return;
                quests[i][3] -= amount;
            }
        }
    }    
}

function completeQuest(person, item) {
    let index = quests.findIndex((quest) => quest[0] === person && quest[2] === item);
    if (index === -1) return;
    let quest = quests.splice(index, 1)[0];
    completedQuests.push(quest);
}

function itemsNeeded(person) {
    let items = [];
    for (let i = 0; i < quests.length; i++) {
        if (quests[i][0] == person) {
            items.push(quests[i][2]);
        }
    }
    return items;
}

function personNeedsItem(person, item) {
    for (let i = 0; i < quests.length; i++) {
        if (quests[i][0] == person && quests[i][2] == item) {
            return true;
        }
    }
    return false;
}

function howManyItemsDoesPersonNeed(person, item) {
    for (let i = 0; i < quests.length; i++) {
        if (quests[i][0] == person && quests[i][2] == item) {
            return quests[i][3];
        }
    }
    return -1;
}

function showQuestsDialog() {
    let questsBox = document.createElement("div");
    newLine(`Quests: ${(quests.length === 0) ? " you have none" : ""}`);

    questsBox.style.display = "grid";
    questsBox.style.gridTemplateColumns = "repeat(2, 1fr)";

    for (let i = 0; i < quests.length; i++) {
        let speaker = quests[i][0];
        let container = document.createElement("div");
        let textContainer = document.createElement("div");
        let speakerImage = document.createElement("img");
        let speakerName = document.createElement("p");
        let dialogText = document.createElement("p");

        speakerImage.src = `assets/img/${speaker}.png`;
        speakerImage.style.width = "150px";
        speakerImage.style.height = "150px";
        speakerName.innerHTML = people[speaker].name;
        dialogText.innerHTML = quests[i][1];
        let request = document.createElement("p");
        request.innerText = `${quests[i][3]} ${quests[i][2]}(s)`;

        container.classList.add("dialog");
        container.style.display = "grid";
        container.style.gridTemplateColumns = "150px auto";

        container.append(speakerImage);
        container.append(textContainer);
        textContainer.append(speakerName);
        textContainer.append(dialogText);
        textContainer.append(request);

        questsBox.append(container);
    }

    linesElement.append(questsBox);

    return newLine;
}