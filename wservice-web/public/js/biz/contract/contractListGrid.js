/**
 * Created by Shirley on 15/11/27.
 */
angular.module("contractApp.ContractListGrid", [])
    .factory("ContractListGrid", function (nptGridStore) {
        return nptGridStore("ContractListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'instid', displayName: "机构", width: 100,cellFilter: "cacheFilter:'inst':'instname':'instid'"},
                    {field: 'projectName', displayName: "项目", width: 100},
                    {field: 'shoppename', displayName: "专柜名称", width: 200},
                    {field: 'trademark', displayName: "经营品牌", width: 120},
                    {field: 'state', displayName: "审核状态", width: 100,cellFilter: "ctrlCodeFilter:'contractstate':'name':'no'"},
                    {field: 'isbase', displayName: "是否保底", width: 100},
                    {field: 'rent', displayName: "租金", width: 100},
                    {field: 'baseamount', displayName: "保底金额", width: 120},
                    {field: 'baserate', displayName: "基本扣率", width: 100},
                    {field: 'extralbaserate', displayName: "超额扣率", width: 100},
                    {field: 'slottingfee', displayName: "进场费", width: 100},
                    {field: 'deposit', displayName: "保证金", width: 100},
                    {field: 'other', displayName: "其他费用", width: 100},
                    {field: 'clause', displayName: "补充条款", width: 100},
                    {field: 'createdate', displayName: "创建日期", width: 150, cellFilter: "timestampFilter"}
                ]
            },
            action: {
                view: {
                    label: "查看",
                    type: "view",
                    listens: [
                        function ($location, params) {
                            if (params.item && params.item.length > 0) {
                                var id = params.item[0].id;
                                $location.path("/detail/" + id);
                            }
                        }
                    ]
                }
            },
            mobile: {
                fields: {
                    title: "name",
                    content:"'<div class=\"row\"><div class=\"col-xs-4\"><span class=\"glyphicon glyphicon-user\"></span>' + '&nbsp;' + contactman + '</div><div class=\"col-xs-6\"><span class=\"glyphicon glyphicon-phone\"></span>' + '&nbsp;' + contactphone + '</div></div>'",
                    createDate: "createdate|timestampFilter"
                }
            }
        });
    });

