const express = require('express');
const router = express.Router();
// 导入用户模型
const UserModel = require('../../models/UserModel')
// 导入md5加密
const md5 = require('md5');

// 注册
router.get('/reg', (req, res) => {
    res.render('reg')
})

// 注册页面
router.post('/reg', (req, res) => {
    // console.log(req.body);
    UserModel.create({ ...req.body, password: md5(req.body.password) }, (err, data) => {
        if (err) {
            // console.log(err);
            res.status(500).send('注册失败')
            return
        }
        res.render('success', { msg: '注册成功', url: '/login' })
    })
})

// 登录页面
router.get('/login', (req, res) => {
    res.render('login')
})

// 登录操作
router.post('/login', (req, res) => {
    // 获取用户名和密码
    let { username, password } = req.body
    // 查询数据库
    UserModel.findOne({ username, password: md5(password) }, (err, data) => {
        if (err) {
            res.status(500).send('登录失败')
            return
        }
        // 判断data 密码正确是有值 错误是null
        if (!data) {
            return res.send('账号或者密码错误')
        }
        // 登录成功响应
        // 写入session
        req.session.username = data.username;
        req.session._id = data._id;
        res.render('success', { msg: '登录成功', url: '/accounts' })
    })
})

// 退出登录
router.post('/logout', (req, res) => {
    // 销毁session
    req.session.destroy(() => {
        res.render('success', { msg: '已退出登录', url: '/login' })
    })
})
module.exports = router;
