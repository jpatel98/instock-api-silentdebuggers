const knex = require('knex')(require('../knexfile'));

exports.index = (_req, res) => {
  knex('warehouse')
    .select('id', 'name', 'address', 'manager', 'phone', 'email')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Warehouses: ${err}`)
    );
};

exports.singleWarehouse = (req, res) => {
  knex('warehouse')
    .where({ id: req.params.id })
    .then((data) => {
      // If record is not found, respond with 404
      if (!data.length) {
        return res.status(404).send(`Warehouse with id: ${req.params.id} not found`);
      }
      // Knex returns an array of records, so we need to send response with a single object only
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving data for warehouse: ${req.params.id}. ${err}`)
    );
};

exports.warehouseInventories = (req, res) => {
  knex('inventory')
    .where({ warehouseID: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(400)
        .send(
          `Error retrieving inventories data for warehouse: ${req.params.id}. ${err}`
        )
    );
};

exports.addWarehouse = (req, res) => {
  // Validate the request body for required data
  if (!req.body.name || !req.body.manager || !req.body.address || !req.body.phone || !req.body.email ||  !req.body.country ||  !req.body.city) {
    return res.status(400).send('Please make sure to provide name, manager, address, phone and email fields in a request');
  }
  knex('warehouse')
    .insert(req.body)
    .then((data) => {
      // For POST requests we need to respond with 201 and the location of the newly created record
      const newWarehouseURL = `/warehouses/${data[0]}`;
      res.status(201).location(newWarehouseURL).send(newWarehouseURL);
    })
    .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`));
};