/**
 * Created by leon on 15/12/18.
 */

var wxApi = require("y9-wx-api");
var superagent = require("superagent");
sha1 = require('sha1');
var debug = require("debug")("y9-wservice-wx-gateway")
module.exports = function (app) {

    //接入验证
    app.get("/wx/gateway", function (req, res, next) {
        debug("微信接入验证网关.", req.query);

        var sigState = checkSignature(req, "Sybase12");
        if (sigState) {
            res.send(200, req.query.echostr);
        } else {
            res.send(200, 'fail');
        }

        //getToken("wx3f12d479b0082446", "eb61f0db8aa0403d30e9f9f3fe569af0", function (response) {
        //    if (response && response.access_token) {
        //
        //    } else {
        //        res.send(200, 'fail');
        //    }
        //});


    });

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