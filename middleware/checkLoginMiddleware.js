// 检测登录中间件
module.exports = (req, res, next) => {
    // 判断
    if (!req.session.username) {
        return res.render('login')
    }
    next()
}