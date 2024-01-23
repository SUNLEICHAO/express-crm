/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user_roles').del();
  await knex('roles').del();
  await knex('role_permissions').del();
  await knex('permissions').del();
  await knex('permissions').insert([
    { id: 1, permission: 'user' },
    { id: 2, permission: 'clue' },
  ]);
};
