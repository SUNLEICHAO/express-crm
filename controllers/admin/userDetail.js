const user = async function (req, res, next) {
  res.render('admin/userDetail', {
    userInfo: req.params.id,
    page: "user"
  })
}

module.exports = user