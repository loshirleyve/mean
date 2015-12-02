/**
 * Created by Shirley on 15/11/27.
 */
angular.module("clientApp.ClientListGrid", [])
    .factory("ClientListGrid", function (nptGridStore) {
        return nptGridStore("ClientListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'sn', displayName: "客户编号", width: 100},
                    {field: 'name', displayName: "公司简称", width: 100},
                    {field: 'fullname', displayName: "公司全称", width: 200},
                    {field: 'type', displayName: "类型", width: 120, cellFilter: "ctrlCodeFilter:'clienttype':'name':'no'"},
                    {field: 'industry', displayName: "行业", width: 120, cellFilter: "ctrlCodeFilter:'clientindustry':'name':'no'"},
                    {field: 'contactman', displayName: "联系人名", width: 100},
                    {field: 'contactphone', displayName: "联系电话", width: 150},
                    {field: 'level', displayName: "客户等级", width: 100, cellFilter: "ctrlCodeFilter:'clientlevel':'name':'no'"},
                    {field: 'remark', displayName: "备注", width: 100}
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

