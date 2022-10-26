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