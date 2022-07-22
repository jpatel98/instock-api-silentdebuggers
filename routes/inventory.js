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

//POST request for '/inventories'; adds new inventory item
router.post('/inventories', (req, res) => {

    const warehouseArr = JSON.parse(fs.readFileSync('./data/warehouses.json'));



    const postNew = readInventories();
    const newItem = {
        id: uuid(),
        warehouseId: uuid(),
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
//DELETE request for an inventory item
//Will delete an inventory item when given an inventory id
//Will return the inventory array without the deleted inventory
router.delete('/inventories/:inventoryId', (req, res) => {

    //Storing inventory file in an array
    const inventoryArr = readInventories();

    //Store inventory file into an array
    res.send(inventoryArr);
})



module.exports = router;