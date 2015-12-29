/**
 * Created by leon on 15/12/18.
 */

var wxApi = require("y9-wx-api");
var debug = require("debug")("y9-wservice-wx-gateway")
module.exports = function (app) {

    var BASE_URL = "http://www.yun9.com/biz/";

    var config = {
        token: 'Sybase12',
        appid: 'wx3f12d479b0082446',
        encodingAESKey: 'oBUm0JaR3RcM5GcZX2V5NqQwZ5G0T31JMzAiLi9260X'
    };

    var List = wxApi.List;
    List.add('function', [
        ['回复{客户}查看', function (info, req, res) {
            res.reply('点击<a href="'+BASE_URL+'client'+'">这里</a>查看客户列表');
        }],
        ['回复{产品}查看', function (info, req, res) {
            res.reply('点击<a href="'+BASE_URL+'product'+'">这里</a>查看产品列表');
        }],
        ['回复{素材}查看', function (info, req, res) {
            res.reply('点击<a href="'+BASE_URL+'file-material'+'">这里</a>查看素材管理');
        }],
        ['回复{系统文件}查看', function (info, req, res) {
            res.reply('点击<a href="'+BASE_URL+'file-sys'+'">这里</a>查看系统文件');
        }],
        ['回复{用户文件}查看', function (info, req, res) {
            res.reply('点击<a href="'+BASE_URL+'file-user'+'">这里</a>查看用户文件');
        }],
        ['回复{机构}查看', function (info, req, res) {
            res.reply('点击<a href="'+BASE_URL+'inst'+'">这里</a>查看机构列表');
        }],
        ['回复{订单}查看', function (info, req, res) {
            res.reply('点击<a href="'+BASE_URL+'order'+'">这里</a>查看订单中心');
        }],
        ['回复{工单}查看', function (info, req, res) {
            res.reply('点击<a href="'+BASE_URL+'workorder'+'">这里</a>查看工单中心');
        }],
        ['回复{收款}查看', function (info, req, res) {
            res.reply('点击<a href="'+BASE_URL+'receivable'+'">这里</a>查看收款列表');
        }]
    ]);

    //接入验证,Api中已经包括了验证
    app.use("/wx/gateway", wxApi(config, function (req, res, next) {
        var message = req.weixin;
        if (message === '功能') {
            res.wait('function');
        } else {
            res.reply('你好!欢迎使用移办通!');
        }
    }));
};