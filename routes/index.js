var express = require('express');
var router = express.Router();

const customerController = require('../controllers/customer');
const userController = require('../controllers/user');
const roleController = require('../controllers/role');

var auth = require('../middlewares/auth')

/* GET home page. */

// 落地页（用户注册）
router.get('/', customerController.signup);

router.get('/admin/login', userController.login);
router.get('/admin/logout', userController.logout);

router.get('/admin/user', auth.roleAuth2('user'), userController.showAll);
router.get('/admin/user/:id', auth.roleAuth2('user'), userController.showOne);

router.get('/admin/role',auth.roleAuth2('user'), roleController.showAll);

router.get('/admin/clue', auth.roleAuth2('clue'), customerController.showAll);
router.get('/admin/clue/:id', auth.roleAuth2('clue'), customerController.showOne);

// 测试页面
router.get('/test', function (req, res, next) {
  res.render('index', { title: ' 测试' })
});

module.exports = router;
