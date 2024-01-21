const config = require('../knexfile').development;
const knex = require('knex')(config);

const BaseModel = require('./base')

class RoleModel extends BaseModel {
  constructor(props = 'roles') {
    super(props)
  }

  updataByUserId(userId, params) {
    return knex(this.table).where('userId', userId).update(params)
  }
}

module.exports = RoleModel