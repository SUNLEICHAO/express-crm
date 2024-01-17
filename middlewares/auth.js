const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const auth = function (req, res, next) {
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
          name: decoded.user_name
        }
        next();
      } else {
        next();
      }
    })
    return
  }
  next();
}

module.exports = auth;