const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const auth = {
  // 判断登录的状态
  loginAuth: function (req, res, next) {
    // 生成isLogin
    res.locals.isLogin = false;
    res.locals.userId = {};
    let token = req.cookies.web_token;
    if (token) {
      JWT.verify(token, JWT_SECRET, function (err, decoded) {
        if (!err) {
          res.locals.isLogin = true;
          res.locals.userInfo = {
            id: decoded.user_id,
            name: decoded.user_name,
            role: decoded.user_role
          }
          next();
        } else {
          next();
        }
      })
      return
    }
    next();
  },

  // 判断角色有无访问权限
  roleAuth: function (req, res, next) {
    // 生成isLogin
    let isLogin = res.locals.isLogin;
    // 可能多此一举
    if (!isLogin) {
      next();
      return
    } else {
      // 若不是管理员，无权访问
      let role = res.locals.userInfo.role;
      if (req.originalUrl.indexOf('clue') === -1) {
        console.log('无权访问');
        // console.log('角色为：', req.originalUrl,'~~~', req.path);
        res.render('error',{
          message:'403 无权查看!'
        })
      }
      next();
      return
    }
  }
}

module.exports = auth;