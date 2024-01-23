const BaseModel = require('./base')

class RoleModel extends BaseModel {
  constructor(props = 'roles') {
    super(props)
  }
}

module.exports = RoleModel