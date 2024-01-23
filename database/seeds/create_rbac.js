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
    { id: 1, userId: '1', roleId: '1' },
    { id: 2, userId: '3', roleId: '2' },
  ]);
  await knex('roles').insert([
    { id: 1, name: '管理员', desc: '拥有全部权限' },
    { id: 2, name: '销售', desc: '查看线索' },
  ]);
  await knex('role_permissions').insert([
    { id: 1, roleId: '1', permissionId: '1' },
    { id: 2, roleId: '1', permissionId: '2' },
    { id: 3, roleId: '2', permissionId: '2' },
  ]);
  await knex('permissions').insert([
    { id: 1, permission: 'user' },
    { id: 2, permission: 'clue' },
  ]);
};
