const login = async function (req, res, next) {
  res.render('admin/login', res.locals)
}

module.exports = login