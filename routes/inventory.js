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

    //Storing inventory file in an array
    const inventoryArr = readInventories();

    //Store inventory file into an array
    res.send(inventoryArr);
})

//PUT request
//Edit an inventory item
router.put('/inventories/:inventoryId', (req, res)=> {

     //Storing inventory file in an array
     const inventoryArr = readInventories();

    //Check if all values are filled
    if (
        !req.body.warehouseName ||
        !req.body.itemName ||
        !req.body.description ||
        !req.body.category ||
        !req.body.status ||
        !req.body.quantity 
        )
    {
        res.status(400).send("All values must be filled");
        return;
    };

    //Check if status is either out of stock or in stock
    if (
        req.body.status !== "In Stock" && req.body.status !== "Out of Stock"
    ) {
        // console.log(req.body.status);
        res.status(400).send("Status must be either In Stock or Out of Stock");
        return;
    }


     inventoryArr.forEach( (item,i) => {

        if (item.id === req.params.inventoryId) {

            inventoryArr[i] = {
                id: inventoryArr[i].id,
                warehouseId: inventoryArr[i].warehouseId,
                warehouseName: req.body.warehouseName,
                itemName: req.body.itemName,
                description: req.body.description,
                category: req.body.category,
                status: req.body.status,
                quantity: req.body.quantity
            }

        }

     } )

     res.status(200).json(inventoryArr);

})

module.exports = router;