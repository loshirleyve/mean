/**
 * Created by Shirley on 15/11/27.
 */
angular.module("clientApp.ClientListGrid", [])
    .factory("ClientListGrid", function (nptGridStore) {
        return nptGridStore("ClientListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'sn', displayName: "客户编号", width: 85},
                    {field: 'name', displayName: "公司简称", width: 85},
                    {field: 'fullname', displayName: "公司全称", width: 100},
                    {field: 'type', displayName: "类型", width: 85, cellFilter: "ctrlCodeFilter:'clienttype':'name':'no'"},
                    {field: 'industry', displayName: "行业", width: 80, cellFilter: "ctrlCodeFilter:'clientindustry':'name':'no'"},
                    //{field: 'scaleid', displayName: "公司规模", width: 85},
                    {field: 'source', displayName: "来源", width: 80, cellFilter: "ctrlCodeFilter:'clientsource':'name':'no'"},
                    {field: 'region', displayName: "区域", width: 60},
                    {field: 'address', displayName: "客户地址", width: 85},
                    {field: 'contactman', displayName: "联系人名", width: 85},
                    {field: 'contactphone', displayName: "联系电话", width: 120},
                    {field: 'contactposition', displayName: "职位", width: 60, cellFilter: "ctrlCodeFilter:'contactposition':'name':'no'"},
                    {field: 'level', displayName: "客户等级", width: 85, cellFilter: "ctrlCodeFilter:'clientlevel':'name':'no'"}
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
            }
        });
    });

