/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    // 创建用户表
    .createTable('users', function (table) {
      table.increments("id");
      table.string('name', 255);
      table.string('phone', 255);
      table.string('password', 255);
      table.string('role', 255);
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    // 顾客表
    .createTable('customers', function (table) {
      table.increments("id");
      table.string('name', 255);
      table.string('phone', 255);
      table.string('source', 255);
      table.string('userid', 255);
      table.string('status', 255);
      table.string('remark', 255);
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    // 线索表
    .createTable('clues', function (table) {
      table.increments('id');
      table.string('customerid', 255);
      table.string('content', 255);
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    // 销售-顾客表
    // .createTable('services', function (table) {
    //   table.increments('id');
    //   table.string('userid', 255);
    //   table.string('customerid', 255);
    //   table.timestamp('created_at').defaultTo(knex.fn.now())
    //   table.timestamp('updated_at').defaultTo(knex.fn.now())
    // })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('users')
    .dropTable('customers')
    .dropTable('clues')
};
