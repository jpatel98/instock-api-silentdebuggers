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

//GET request for '/warehouses'.
// Contains entire list of warehouses
router.get('/warehouses', (req, res) => {
    //accessing videos object to send as response
    const warehouseArr = readWarehouses();
    const warehouseResponse = warehouseArr.map(warehouse => { 
        return warehouse;
    })
    res.json(warehouseResponse);
})


module.exports = router;