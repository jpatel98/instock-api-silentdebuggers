const express = require("express");
const router = express.Router();
const fs = require('fs');

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

//GET request for '/warehouses/warehouseId'.
// warehouseId will be swapped out with the id of a warehouse as found in the list of warehouseDetails
// Returns a detailed object of a single warehouse
// Details include the list of inventories for that warehouse
router.get('/warehouses/:warehouseId', (req, res) => {
    const requestedWarehouseId = req.params.warehouseId;
    const warehouseArr = readWarehouses();
    const inventoryArr = readInventories();

    const requestedWarehouse = warehouseArr.find(warehouse => warehouse.id === requestedWarehouseId);
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

module.exports = router;