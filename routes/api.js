var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');
const customerController = require('../controllers/customer');
const clueController = require('../controllers/clue');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.redirect('/login')
});

// 请求的时候需要手机和密码
// 登录对应post接口
router.post('/user',userController.auth)
// 修改信息对应put接口
router.put('/user',userController.update)
// 查找
router.get('/user',userController.select)

// 顾客注册
router.post('/customer',customerController.insert)
// 顾客备注的修改, 用put，幂等
router.put('/customer',customerController.update)

// 线索查找
router.get('/clue',clueController.select)
router.post('/clue',clueController.insert)

module.exports = router;
