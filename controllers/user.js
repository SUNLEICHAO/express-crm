const userModelClass = require('../models/userModel')
const userModel = new userModelClass();

const roleModelClass = require('../models/roleModel')
const roleModel = new roleModelClass();

const userRoleModelClass = require('../models/userRoleModel')
const userRoleModel = new userRoleModelClass();

const rolePermissionModelClass = require('../models/rolePermissionModel')
const rolePermissionModel = new rolePermissionModelClass();

const permissionModelClass = require('../models/permissionModel')
const permissionModel = new permissionModelClass();

// token设置
const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const user = {
  showAll: async function (req, res, next) {
    // 判断是否登录
    if (!res.locals.isLogin) {
      res.redirect('/admin/login')
      return
    }

    // 展示出所有销售
    try {
      const users = await userModel.all();
      const roles = await roleModel.all();
      const userRoles = await userRoleModel.all()

      /* 
        目的：展示角色项
       */
      let userRoleList = {}
      for (let userRole of userRoles) {
        let userId = userRole.userId;
        let roleId = userRole.roleId;
        // 根据roleid找到其姓名 
        let roleName = await roleModel.all().where({ id: roleId }).select('name');
        userRoleList[userId] = roleName[0].name;
      }
      // 向页面中发送消息
      res.render('admin/user', {
        page: 'user',
        users,
        roles,
        userRoleList
      })
    } catch (e) {
      res.locals.error = e;
      res.render('error', res.locals)
    }
  },
  showOne: async function (req, res, next) {
    if (!res.locals.isLogin) {
      res.redirect('/admin/login')
      return
    }

    let userId = req.params.id;
    try {
      const user = await userModel.select({ id: userId }).first();
      const roles = await roleModel.all();
      // 通过用户的id，在用户-角色表中找到其对应的角色
      const userRole = await userModel.selectRoleByUserId({ userId }).first()

      // 除了顾客的信息，还需要发送过来该用户对应的clue表格
      res.render('admin/userDetail', {
        page: 'user',
        userId: req.params.id,
        roles,
        user,
        userRole: userRole
      })
    } catch (e) {
      res.locals.error = e;
      res.render('error', res.locals)
    }
  },
  login: async function (req, res, next) {
    // 此时若已登录，进入管理页面
    if (res.locals.isLogin) {
      res.redirect('/admin/clue')
      return
    }

    try {
      res.render('admin/login', res.locals)
    } catch (e) {
      res.locals.error = e;
      res.render('error', res.locals)
    }
  },
  // 隐形页面，只提供跳转的作用
  logout: async function (req, res, next) {
    // 此时若已登录，进入管理页面
    // if (!res.locals.isLogin) {
    //   return
    // }
    res.clearCookie('web_token')
    res.redirect('/admin/login')
  },

  // 以下为api接口
  // 登录的接口,鉴别用户
  auth: async function (req, res, next) {
    let phone = req.body.tel;
    let password = req.body.password;
    try {
      const users = await userModel.select({ phone, password })
      if (!users.length) {
        res.json({ code: 0, data: { msg: '登录失败，没有此用户！' } })
        next()
        return
      }
      let user = users[0]
      let userRoles = await userRoleModel.select({ userId: user.id })
      let roleId,roleName;
      let permissions = [];
      // 根据角色id，查找到对应的权限id；根据权限id查找到对应的权限名称，
      if(userRoles.length==0){
        roleId = ''
        roleName = '无此角色'
      } else {
        roleId = userRoles[0].roleId
        let roles = await roleModel.select({ id: roleId });
        roleName = roles[0].name
        let rolePermissions = await rolePermissionModel.select({ roleId: roleId });
        for(let rolePermission of rolePermissions){
          let permission = await  permissionModel.select({id: rolePermission.permissionId}).first()
          permissions.push(permission.permission)
        }
      }

      // 如果没有任何权限
      if(!permissions.length){
        res.json({ code: 403 })
        return
      }
      // 生成token
      let token = JWT.sign({ 
        user_id: user.id, 
        user_name: user.name, 
        user_roleId: roleId,
        user_roleName: roleName,
        user_permissions: permissions
      }, JWT_SECRET, {
        expiresIn: "30d"
      });
      // // 将其设置在cookie中
      res.cookie('web_token', token, { maxAge: 30 * 24 * 60 * 60 });
      res.json({ code: 200, message: '登录成功！', data: { token: token } });
    } catch (e) {
      res.json({ code: 100, data: e })
    }
  },
  insert: async function (req, res, next) {
    let name = req.body.name;
    let tel = req.body.tel;
    let password = req.body.password;
    let roleId = req.body.roleId;
    try {
      const user = await userModel.insert({ name, phone: tel, password });
      const userRole = await userRoleModel.insert({ userId: user[0], roleId });
      res.json({ code: 200, data: user })
    } catch (e) {
      res.json({ code: 100, data: e })
    }
  },
  update: async function (req, res, next) {
    let userId = req.body.userId;
    let name = req.body.name;
    let tel = req.body.tel;
    let password = req.body.password;
    let roleId = req.body.roleId;
    try {
      const user = await userModel.update(userId, { name, phone: tel, password });
      // 查找数据库，没有的话就添加，有的话
      const userRoleExit = await userRoleModel.select({ userId });
      if (!userRoleExit.length) {
        // 原来没有，就添加
        const userRole = await userRoleModel.insert({ userId, roleId });
      } else {
        // 原来有，则修改
        const userRole = await userRoleModel.update(userRoleExit[0].id, { userId, roleId });
      }
      res.json({ code: 200, data: user })
    } catch (e) {
      res.json({ code: 100, data: e })
    }
  },
  select: async function (req, res, next) {
    let id = req.body.id;
    try {
      const user = await userModel.select({ id });
      res.json({ code: 200, data: user })
    } catch (e) {
      res.json({ code: 100, data: e })
    }
  },
}

module.exports = user