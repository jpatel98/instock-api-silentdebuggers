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
        !req.body.status 
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

    //Check if the quantity is correct
    if (req.body.status === "In Stock" && req.body.quantity < 1) {
        res.status(400).send("The status is In Stock but the quantity is not greater than 0.");
        return;
    }

      //Check if the quantity is correct
    if (req.body.status === "Out of Stock" && req.body.quantity !== 0) {
        res.status(400).send("The status is Out of Stock but the quantity is not equal to 0.");
        return;
    }

  
    

    //Find the inventory item and update it
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