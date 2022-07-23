const express = require("express");
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');

//function to read warehouses.json and parse the JSON file
const readWarehouses = () => {

    // warehouses.json file stored in a variable
    const warehousesJSONFile= fs.readFileSync('./data/warehouses.json');
    // parsing the buffer data after readFileSync
    const warehousesArrParsed = JSON.parse(warehousesJSONFile);
    return warehousesArrParsed;
}

//function to read inventories.json and parse the JSON file
const readInventories = () => {

    // inventories.json file stored in a variable
    const inventoriesJSONFile= fs.readFileSync('./data/inventories.json');
    // parsing the buffer data after readFileSync
    const inventoriesArrParsed = JSON.parse(inventoriesJSONFile);
    return inventoriesArrParsed;
}

//GET request for '/warehouses'.
// Contains entire list of warehouses
router.get('/warehouses', (req, res) => {
    //accessing videos object to send as response
    const warehouseArr = readWarehouses();
    const warehouseResponse = warehouseArr.map(warehouse => { 
        return warehouse;
    })
    res.status(200).json(warehouseResponse);
})

router.post('/warehouses', (req, res) => {
    const postNew = readWarehouses();
    const newWarehouse = {
        id: uuid(),
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        contact: {
            name: req.body.contactName,
            position: req.body.position,
            phone: req.body.phone,
            email: req.body.email
        }
    }

    postNew.push(newWarehouse);
    fs.writeFileSync('./data/warehouses.json', JSON.stringify(postNew));
    res.json(newWarehouse);
})


//GET request for '/warehouses/warehouseId'.
// warehouseId will be swapped out with the id of a warehouse as found in the list of warehouseDetails
// Returns a detailed object of a single warehouse
// Details include the list of inventories for that warehouse
router.get('/warehouses/:warehouseId', (req, res) => {
    const requestedWarehouseId = req.params.warehouseId;
    const warehouseArr = readWarehouses();
    const inventoryArr = readInventories();

    const requestedWarehouse = warehouseArr.filter(warehouse => warehouse.id === requestedWarehouseId);
    //filter because we want multiple responses with the same warehouse ID
    const requestedInventory = inventoryArr.filter(inventory => inventory.warehouseID === requestedWarehouseId);
    
    if (!requestedWarehouse) {
      res.status(404).send('Warehouse not found');
      return;
    }
  
    res.status(200).json(
        {
            "warehouseDetails": requestedWarehouse, 
            "warehouseInventory": requestedInventory
        }
    );
})

//Delete warehouse
router.delete('/warehouses/:warehouseId', (req, res) => {

    //Store the requested warehouse ID
    const requestedWarehouseId = req.params.warehouseId;
    
    //Store warehouses and inventory in array
    const warehouseArr = readWarehouses();

    const inventoryArr = readInventories();

    //Check if warehouse exists
    if ( !warehouseArr.find(warehouse => warehouse.id === requestedWarehouseId) ){
        res.status(404).send(`Warehouse with ID: ${requestedWarehouseId} does not exist`);
    }


    //Filter out the warehouse that must be deleted
    const warehouseArrFilter = warehouseArr.filter(
        warehouse => warehouse.id !== requestedWarehouseId
        );

    //Rewrite the warehouse file with the new filtered array
    fs.writeFileSync('./data/warehouses.json', JSON.stringify(warehouseArrFilter));

    //Filter out the inventory that must be deleted
    const inventoryArrFilter = inventoryArr.filter(
        inventory => inventory.warehouseID !== requestedWarehouseId
    );

    //Rewrite the inventory file with the new filtered array
    fs.writeFileSync('./data/inventories.json', JSON.stringify(inventoryArrFilter));
    

    //Return new array of warehouses without the deleted array
    res.status(200).json(warehouseArrFilter);

})


//Put request for changing the details of a warehouse
router.put('/warehouses/:warehouseId', (req, res) => {

    //Store warehouse data in warehouse array
    const warehouseArr = readWarehouses();

    let foundWarehouse = {};
    let foundIndex = 0;

    //Retrieve the inventory that needs to be changed
    warehouseArr.forEach((element, i) => {

        if (element.id === req.params.warehouseId) {
            foundIndex = i;
            warehouseArr[i] = {
                name: req.body.name,
                address: req.body.address,
                city: req.body.city,
                country: req.body.country,
                contact: {
                    name: req.body.contact.name,
                    position: req.body.contact.position,
                    phone: req.body.contact.phone,
                    email: req.body.contact.email
                }
            }
        }

    })
    

    res.status(200).json(warehouseArr);

})

module.exports = router;