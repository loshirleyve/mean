/**
 * Created by leon on 15/12/28.
 */

exports = module.exports = function () {
    return function (req, res, next) {
        var service = require("y9-mars-service");
        var proxy = service.Proxy();

        var params = req.body;

        // 注册策略
        proxy.use("Y9", service.ProxyY9({
            token: "8fc50dd14a951318ca168e40a9fa1ec78d1110e058700c9affdbe6ab5eb6b931",
            baseurl: "http://120.24.84.201:10080/ws-biz/service/action.yun9",
            header: {}
        }));

        proxy.action("ServiceName", {
            proxy: "Y9",
            action: params.action
        });

        proxy.post("ServiceName")
            .params(params.data)
            .launch(function (response) {
                res.send(response.body.data);
            }, function (error) {
                res.send(error.message);
            });
    }
};

exports.type = ["post"];