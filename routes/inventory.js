const express = require("express");
const router = express.Router();
const fs = require('fs');

//function to read inventories.json and parse the JSON file
const readInventories = () => {

    // inventories.json file stored in a variable
    const inventoriesJSONFile= fs.readFileSync('./data/inventories.json');
    // parsing the buffer data after readFileSync
    const inventoriesArrParsed = JSON.parse(inventoriesJSONFile);
    return inventoriesArrParsed;
}

//GET request for '/inventories'.
// Contains entire list of inventories
router.get('/inventories', (req, res) => {
    //Storing inventory file in an array
    const inventoryArr = readInventories();
    const inventoryResponse = inventoryArr.map(inventory => { 
        return inventory;
    })
    res.status(200).json(inventoryResponse);
})

//DELETE request for an inventory item
//Will delete an inventory item when given an inventory id
//Will return the inventory array without the deleted inventory
router.delete('/inventories/:inventoryId', (req, res) => {

    //Store the requested inventory ID
    const requestedInventoryId = req.params.inventoryId;

    //Storing inventory file in an array
    const inventoryArr = readInventories();

    //Check if inventory item exists
    if ( !inventoryArr.find(inventory => inventory.id === requestedInventoryId) ){
        res.status(404).send(`Inventory with ID: ${requestedInventoryId} does not exist`);
        return;
    }

    //Filter out the inventory item that must be deleted
      const inventoryArrFilter = inventoryArr.filter(
        inventory => inventory.id !== requestedInventoryId
    );

    //Rewrite the inventory file with the new filtered array
    fs.writeFileSync('./data/inventories.json', JSON.stringify(inventoryArrFilter));

    //Store inventory file into an array
    res.status(200).send(inventoryArrFilter);
})



module.exports = router;