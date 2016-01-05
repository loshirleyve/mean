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
}).action("UpdateProductState", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.UpdateProductStateService"
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
}).action("AddProductRequirement", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddProductRequirementService"
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
}).action("QueryProductPhaseInfo", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductPhaseInfoByIdService"
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
}).action("QueryProductPhaseByProductid", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductPhaseByProductidService"
}).action("QueryProductProfileByProductid", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductProfileByProductidService"
}).action("QueryProductGroupByProductid", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductGroupByProductidService"
}).action("QueryProductClassifyByProductid", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductClassifyByProductidService"
}).action("QueryProductDescrByProductid", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryProductDescrByProductidService"
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
}).action("QueryRequirementsByInstid", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryRequirementsByInstidService"
});

//工单
proxy.action("queryUsersByOrgid", {
    proxy: "Y9",
    action: "com.yun9.sys.user.service.QueryUsersByOrgidService"
}).action("queryOrgTree", {
    proxy: "Y9",
    action: "com.yun9.sys.inst.serivce.QueryOrgTreeService"
}).action("updateWorkOrderInserviceById", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.UpdateWorkOrderInserviceByIdService"
}).action("updateWorkOrderCompleteById", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.UpdateWorkOrderCompleteByIdService"
}).action("queryUsersByOrgid", {
    proxy: "Y9",
    action: "com.yun9.sys.user.service.QueryUsersByOrgidService"
}).action("updateWorkorderByProcessid", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.UpdateWorkorderByProcessidService"
}).action("queryWorkordersUnread", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryWorkordersUnreadService"
}).action("UpdateWorkOrderProcess", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.UpdateWorkOrderProcessService"
}).action("updateWorkordersToRead", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.UpdateWorkOrderReadStateService"
}).action("UpdateWorkOrderByBatch", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.UpdateWorkOrderByBatchService"
}).action("QueryWorkorderStateNum", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryWorkorderStateNumService"
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
}).action("queryInstClientInfoById", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryInstClientInfoByIdService"
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
proxy.action("UpdateUserByCurrinstid", {
    proxy: "Y9",
    action: "com.yun9.sys.user.service.UpdateUserByCurrinstidService"
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
}).action("UpdatePasswd", {
    proxy: "Y9",
    action: "com.yun9.sys.user.service.UpdatePasswdService"
}).action("UpdateUserByHeaderfileid", {
    proxy: "Y9",
    action: "com.yun9.sys.user.service.UpdateUserByHeaderfileidService"
}).action("RegisteUser", {
    proxy: "Y9",
    action: "com.yun9.sys.user.service.RegisteUserService"
}).action("AddUserByEmail", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddUserByEmailService"
}).action("QueryCurrInstByUser", {
    proxy:"Y9",
    action:"com.yun9.sys.inst.serivce.QueryCurrInstByUserService"
});

/*获取导航数据*/
proxy.action("QueryInstRoleNaviService", {
    proxy: "Y9",
    action: "com.yun9.sys.inst.serivce.QueryInstRoleNaviService"
}).action("QueryInstRoleNaviByUseridAndInstidAndDevice", {
    proxy: "Y9",
    action: "com.yun9.sys.inst.serivce.QueryInstRoleNaviByUseridAndInstidAndDeviceService"
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

/*Kit Action*/
proxy.action("KitActionQuery", {
    proxy: "Y9",
    action: "com.yun9.kit.action.service.KitActionQueryService"
}).action("KitActionFinish", {
    proxy: "Y9",
    action: "com.yun9.kit.action.service.KitActionFinishService"
});

/**动态*/
proxy.action("QueryMsgsGroup", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryMsgsGroupService"
}).action("QueryMsgByScene", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryMsgBySceneService"
}).action("QueryMsgCardInfoById", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryMsgCardInfoByIdService"
}).action("AddMsgCardComment", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddMsgCardCommentService"
}).action("AddMsgCardShare", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddMsgCardShareService"
}).action("AddPraiseLikeByMsgCardId", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddPraiseLikeByMsgCardIdService"
}).action("AddMsgCard", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.AddMsgCardService"
}).action("QueryTopics", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryTopicsService"
}).action("QueryMsgsUnReadByUserid", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryMsgsUnReadByUseridService"
}).action("QueryMsgCardBySource", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.QueryMsgCardBySourceService"
}).action("UpdateMsgCardState", {
    proxy: "Y9",
    action: "com.yun9.ws.biz.service.UpdateMsgCardStateByIdsService"
});

/*抓取所有服务*/
proxy.action("QueryActionList", {
    proxy:"Y9",
    action:"com.yun9.common.sr.service.QueryActionListService"
}).action("QueryAirline", {
    proxy:"Y9",
    action:"com.yun9.ws.biz.service.QueryAirlineBySourceIdService"
});

//微信
proxy.action("AddOrUpdateUserWx", {
    proxy:"Y9",
    action:"com.yun9.sys.user.service.AddOrUpdateUserWxService"
}).action("QueryUserByWxInfo", {
    proxy:"Y9",
    action:"com.yun9.sys.user.service.QueryUserByWxInfoService"
});


//合同
proxy.action("queryContractsByInstid", {
    proxy:"Y9",
    action:"com.yun9.ws.biz.service.QueryContractsByInstidService"
}).action("addOrUpdateContract", {
    proxy:"Y9",
    action:"com.yun9.ws.biz.service.AddOrUpdateContractService"
}).action("queryContractById", {
    proxy:"Y9",
    action:"com.yun9.ws.biz.service.QueryContractByIdService"
}).action("updateContractState", {
    proxy:"Y9",
    action:"com.yun9.ws.biz.service.UpdateContractStateService"
});

module.exports = proxy;