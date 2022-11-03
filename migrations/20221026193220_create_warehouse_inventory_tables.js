exports.up = function (knex) {
    return knex.schema
      .createTable('warehouse', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('address').notNullable();
        table.string('city').notNullable();
        table.string('country').notNullable();
        table.string('position').notNullable().defaultTo('Warehouse Manager');
        table.string('manager').notNullable();
        table.string('phone').notNullable();
        table.string('email').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      .createTable('inventory', (table) => {
        table.increments('id').primary();
        table.string('itemName').notNullable();
        table.string('description').notNullable();
        table.string('warehouseName').notNullable();
        table
          .integer('warehouseID')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('warehouse')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.integer('quantity').notNullable().defaultTo(0);
        table.string('category').notNullable();
        table.string('status').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('inventory').dropTable('warehouse');
  };