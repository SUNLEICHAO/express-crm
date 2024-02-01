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
        let user_id = userRole.user_id;
        let role_id = userRole.role_id;
        // 根据roleid找到其姓名 
        let roleName = await roleModel.all().where({ id: role_id }).select('name');
        userRoleList[user_id] = roleName[0].name;
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

    let user_id = req.params.id;
    try {
      const user = await userModel.select({ id: user_id }).first();
      const roles = await roleModel.all();
      // 通过用户的id，在用户-角色表中找到其对应的角色
      const userRole = await userModel.selectRoleByUserId({ user_id }).first()

      // 除了顾客的信息，还需要发送过来该用户对应的clue表格
      res.render('admin/userDetail', {
        page: 'user',
        user_id: req.params.id,
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
      console.log('yun1');
      const users = await userModel.select({ phone, password })
      console.log('yun2',users);
      if (!users.length) {
        res.json({ code: 0, data: { msg: '登录失败，没有此用户！' } })
        next()
        return
      }
      console.log('yun3');
      let user = users[0]
      console.log('yun41',user.id);
      let userRoles = await userRoleModel.select({ user_id: user.id })
      console.log('yun42');
      let role_id,roleName;
      console.log('yun43');
      let permissions = [];
      console.log('yun44');
      // 根据角色id，查找到对应的权限id；根据权限id查找到对应的权限名称，
      console.log('yun4');

      if(userRoles.length==0){
        role_id = ''
        roleName = '无此角色'
      } else {
        role_id = userRoles[0].role_id
        let roles = await roleModel.select({ id: role_id });
        roleName = roles[0].name
        let rolePermissions = await rolePermissionModel.select({ role_id: role_id });
        for(let rolePermission of rolePermissions){
          let permission = await  permissionModel.select({id: rolePermission.permissionId}).first()
          permissions.push(permission.permission)
        }
      }

      console.log('yun5');

      // 如果没有任何权限
      if(!permissions.length){
        res.json({ code: 403 })
        return
      }
      // 生成token
      let token = JWT.sign({ 
        user_id: user.id, 
        user_name: user.name, 
        user_role_id: role_id,
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
    let role_id = req.body.role_id;
    try {
      const user = await userModel.insert({ name, phone: tel, password });
      const userRole = await userRoleModel.insert({ user_id: user[0], role_id });
      res.json({ code: 200, data: user })
    } catch (e) {
      res.json({ code: 100, data: e })
    }
  },
  update: async function (req, res, next) {
    let user_id = req.body.user_id;
    let name = req.body.name;
    let tel = req.body.tel;
    let password = req.body.password;
    let role_id = req.body.role_id;
    try {
      const user = await userModel.update(user_id, { name, phone: tel, password });
      // 查找数据库，没有的话就添加，有的话
      const userRoleExit = await userRoleModel.select({ user_id });
      if (!userRoleExit.length) {
        // 原来没有，就添加
        const userRole = await userRoleModel.insert({ user_id, role_id });
      } else {
        // 原来有，则修改
        const userRole = await userRoleModel.update(userRoleExit[0].id, { user_id, role_id });
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