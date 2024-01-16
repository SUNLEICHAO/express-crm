var express = require('express');
var router = express.Router();

const loginController = require('../controllers/login.js')

/* GET users listing. */
router.get('/', function (req, res, next) {
  // 默认重定向至登录页面
  // res.redirect('/admin/login')
});

// 请求的时候需要手机和密码
router.get('/login',loginController)

module.exports = router;
