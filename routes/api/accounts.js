var express = require('express');
var router = express.Router();

const moment = require('moment')
const AccountModel = require('../../models/AccountModel')


// * 记账本列表
router.get('/accounts', function (req, res) {
    // 读取集合信息
    AccountModel.find().sort({ time: -1 }).exec((err, data) => {
        if (err) {
            res.json({
                code: '1001',
                msg: '读取失败',
                data: null
            })
            return
        }
        res.json({
            // 响应编号
            code: 0000,
            // 响应信息
            msg: '读取成功',
            // 响应数据
            data
        })
    })
});

// * 新增记录
router.post('/accounts', (req, res) => {
    // 插入数据库
    AccountModel.create({
        ...req.body,
        time: moment(req.body.time).toDate()
    }, (err, data) => {
        if (err) {
            res.json({
                code: '1002',
                msg: '创建失败',
                data: null
            })
            return
        }
        res.json({
            // 响应编号
            code: 0000,
            // 响应信息
            msg: '创建成功',
            // 响应数据
            data
        })
    })

})

// * 删除记录
router.delete('/accounts/:id', (req, res) => {
    // 获取id参数
    let id = req.params.id;
    // 删除记录
    AccountModel.deleteOne({ _id: id }, (err, data) => {
        if (err) {
            res.json({
                code: '1002',
                msg: '删除失败',
                data: null
            })
            return
        }
        res.json({
            // 响应编号
            code: 0000,
            // 响应信息
            msg: '删除成功',
            // 响应数据
            data: {}
        })
    })
})

// * 获取单个账单信息
router.get('/accounts/:id', (req, res) => {
    // 获取id参数
    let { id } = req.params
    // 查询数据库
    AccountModel.findById(id, (err, data) => {
        if (err) {
            res.json({
                code: '1003',
                msg: '查询失败',
                data: null
            })
            return
        }
        res.json({
            // 响应编号
            code: 0000,
            // 响应信息
            msg: '删除成功',
            // 响应数据
            data
        })
    })
})

// * 更新单个账单信息
router.patch('/accounts/:id', (req, res) => {
    // 获取id参数
    let { id } = req.params
    // 更新数据库
    AccountModel.updateOne({ _id: id }, req.body, (err, data) => {
        if (err) {
            res.json({
                code: '1004',
                msg: '更新失败',
                data: null
            })
            return
        }
        // 再次查询数据库
        AccountModel.findById(id, (err, data) => {
            if (err) {
                res.json({
                    code: '1003',
                    msg: '查询失败',
                    data: null
                })
                return
            }
            res.json({
                // 响应编号
                code: 0000,
                // 响应信息
                msg: '更新成功',
                // 响应数据
                data
            })
        })

    })
})

module.exports = router;
