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
  await knex('user_roles').insert([
    { id: 1, user_id: '1', role_id: '1' },
    { id: 2, user_id: '3', role_id: '2' },
  ]);
  await knex('roles').insert([
    { id: 1, name: '管理员', desc: '拥有全部权限' },
    { id: 2, name: '销售', desc: '查看线索' },
  ]);
  await knex('role_permissions').insert([
    { id: 1, role_id: '1', permissionId: '1' },
    { id: 2, role_id: '1', permissionId: '2' },
    { id: 3, role_id: '2', permissionId: '2' },
  ]);
  await knex('permissions').insert([
    { id: 1, permission: 'user' },
    { id: 2, permission: 'clue' },
  ]);
};
