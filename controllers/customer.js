const customerModelClass = require('../models/customerModel')
const customerModel = new customerModelClass();
// 通过顾客表对应的的销售id，查找到该销售的名字
const userModelClass = require('../models/userModel')
const userModel = new userModelClass();

const clueModelClass = require('../models/clueModel')
const clueModel = new clueModelClass();

const userRoleModelClass = require('../models/userRoleModel')
const userRoleModel = new userRoleModelClass();

const customer = {
  showAll: async function (req, res, next) {
    if (!res.locals.isLogin) {
      res.redirect('/admin/login')
      return
    }
    try {
      // 请求全部的数据
      // let customersAll = await customerModel.all();
      // 直接请求数据
      let customersCount = await customerModel.select({}).count('* as count').first();

      // 获取要请求的页数
      let current = req.query.current || 1
      let limit = req.query.limit || 5
      // 请求部分的数据
      let customers = await customerModel.selectSpan(limit, (current - 1) * limit);
      
      // 得到该页中所需展示的 user_id
      let user_ids = [];
      customers.forEach(e=>{
        e.user_id && user_ids.push(e.user_id)
      })
      // 根据id在user中找到匹配的user，即获取销售人员的列表
      let tarUsers = await userModel.all().whereIn('id',user_ids).select('id','name');
      // 销售人员的hash表，根据顾客的user_id属性在userDict中获得销售人员名字
      let userDict = { "0": '未分配' };
      tarUsers.forEach(e => {
        userDict[e.id] = e.name
      })
      // customers列表中：时间和销售展示
      customers.map(e => {
        e.created_at = e.created_at.toLocaleString()
        e.user = userDict[e.user_id || '0']
      })
      res.render('admin/clue', {
        code: 200,
        customers,
        page: 'clue',
        customersLength: customersCount.count,
        current,
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
      const customers = await customerModel.select({ id });
      const customer = customers[0];

      // 拿到对应的销售人员
      let user = await userModel.select({ id: customer.user_id });
      customer.username = user[0] ? user[0].name : '暂未确定';

      // 拿到对应的线索列表
      let clues = await clueModel.select({ customerid: id });

      // 时间格式的转换
      customer.created_at = customer.created_at.toLocaleString()

      let salerIds = await userRoleModel.select({ role_id: "2" }).pluck('user_id')
      let salers = await userModel.all().whereIn('id',salerIds)

      clues.map(e => e.created_at = e.created_at.toLocaleString())

      res.render('admin/clueDetail', {
        page: 'clue',
        clueInfo: req.params.id,
        clue_list: clues,
        customer,
        salers
      })
    } catch (e) {
      res.locals.error = e;
      res.render('error', res.locals)
    }
  },
  signup: async function (req, res, next) {
    // 将网址传递的参数拿到，并传递到模板中（模板拿到，发送ajax时带上该参数）
    res.render('signup', { utf: req.query.utf })
  },


  // 以下为api接口
  insert: async function (req, res, next) {
    let name = req.body.name;
    let tel = req.body.tel;
    let source = req.body.utf || '未知来源';
    try {
      const customer = await customerModel.insert({ name, phone: tel, source })
      if (customer.length) {
        res.json({ code: 200, data: customer })
      } else {
        res.json({ code: 0, data: customer })
      }
    } catch (e) {
      res.json({ code: 100, data: e })
    }
  },
  update: async function (req, res, next) {
    let id = req.body.id;
    let status = req.body.status;
    let user_id = req.body.user_id;
    let remark = req.body.remark;
    try {
      const customer = await customerModel.update(id, { status, user_id, remark })
      if (customer) {
        res.json({ code: 200, data: customer })
      } else {
        res.json({ code: 0, data: customer })
      }
    } catch (e) {
      res.json({ code: 100, data: e })
    }
  },

}

module.exports = customer