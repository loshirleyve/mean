/**
 * Created by leon on 15/12/18.
 */

var wxApi = require("y9-wx-api");
var superagent = require("superagent");
sha1 = require('sha1');
var debug = require("debug")("y9-wservice-wx-gateway")
module.exports = function (app) {

    var config = {
        token: 'Sybase12',
        appid: 'wx3f12d479b0082446',
        encodingAESKey: 'oBUm0JaR3RcM5GcZX2V5NqQwZ5G0T31JMzAiLi9260X'
    };

    //接入验证,Api中已经包括了验证
    app.use("/wx/gateway", wxApi(config, function (req, res, next) {
        var message = req.weixin;
        debug("收到微信消息.", message);
        res.reply('你好!欢迎使用移办通!');
    }));

    function getToken(clientID, clientSecret, done) {
        var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + clientID + "&secret=" + clientSecret;

        superagent.get(url)
            .end(function (err, res) {
                var result = res.body;
                if (done) {
                    done(result);
                }
            });
    }

    function checkSignature(req, token) {

        // 获取校验参数
        var signature = req.query.signature,
            timestamp = req.query.timestamp,
            nonce = req.query.nonce,
            echostr = req.query.echostr;

        // 按照字典排序
        var array = [token, timestamp, nonce];
        array.sort();

        // 连接
        var str = sha1(array.join(""));

        debug("计算后的签名:" + str);
        // 对比签名
        if (str == signature) {
            return true;
        } else {
            return false;
        }
    }
};