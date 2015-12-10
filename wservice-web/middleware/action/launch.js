/**
 * Created by leon on 15/12/9.
 */

var debug = require("debug")("y9-wservice-action");

module.exports = function () {
    return function (req, res, next) {
        //获取Code,如果不存在Code则抛出错误.
        var code = req.query.code;

        debug("获取到本次动作的Code:" + code);

        if (code) {
            //通过code查询动作
            req.y9proxy.post("KitActionQuery")
                .params({
                    "code": code
                })
                .launch(function (response) {
                    debug("查询Code对应的Action成功.");
                    //目前处理方式为直接重定向到type
                    res.redirect("/action/" + response.body.data.type + "?code=" + code);
                }, function (error) {
                    debug("查询Code对应的Action失败.", error);
                    next(new Error(error));
                });

        } else {
            next(new Error("Action处理器无法获取code."));
        }

    }
};