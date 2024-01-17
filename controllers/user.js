const userModelClass = require('../models/userModel')
const userModel = new userModelClass();

const user = {
  showAll: async function (req, res, next) {
    // 展示出所有销售
    try {
      const users = await userModel.all();
      // 向页面中发送消息
      res.render('admin/user', {
        page: 'user',
        users
      })
    } catch (e) {
      res.locals.error = e;
      res.render('error', res.locals)
    }
  },
  showOne: async function (req, res, next) {
    let id = req.params.id;
    try {
      const users = await userModel.select({ id });
      // 向页面中发送消息
      const user = users[0]

      // 除了顾客的信息，还需要发送过来该用户对应的clue表格
      res.render('admin/userDetail', {
        page: 'user',
        userInfo: req.params.id,
        user,
      })
    } catch (e) {
      res.locals.error = e;
      res.render('error', res.locals)
    }
  },
  login: async function (req, res, next) {
    try {
      res.render('admin/login', res.locals)
    } catch (e) {
      res.locals.error = e;
      res.render('error', res.locals)
    }
  },

  // 以下为api接口
  // 登录的接口,鉴别用户
  auth: async function (req, res, next) {
    let phone = req.body.tel;
    let password = req.body.password;
    try {
      const user = await userModel.select({ phone, password })
      if (user.length) {
        res.json({ code: 200, data: user })
      } else {
        res.json({ code: 0, data: user })
      }
    } catch (e) {
      res.json({ code: 100, data: e })
    }
  },
  update: async function (req, res, next) {
    let id = req.body.id;
    let name = req.body.name;
    let tel = req.body.tel;
    let password = req.body.password;
    let role = req.body.role;
    try {
      const user = await userModel.update(id, { name, phone: tel, password, role });
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