const customerModelClass = require('../../models/customerModel')
const customerModel = new customerModelClass();

const clue = async function (req, res, next) {
  // 状态对应的不同情况
  let statusDict = {
    "0": '不明',
    "1": '未进店用户',
    "2": '购买意愿强烈',
    "3": '暂无购买意愿'
  }

  try {
    let customers = await customerModel.all();
    customers.map(e => e.status = statusDict[e.status || '0'])
    res.locals.customers = customers;
    res.render('admin/clue', {
      page: 'clue'
    })
  } catch (e) {
    res.locals.error = e;
    res.render('error', res.locals)
  }
}

module.exports = clue