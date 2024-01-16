const login = async function (req, res, next) {
  // res.send(`${req.params.id} 为用户信息`);
  res.render('admin/clueDetail', {
    clueInfo: req.params.id,
    page: "clue"
  })
}

module.exports = login