const clueModelClass = require('../models/clueModel')
const clueModel = new clueModelClass();

const clue = {
  // api调用
  select: async function (req, res, next) {
    let id = req.query.id
    if (!id) {
      res.json({ code: 0, data: '请确认销售id！' })
      return
    }
    try {
      const clues = await clueModel.select({ customerid: id });
      res.json({ code: 200, data: clues })
    } catch (e) {
      res.json({ code: 100, data: e })
    }
  },

  insert: async function (req, res, next) {
    let content = req.body.content;
    let customerid = req.body.customerid;
    if (!content) {
      res.json({ code: 0, data: '请输入跟踪记录' })
      return
    }
    try {
      console.log('sss');
      const clue = await clueModel.insert({ customerid,content });
      res.json({ code: 200, data: clue })
    } catch (e) {
      res.json({ code: 100, data: e })
    }
  },
}

module.exports = clue