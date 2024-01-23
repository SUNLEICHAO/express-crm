const userRoleModelClass = require('../models/userRoleModel')
const userRoleModel = new userRoleModelClass();

const roleModelClass = require('../models/roleModel')
const roleModel = new roleModelClass();

const rolePermissionModelClass = require('../models/rolePermissionModel')
const rolePermissionModel = new rolePermissionModelClass();

const permissionModelClass = require('../models/permissionModel')
const permissionModel = new permissionModelClass();

const role = {
  showAll: async function (req, res, next) {
    try {
      const roles = await roleModel.all();
      const permissions = await permissionModel.all();
      res.render('admin/role', {
        roles,
        page: 'role',
        // 所有的权限信息
        permissions
      })
    } catch (e) {
      console.log(e);
    }
  },
  showOne: async function (req, res, next) {
    const id = req.params.roleId
    try {
      const role = await roleModel.all().where({ id }).first();
      if (!role) {
        res.json({ error_code: 1, message: '不存在' });
        return;
      }
      const permissions = await rolePermissionModel.all().where({ roleId: id });
      permissionsTransform = permissions.map(data => data.permissionId);
      res.json({
        code: 200, data: {
          id: id,
          role,
          permissions: permissionsTransform
        }
      })

    } catch (e) {
      console.log(e);
    }
  },


  // 以下为api
  insert: async function (req, res, next) {
    let name = req.body.roleName;
    let desc = req.body.roleDesc;
    let permissionsList = JSON.parse(req.body.permissionsList);
    try {
      const roles = await roleModel.insert({ name, desc });
      let roleId = roles[0]
      let rolePermissionToInsert = permissionsList.map(e =>
        ({ roleId, permissionId: e })
      )
      await rolePermissionModel.insert(rolePermissionToInsert)
      if (roles.length) {
        res.json({ code: 200, data: roles })
      } else {
        res.json({ code: 0, data: roles })
      }
    } catch (e) {
      console.log(e);
    }
  },
  delete: async function (req, res, next) {
    let roleId = req.body.roleId;
    try {
      // 删除用户-角色表中所有该角色
      let userRole = await userRoleModel.all().where('roleId', roleId).delete()
      // 删除角色表中所有该角色
      let role = await roleModel.all().where('id', roleId).delete()
      // 删除角色-权限表中所有该角色
      let rolePermissio = await rolePermissionModel.all().where('roleId', roleId).delete()
      res.json({ code: 200, data: [] })
    } catch (e) {
      console.log(e);
    }
  },
  update: async function (req, res, next) {
    let id = req.body.roleId;
    let name = req.body.roleName;
    let desc = req.body.roleDesc;
    let permissionsList = JSON.parse(req.body.permissionsList);
    try {
      // 更改该角色信息
      await roleModel.update(id, { name, desc })

      // 删除原有的所有权限，添加新的权限
      await rolePermissionModel.all().where('roleId', id).delete()

      let rolePermissionToInsert = permissionsList.map(e =>
        ({ roleId:id, permissionId: e })
      )
      await rolePermissionModel.insert(rolePermissionToInsert)

      res.json({ code: 200, data: [] })
    } catch (e) {
      console.log(e);
    }
  },
}

module.exports = role
