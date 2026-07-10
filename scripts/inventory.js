const inventoryImages = {
    "key": "assets/items/pixel key.png",
    "wallet": "assets/items/wallet.png",
    "lamp": "assets/items/lamp.png",
    "plate": "assets/items/pixel plate.png",
    "money": "assets/items/money.png",
    "candy": "assets/items/candy.png",
    "map": "assets/items/map.png",
    "flower": "assets/items/flower.png"
}

function isInInventory(item) {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i][0] === item) {
            return true;
        }
    }
    return false;
}

function itemQuantity(item) {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i][0] === item) {
            return inventory[i][1];
        }
    }
    return 0;
}

function hasItem(item) {
    return itemQuantity(item) > 0;
}

function itemWasNeeded(item) {
    for (let i = 0; i < completedQuests.length; i++) {
        if (completedQuests[i].includes(item)) {
            return true;
        }
    }
    return false;
}

function addItemToInventory(item, amount) {
    if (amount === undefined) amount = 1;
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i][0] === item) {
            inventory[i][1] += amount;
            return;
        }
    }
    inventory.push([item, amount]);
    newLine(`Added ${amount} ${item}(s) to inventory`);
}

function removeItemFromInventory(item, amount) {
    if (amount === undefined) amount = 1;
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i][0] === item) {
            inventory[i][1] -= amount;
            if (inventory[i][1] <= 0) {
                inventory.splice(i, 1);
            }
            newLine(`Removed ${amount} ${item}(s)`);
            return;
        }
    }
}

function showInventoryDialog() {
    let inventoryBox = document.createElement("div");
    newLine(`Inventory: ${(inventory.length === 0) ? " is empty" : ""}`);


    inventoryBox.classList.add("dialog");

    for (let i = 0; i < inventory.length; i++) {
        let container = document.createElement("div");
        container.style.display = "inline-block";
        let itemInfo = document.createElement("p");

        let item = inventory[i][0];
        let quantity = inventory[i][1];
        let itemImage = document.createElement("img");

        itemInfo.innerText = `${item} x${quantity}`;

        itemImage.src = inventoryImages[item];
        itemImage.style.width = "100px";
        itemImage.style.height = "100px";
        itemImage.style.margin = "10px";
        container.append(itemInfo)
        container.append(itemImage);
        inventoryBox.append(container);
    }

    inventoryBox.classList.add('inventoryBox');

    linesElement.append(inventoryBox);
    return inventoryBox;
}
