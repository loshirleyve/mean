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
}).action("queryWorkorderList", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryWorkOrdersService"
}).action("queryWorkorderDetail", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryWorkOrderByIdService"
});



//产品模块
proxy.action("QueryProductsByGroupId", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductsByGroupIdService"
}).action("QueryProductsNoGroup", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductsNoGroupService"
}).action("QueryProductInfoById", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductInfoByIdService"
}).action("AddOrUpdateMdProductGroup", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddOrUpdateMdProductGroupService"
})

//工单
proxy.action("queryWorkorderList", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddOrUpdateMdProductGroupService"
}).action("queryWorkorderDetail", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryWorkOrderByIdService"
}).action("queryUsersByOrgid", {
    proxy: "Y9",
    action: "com.yun9.sys.user.service.QueryUsersByOrgidService"
}).action("queryOrgTree", {
    proxy: "Y9",
    action: "com.yun9.sys.inst.serivce.QueryOrgTreeService"
}).action("startWorkorder", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.UpdateWorkOrderInserviceByIdService"
}).action("completeWorkorder", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.UpdateWorkOrderCompleteByIdService"
}).action("queryUsersByOrgid",{
    proxy:"Y9",
    action:"com.yun9.sys.user.service.QueryUsersByOrgidService"
});


//客户
proxy.action("queryInstClients", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryInstClientsService"
}).action("queryInstClientById", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryInstClientByIdService"
}).action("addOrUpdateInstClients", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddOrUpdateInstClientsService"
}).action("queryInstRolesByUseridAndInstid", {
    proxy: "Y9",
    action: "com.yun9.sys.inst.serivce.QueryInstRolesByUseridAndInstidService"
});

module.exports = proxy;