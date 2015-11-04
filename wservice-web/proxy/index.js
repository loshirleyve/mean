/**
 * Created by leon on 15/10/22.
 */

var service = require("y9-mars-service");
var proxy = service.Proxy();

//注册策略
proxy.use("Y9", service.ProxyY9({
    token: "8fc50dd14a951318ca168e40a9fa1ec78d1110e058700c9affdbe6ab5eb6b931",
    baseurl: "http://120.24.84.201:10080/ws-biz/service/action.yun9",
    header: {}
}));

//注册动作
proxy.action("queryOrderList", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryOrdersByStateService"
}).action("queryOrderInfo", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryOrderInfoService"
}).action("QueryProductsNoGroup", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductsNoGroupService"
}).action("QueryProductInfoById", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductInfoByIdService"
}).action("queryWorkorderList", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryWorkOrdersService"
}).action("queryWorkorderDetail", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryWorkOrderByIdService"
}).action("queryUsersByOrgid",{
    proxy:"Y9",
    action:"com.yun9.sys.user.service.QueryUsersByOrgidService"
});

module.exports = proxy;