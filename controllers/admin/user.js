const userModelClass = require('../../models/userModel')
const userModel = new userModelClass();

const user = async function (req, res, next) {
  // 展示出所有销售
  try {
    const users = await userModel.all();
    // 向页面中发送消息
    res.locals.users = users;
    res.render('admin/user', {
      page: 'user'
    })

  } catch (e) {
    res.locals.error = e;
    res.render('error', res.locals)
  }


}

module.exports = user