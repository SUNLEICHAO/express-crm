const userModelClass = require('../models/userModel')
const userModel = new userModelClass();

const login = async function (req, res, next) {
  let phone = req.query.tel;
  let password = req.query.password;
  try {
    const user = await userModel.select({ phone,password })
    if (user.length) {
      res.json({ code: 200, data: user })
    } else {
      res.json({ code: 0, data: user })
    }
  } catch (e) {
    console.log('参数传错了');
    res.json({ code: 100, data: e })
  }
}

module.exports = login