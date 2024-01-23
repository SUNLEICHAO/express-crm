const BaseModel = require('./base')

class rolePermissionModel extends BaseModel {
  constructor(props = 'role_permissions') {
    super(props)
  }
}

module.exports = rolePermissionModel