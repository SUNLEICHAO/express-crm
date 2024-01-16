const config = require('../knexfile').development;
const knex = require('knex')(config);

class base {
  constructor(props) {
    this.table = props;
  }

  // 获取全部数据
  all() {
    return knex(this.table).select()
  }

  select(params) {
    return knex(this.table).select().where(params)
  }

  // 插入
  insert(params) {
    return knex(this.table).insert(params)
  }

  // 修改
  update(id, params) {
    return knex(this.table).where('id', id).update(params)
  }

  // 删除
  delete(id) {
    return knex(this.table).where('id', id).del()
  }

}

module.exports = base;
