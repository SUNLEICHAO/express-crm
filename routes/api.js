var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');
const customerController = require('../controllers/customer');
const clueController = require('../controllers/clue');
const roleController = require('../controllers/role');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.redirect('/login')
});

// 请求的时候需要手机和密码
// 登录对应post接口
router.post('/login', userController.auth)

// #1用户相关
router.post('/user', userController.insert) //  添加用户
router.put('/user', userController.update) // 修改信息对应put接口
router.get('/user', userController.select) // 查找

// #2 顾客相关
router.post('/customer', customerController.insert) // 顾客注册
router.put('/customer', customerController.update)// 顾客备注的修改, 用put，幂等

// #3 线索相关
router.get('/clue', clueController.select) // 线索查找
router.post('/clue', clueController.insert) // 新增线索

// #4 角色相关
router.post('/role', roleController.insert) // 新增线索

module.exports = router;
