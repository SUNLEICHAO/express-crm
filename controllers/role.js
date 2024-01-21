const roleModelClass = require('../models/roleModel')
const roleModel = new roleModelClass();

const role = {
  showAll: async function (req, res, next) {
    // res.json({ code: 200 })
    try {
      const roles = await roleModel.all();
      res.render('admin/role', {
        roles,
        page: 'role',
      })
    } catch (e) {
      console.log(e);
    }
  },

  // 以下为api
  insert: async function (req, res, next) {
    let role = req.body.roleName;
    let desc = req.body.roleDesc;
    try {
      const roles = await roleModel.insert({ role });
      console.log(roles);
      if (roles.length) {
        res.json({ code: 200, data: roles })
      } else {
        res.json({ code: 0, data: roles })
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = role
