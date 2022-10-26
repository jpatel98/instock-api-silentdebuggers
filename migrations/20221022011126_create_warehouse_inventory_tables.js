exports.up = function(knex) {
  return knex.schema
    .createTable('warehouse', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw("(UUID())"));
        table.string('name').notNullable();
        table.string('position').notNullable().defaultTo('Store Manager');
        table.string('manager').notNullable();
        table.string('address').notNullable();
        table.string('phone').notNullable();
        table.string('email').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('inventory', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw("(UUID())"));
        table.string('name').notNullable();
        table.string('description').notNullable();
        table
          .integer('warehouse_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('warehouse')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.integer('quantity').notNullable().defaultTo(0);
        table.string('status').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('inventory').dropTable('warehouse');
};
