/**
 * Created by leon on 15/12/18.
 */

var wxApi = require("y9-wx-api");
var debug = require("debug")("y9-wservice-wx-gateway")
module.exports = function (app) {

    //接入验证
    app.get("/wx/gateway", function (req, res, next) {
        debug("微信接入验证网关.", req.query);

        var sigState = wxApi.checkSignature(req.query)

        if (sigState) {
            res.send(200, req.query.echostr);
        } else {
            res.send(200, 'fail');
        }
    });
};