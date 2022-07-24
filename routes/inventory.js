const express = require("express");
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');

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

router.get('/inventory', (req, res) => {
    const warehouseArr = JSON.parse(fs.readFileSync('./data/warehouses.json'));
    const foundWarehouseName = warehouseArr.find(warehouse => warehouse.name === req.body.warehouseName)
    res.send(foundWarehouseName)
})


//POST request for '/inventories'; adds new inventory item
router.post('/inventories', (req, res) => {
    const warehouseArr = JSON.parse(fs.readFileSync('./data/warehouses.json'));

    const foundWarehouse = warehouseArr.find(warehouse => {
        if (warehouse.name === req.body.warehouseName) {
            return warehouse
        }
    })

    const postNew = readInventories();
    const newItem = {
        id: uuid(),
        warehouseId: foundWarehouse.id,
        warehouseName: req.body.warehouseName,
        itemName: req.body.itemName,
        description: req.body.description,
        category: req.body.category,
        status: req.body.status,
        quantity: req.body.quantity
    }

    postNew.push(newItem);
    fs.writeFileSync('./data/inventories.json', JSON.stringify(postNew));
    res.json(newItem);
})
//Get request for '/inventories/:inventoryId'
//Returns details about a single inventory item
router.get("/inventories/:inventoryid", (req, res) => {

    //Storing inventory file in an array
    const inventoryArr = readInventories();

    //Finding the inventory item to return
    const inventoryItem = inventoryArr.find(item => item.id === req.params.inventoryid);

    if (!inventoryItem) {
        res.status(404).send(`Inventory item with id: ${req.params.inventoryid} not found`);
        return;
    }

    res.status(200).json(inventoryItem);
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