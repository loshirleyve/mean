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
}).action("queryCities", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryCitiesService"
}).action("QueryProductsNoGroup", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductsNoGroupService"
}).action("QueryProductInfoById", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductInfoByIdService"
}).action("AddOrUpdateMdProductGroup", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddOrUpdateMdProductGroupService"
}).action("QueryMdProductGroupBylocation", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryMdProductGroupBylocationService"
}).action("RemoveProductMdGroup", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.RemoveProductMdGroupService"
}).action("AddOrUpdateProduct", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddOrUpdateProductService"
}).action("AddOrUpdateProductPhase", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddOrUpdateProductPhaseService"
}).action("AddOrUpdateProductProfile", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddOrUpdateProductProfileService"
}).action("AddOrUpdateProductGroup", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddOrUpdateProductGroupService"
}).action("AddOrUpdateProductclassify", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddOrUpdateProductclassifyService"
}).action("AddOrUpdateProductDescr", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddOrUpdateProductDescrService"
}).action("RemoveProductPhase", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.RemoveProductPhaseService"
}).action("RemoveProductRequirement", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.RemoveProductRequirementService"
}).action("RemoveProductProfile", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.RemoveProductProfileService"
}).action("RemoveProductGroup", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.RemoveProductGroupService"
}).action("RemoveProductClassify", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.RemoveProductClassifyService"
}).action("RemoveProductDescr", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.RemoveProductDescrService"
}).action("QueryProductPhaseByProductid",{
    proxy:"Y9",
    action:"com.yun9.ws.biz.service.QueryProductPhaseByProductidService"
});

//工单
proxy.action("queryWorkorderList", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryWorkOrdersService"
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
}).action("deliverWorkorder",{
    proxy:"Y9",
    action:"com.yun9.ws.biz.service.UpdateWorkorderByProcessidService"
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
}).action("instInit", {
    proxy:"Y9",
    action:"com.yun9.ws.biz.service.InstInitService"
});


//获取控制编码
proxy.action("queryMdCtrlcode", {
    proxy:"Y9",
    action:"com.yun9.sys.md.service.QueryMdCtrlcodeService"
});

//获取规模的控制编码
proxy.action("queryMdInstScale", {
    proxy:"Y9",
    action:"com.yun9.ws.biz.service.QueryMdInstScaleService"
});

//机构
proxy.action("queryInsts", {
    proxy:"Y9",
    action:"com.yun9.sys.inst.serivce.QueryInstsService"
});
proxy.action("queryInstDetail", {
    proxy:"Y9",
    action:"com.yun9.sys.inst.serivce.QueryInstByIdService"
});


module.exports = proxy;