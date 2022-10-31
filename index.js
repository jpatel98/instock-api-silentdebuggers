const express = require('express');
const app = express();
const warehouseRoutes = require('./routes/warehouseRoute');
const inventoryRoutes = require('./routes/inventoryRoute');

const PORT = process.env.PORT || 8080;
app.use(express.json());

app.get('/', (_req, res) => {
  res.send("Welcome to instock-api");
});

// all warehouses routes
app.use('/warehouses', warehouseRoutes);

// all inventories routes
app.use('/inventories', inventoryRoutes);

app.listen(PORT, () => {
  console.log(`🚀🚀 running at http://localhost:${PORT}`);
});