const BaseModel = require('./base')

class UserRoleModel extends BaseModel {
  constructor(props = 'user_roles') {
    super(props)
  }

}

module.exports = UserRoleModel