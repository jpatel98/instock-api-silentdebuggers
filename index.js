const express = require('express');
const app = express();
const PORT = 8080;

const warehouseRoutes = require('./routes/warehouseRoute');

// all warehouses routes
app.use('/warehouses', warehouseRoutes);

app.listen(PORT, () => {
  console.log(`🚀🚀 running at http://localhost:${PORT}`);
});