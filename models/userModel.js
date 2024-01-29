const config = require('../knexfile').development;
const knex = require('knex')(config);

const BaseModel = require('./base')

class UserModel extends BaseModel {
  constructor(props = 'users') {
    super(props)
  }

  selectRoleByUserId(params) {
    return knex(this.table).join('user_roles', this.table + '.id', '=', 'user_roles.user_id').select().where(params)
  }

}

module.exports = UserModel