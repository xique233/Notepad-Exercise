var express = require('express');
var router = express.Router();

const moment = require('moment')
const AccountModel = require('../../models/AccountModel')

// * 导入中间件检测登录
const checkLoginMiddleware = require('../../middleware/checkLoginMiddleware')

// * 添加首页路由规则
router.get('/', (req, res) => {
  // 重定向到/accounts
  res.redirect('/accounts')
})

// * 记账本列表
router.get('/accounts', checkLoginMiddleware, function (req, res, next) {
  // 获取所有账单信息
  // let accounts = db.get('accounts').value()
  // 读取集合信息
  AccountModel.find().sort({ time: -1 }).exec((err, data) => {
    if (err) {
      // console.log(err);
      res.status(500).send('读取失败')
      return
    }
    res.render('list', { accounts: data, moment })
  })
});
// * 添加记录
router.get('/accounts/create', checkLoginMiddleware, function (req, res, next) {
  res.render('create')
});
// * 新增记录
router.post('/accounts', checkLoginMiddleware, (req, res) => {
  // 插入数据库
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('插入失败');
      return
    }
    res.render('success', { msg: '添加成功', url: '/accounts' })
  })

})

// * 删除记录
router.get('/accounts/:id', checkLoginMiddleware, (req, res) => {
  // 获取id参数
  let id = req.params.id;
  // 删除记录
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.statusCode(500).send('删除失败')
      return
    }
    res.render('success', { msg: '删除成功', url: '/accounts' })
  })


})

module.exports = router;
