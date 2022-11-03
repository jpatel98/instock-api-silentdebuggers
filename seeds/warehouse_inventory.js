const inventoryData = require('../seed_data/inventory');
const warehouseData = require('../seed_data/warehouse');

exports.seed = function (knex) {
  return knex('warehouse')
    .del()
    .then(function () {
      return knex('warehouse').insert(warehouseData);
    })
    .then(() => {
      return knex('inventory').del();
    })
    .then(() => {
      return knex('inventory').insert(inventoryData);
    });
};