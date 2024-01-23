const rolePermissionModelClass = require('../models/rolePermissionModel')
const rolePermissionModel = new rolePermissionModelClass();

const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const auth = {
  // 判断登录的状态
  loginAuth: function (req, res, next) {
    // 生成isLogin
    res.locals.isLogin = false;
    let token = req.cookies.web_token;
    if (token) {
      JWT.verify(token, JWT_SECRET, function (err, decoded) {
        if (!err) {
          res.locals.isLogin = true;
          res.locals.userInfo = {
            id: decoded.user_id,
            name: decoded.user_name,
            roleId: decoded.user_roleId,
            roleName: decoded.user_roleName,
            rolePermissions: decoded.user_permissions,
          }
          if(!decoded.user_permissions){
            res.end('403,您无权访问')
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

    // 该角色可以访问的列表
    if(!res.locals.isLogin){
      next()
      return
    }

    let permissions = res.locals.userInfo.rolePermissions || ''
    let flag = false;
    if(permissions.includes('user')) permissions.push('role')
    // console.log(permissions);
    for (let permission of permissions) {
      // 将可以访问的权限列表和将要访问的地址做对比
      // 在将要访问的网站字符串中，遍历查找权限列表，如果列表中有符合的，则通过
      if (req.originalUrl.indexOf(permission) !== -1) {
        flag = true
      }
    }

    if (!flag) {
      res.render('error', {
        error: {
          status: 403,
          stack: '您无权查看!'
        }
      })
      return
    }
    next()
  }
}

module.exports = auth;