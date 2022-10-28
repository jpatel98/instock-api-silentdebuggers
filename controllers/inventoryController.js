const knex = require('knex')(require('../knexfile'));

exports.index = (_req, res) => {
  knex('inventory')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Inventories: ${err}`)
    );
};

exports.addInventory = (req, res) => {
  // Validate the request body for required data
  if (!req.body.itemName || !req.body.description || !req.body.warehouseID || !req.body.warehouseName || !req.body.quantity || !req.body.status || !req.body.category) {
    return res.status(400).send('Please make sure to provide itemName, description, warehouseID, warehouseName, quantity, status and category fields in a request');
  }
  knex('inventory')
    .insert(req.body)
    .then((data) => {
      // For POST requests we need to respond with 201 and the location of the newly created record
      const newInventoryURL = `/inventory/${data[0]}`;
      res.status(201).location(newInventoryURL).send(newInventoryURL);
    })
    .catch((err) => res.status(400).send(`Error creating Inventory Item: ${err}`));
};