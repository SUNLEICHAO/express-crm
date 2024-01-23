const BaseModel = require('./base')

class UserRoleModel extends BaseModel {
  constructor(props = 'user_roles') {
    super(props)
  }

  // selectByUserId(userId, params) {
  //   return knex(this.table).where('userId', userId)
  // }

  // updataByUserId(userId, params) {
  //   return knex(this.table).where('userId', userId).update(params)
  // }

}

module.exports = UserRoleModel