const userModelClass = require('../models/userModel')
const userModel = new userModelClass();
// token设置
const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const user = {
  showAll: async function (req, res, next) {
    if (!res.locals.isLogin) {
      res.redirect('/admin/login')
      return
    }

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
    if (!res.locals.isLogin) {
      res.redirect('/admin/login')
      return
    }
    let id = req.params.id;
    try {
      const users = await userModel.select({ id });
      // 向页面中发送消息
      const user = users[0]

      // 除了顾客的信息，还需要发送过来该用户对应的clue表格
      res.render('admin/userDetail', {
        page: 'user',
        userId: req.params.id,
        user,
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
    if (!res.locals.isLogin) {
      return
    }
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
      let user = users[0]
      if (users.length) {
        // 生成token
        let token = JWT.sign({ user_id: user.id, user_name: user.name }, JWT_SECRET, {
          expiresIn: "30d"
        });
        // 将其设置在cookie中
        res.cookie('web_token', token, { maxAge: 30 * 24 * 60 * 60 });
        res.json({ code: 200, message: '登录成功！', data: { token: token } });
      } else {
        res.json({ code: 0, data: { msg: '登录失败，没有此用户！' } })
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