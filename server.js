const express = require("express");
const app = express();
const inventoryRoutes = require('./routes/inventory');
const warehouseRoutes = require('./routes/warehouse')
const cors = require('cors');


app.use(express.json());
app.use(cors());

app.use('/', inventoryRoutes);
app.use('/', warehouseRoutes);

app.listen(8080, () => {
    console.log(`Server fired up on port 8080 🫡`);
});