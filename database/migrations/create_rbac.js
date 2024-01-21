/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    // 角色表
    .createTable('roles', function (table) {
      table.increments("id");
      table.string('role', 255);
      table.string('desc', 255);
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    // 权限表
    .createTable('permissions', function (table) {
      table.increments("id");
      table.string('permission', 255);
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    // 用户-角色表
    .createTable('user_roles', function (table) {
      table.increments("id");
      table.string('userId', 255);
      table.string('roleId', 255);
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    // 角色-权限表
    .createTable('role_permissions', function (table) {
      table.increments("id");
      table.string('roleId', 255);
      table.string('permissionId', 255);
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  // 权限分组表
  // .createTable('permission_group', function (table) {
  //   table.increments("id");
  //   table.string('children', 255);
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
    .dropTable('roles')
    .dropTable('permissions')
    .dropTable('user_roles')
    .dropTable('role_permissions')
};
