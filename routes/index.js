var express = require('express');
var router = express.Router();

const customerController = require('../controllers/customer');
const userController = require('../controllers/user');
const roleController = require('../controllers/role');

/* GET home page. */
// router.get('/', function (req, res, next) {
//   // 默认重定向至登录页面
//   res.redirect('/')
// });

// 落地页（用户注册）
router.get('/', customerController.signup);
// router.get('/:utf', function (req, res, next) {
//   res.redirect('/login',{})
// });

router.get('/admin/login', userController.login);
router.get('/admin/logout', userController.logout);

router.get('/admin/user', userController.showAll);
router.get('/admin/user/:id', userController.showOne);

// 角色管理
router.get('/admin/role', roleController.showAll);

router.get('/admin/clue', customerController.showAll);
router.get('/admin/clue/:id', customerController.showOne);


// 测试页面
router.get('/test', function (req, res, next) {
  res.render('index', { title: ' 测试' })
});

module.exports = router;
