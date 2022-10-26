const express = require('express');
const app = express();
const warehouseRoutes = require('./routes/warehouseRoute');
const inventoryRoutes = require('./routes/inventoryRoute');

const PORT = 8080;

// all warehouses routes
app.use('/warehouses', warehouseRoutes);

// all inventories routes
app.use('/inventories', inventoryRoutes);

app.listen(PORT, () => {
  console.log(`🚀🚀 running at http://localhost:${PORT}`);
});