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
proxy.action("queryWorkorderList", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryWorkOrdersService"
}).action("queryWorkorderDetail", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryWorkOrderByIdService"
});

//订单模块
proxy.action("queryOrderList", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryOrdersService"
}).action("queryOrderInfo", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryOrderInfoService"
}).action("QueryOrdersIsUnread", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryOrdersIsUnreadService"
}).action("UpdateOrderReadState", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.UpdateOrderReadStateService"
}).action("UpdateOrderPrice", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.UpdateOrderPriceService"
}).action("UpdateOrderByConfirm", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.UpdateOrderByConfirmService"
}).action("UpdateOrderAdviser", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.UpdateOrderAdviserService"
});


//产品模块
proxy.action("queryCities", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryCitiesService"
}).action("QueryProductsGroup", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductsGroupService"
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
})
.action("AddProductRequirement", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddProductRequirementService"
})
.action("AddOrUpdateProductProfile", {
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
}).action("QueryProductPhaseInfo", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductPhaseInfoByIdService"
}).action("QueryProductRequirementInfo", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductRequirementInfoByIdService"
}).action("QueryProductProfileInfo", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductProfileInfoByIdService"
}).action("QueryProductGroupInfo", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductGroupInfoByIdService"
}).action("QueryProductClassifyInfo", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductClassifyInfoByIdService"
}).action("QueryProductDescrInfo", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductDescrInfoByIdService"
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
}).action("QueryProductPhaseByProductid", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductPhaseByProductidService"
}).action("QueryRequirementsByInstid", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryRequirementsByInstidService"
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
}).action("queryUsersByOrgid", {
    proxy: "Y9",
    action: "com.yun9.sys.user.service.QueryUsersByOrgidService"
}).action("deliverWorkorder", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.UpdateWorkorderByProcessidService"
}).action("queryWorkordersUnread", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryWorkordersUnreadService"
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
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.InstInitService"
});


//获取控制编码
proxy.action("queryMdCtrlcode", {
    proxy: "Y9",
    action: "com.yun9.sys.md.service.QueryMdCtrlcodeService"
});

//获取规模的控制编码
proxy.action("queryMdInstScale", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryMdInstScaleService"
});

//机构
proxy.action("queryInsts", {
    proxy: "Y9",
    action: "com.yun9.sys.inst.serivce.QueryInstsService"
});
proxy.action("queryInstDetail", {
    proxy: "Y9",
    action: "com.yun9.sys.inst.serivce.QueryInstByIdService"
});
proxy.action("updateInst", {
    proxy: "Y9",
    action: "com.yun9.sys.inst.serivce.UpdateInstService"
});

//收款
proxy.action("QueryPayRegisters", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryPayRegistersByInstidAndCreatebyService"
}).action("QueryPayRegisterByid", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.pay.service.QueryPayRegisterByidService"
}).action("UpdateByCollect", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.pay.service.UpdateByCollectService"
}).action("QueryPayModeType", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.pay.service.QueryPayModeTypeService"
});

// 用户
/*用户登录*/
proxy.action("QueryIdentificationByUsernoAndPasswd", {
    proxy: "Y9",
    action: "com.yun9.sys.inst.serivce.QueryIdentificationByUsernoAndPasswd"
}).action("QueryUserInfoById", {
    proxy: "Y9",
    action: "com.yun9.sys.user.service.QueryUserInfoByIdService"
}).action("QueryUserByInst", {
    proxy: "Y9",
    action: "com.yun9.sys.user.service.QueryUsersByInstService"
});
/*获取导航数据*/
proxy.action("QueryInstRoleNaviService", {
    proxy: "Y9",
    action: "com.yun9.sys.inst.serivce.QueryInstRoleNaviService"
});

/*查询文件*/
proxy.action("QueryFile", {
    proxy: "Y9",
    action: "com.yun9.sys.inst.serivce.QueryFileService"
}).action("QueryFileById", {
    proxy: "Y9",
    action: "com.yun9.sys.inst.serivce.QueryFileByIdService"
}).action("AddOrUpdateFile", {
    proxy: "Y9",
    action: "com.yun9.sys.inst.serivce.AddOrUpdateFileService"
});

module.exports = proxy;