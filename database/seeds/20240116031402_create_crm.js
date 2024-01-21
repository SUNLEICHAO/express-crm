/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('customers').del();
  await knex('clues').del();
  await knex('users').insert([
    { id: 1, name: '沃尔特', phone: '13200000001', password: '1234',},
    { id: 2, name: '平克曼', phone: '13200000002', password: '1234'},
    { id: 3, name: '古德曼', phone: '13200000003', password: '1234'},
    { id: 4, name: '麦克', phone: '13200000004', password: '1234'},
    { id: 5, name: '汉克', phone: '13200000005', password: '1234'},
    { id: 6, name: '古斯', phone: '13200000006', password: '1234'},
    { id: 7, name: '埃拉迪奥', phone: '13200000007', password: '1234'},
    { id: 8, name: '图卡', phone: '13200000008', password: '1234'},
  ]);
  await knex('customers').insert([
    { id: 1, name: '顾客A', phone: '15232000001', source: 'douyin', userid: '4', status: '1', },
    { id: 2, name: '顾客B', phone: '15232000002', source: 'meituan', userid: '6', status: '2', },
    { id: 3, name: '顾客C', phone: '15232000003', source: 'douyin', userid: '5', status: '1', },
    { id: 4, name: '顾客D', phone: '15232000004', source: 'meituan', userid: '8', status: '1', },
    { id: 5, name: '顾客E', phone: '15232000005', source: 'douyin', userid: '8', status: '1', },
    { id: 6, name: '顾客F', phone: '15232000006', source: 'douyin', userid: '8', status: '1', },
    { id: 7, name: '顾客G', phone: '15232000007', source: 'meituan', userid: '4', status: '1', },
    { id: 8, name: '顾客H', phone: '15232000008', source: 'douyin', userid: '4', status: '1', },
    { id: 9, name: '顾客I', phone: '15232000009', source: 'meituan', userid: '2', status: '1', },
    { id: 10, name: '顾客J', phone: '15232000010', source: 'douyin', userid: '8', status: '1', },
    { id: 11, name: '顾客K', phone: '15232000011', source: 'meituan', userid: '1', status: '1', },
    { id: 12, name: '顾客L', phone: '15232000012', source: 'douyin', userid: '8', status: '1', },
    { id: 13, name: '顾客M', phone: '15232000013', source: 'meituan', userid: '2', status: '1', },
    { id: 14, name: '顾客N', phone: '15232000014', source: 'meituan', userid: '7', status: '1', },
    { id: 15, name: '顾客O', phone: '15232000015', source: 'douyin', userid: '2', status: '1', },
    { id: 16, name: '顾客P', phone: '15232000016', source: 'meituan', userid: '1', status: '1', },
  ]);
  await knex('clues').insert([
    { id: 1, customerid: "2", content: '该客户已试车' },
    { id: 2, customerid: "1", content: '该客户从未试车' },
    { id: 3, customerid: "1", content: '该客户已试车' },
  ]);
};
