/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries（暂时不用）
  await knex('users').del();
  await knex('customers').del();
  await knex('clues').del();
  await knex('users').insert([
    { id: 1, name: '沃尔特', phone: '13231018987', password: '1234', role: 'admin', },
    { id: 2, name: '平克曼', phone: '15231018287', password: '1234', role: 'admin', },
    { id: 3, name: '古德曼', phone: '13231218987', password: '1234', role: 'admin', },
    { id: 4, name: '麦克', phone: '13231012987', password: '1234', role: 'admin', },
    { id: 5, name: '汉克', phone: '13231010987', password: '1234', role: 'admin', },
  ]);
  await knex('customers').insert([
    { id: 1, name: '顾客A', phone: '13231018987', source: '1234', userid: '2', status: '1', },
    { id: 2, name: '顾客B', phone: '15231018287', source: '1234', userid: '4', status: '2', },
    { id: 3, name: '顾客C', phone: '13231218987', source: '1234', userid: '4', status: '1', },
    { id: 4, name: '顾客D', phone: '13231012987', source: '1234', userid: '1', status: '1', },
  ]);
  await knex('clues').insert([
    { id: 1, customerid: "2", content: '该客户已试车' },
    { id: 2, customerid: "1", content: '该客户从未试车' },
    { id: 3, customerid: "1", content: '该客户已试车' },
  ]);
};
