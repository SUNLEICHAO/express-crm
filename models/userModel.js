const config = require('../knexfile').development;
const knex = require('knex')(config);

const BaseModel = require('./base')

class UserModel extends BaseModel {
  constructor(props = 'users') {
    super(props)
  }

  selectRoleByUserId(params) {
    return knex(this.table).join('user_roles', this.table + '.id', '=', 'user_roles.userId').select().where(params)
  }

  userRoleName() {
    return knex(this.table)
      .join('accounts', 'users.id', 'accounts.user_id')
      .select('users.user_name as user', 'accounts.account_name as account');
  }

}

module.exports = UserModel