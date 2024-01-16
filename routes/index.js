var express = require('express');
var router = express.Router();

const signupController = require('./../controllers/signup')
const loginController = require('../controllers/admin/login');
const clueController = require('../controllers/admin/clue');
const clueDetailController = require('../controllers/admin/clueDetail');
const userController = require('../controllers/admin/user');
const userDetailController = require('../controllers/admin/userDetail');

/* GET home page. */
router.get('/', signupController);

// router.get('/', function (req, res, next) {
//   // 默认重定向至登录页面
//   res.redirect('/')
// });

router.get('/admin/login', loginController);

router.get('/admin/user', userController);
router.get('/admin/user/:id', userDetailController);

router.get('/admin/clue', clueController);
router.get('/admin/clue/:id', clueDetailController);

router.get('/test', function (req, res, next) {
  res.render('index', { title: ' 测试' })
});

module.exports = router;
