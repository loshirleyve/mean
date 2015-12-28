/**
 * Created by leon on 15/12/28.
 */

var service = require("y9-mars-service");
var proxy = service.Proxy();

exports = module.exports = function () {
    return function (req, res, next) {
        //TODO 从req中获取请求参数
        //
        // 注册策略
        proxy.use("Y9", service.ProxyY9({
            token: "8fc50dd14a951318ca168e40a9fa1ec78d1110e058700c9affdbe6ab5eb6b931",
            baseurl: "http://120.24.84.201:10080/ws-biz/service/action.yun9",
            header: {}
        }));

        proxy.action("ServiceName", {
            proxy: "Y9",
            action: "com.yun9.ws.biz.service.QueryWorkOrdersService"
        });

        proxy.post("ServiceName")
            .params({})
            .launch(function (response) {
                //TODO 执行成功
                res.send(response.body.data);
            }, function (error) {
                res.send(error);
            });
    }
};

exports.type = ["post"];