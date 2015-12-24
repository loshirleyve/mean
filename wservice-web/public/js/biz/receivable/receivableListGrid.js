/**
 * Created by rxy on 15/11/17.
 */
angular.module("receivableApp.receivableListGrid", [])
    .factory("receivableListGrid", function (nptGridStore) {
        return nptGridStore("receivableListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'businessKey', displayName: "业务内容", width: 300},
                    {field: 'amount', displayName: "应收金额", width: 100,cellFilter: "number"},
                    {field: 'payamount', displayName: "已收金额", width: 100,cellFilter: "number"},
                    {field: 'complete',displayName: "收款状态", width: 100,cellFilter:"yesOrNo"},
                    {field: 'paymodeName', displayName: "支付方式", width: 100},
                    {field: 'createdate', displayName: "创建日期", width: 160, cellFilter: "timestampFilter"},
                    {field: 'expirydate', displayName: "确定日期", width: 160,cellFilter: "timestampFilter"}
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
            },mobile: {
                fields: {
                    title: "businessKey",
                    tip: "'收款状态: '+(complete|yesOrNo)",
                    content: "'应收金额: '+amount+'<br/>'+'已收金额: '+payamount+'<br/>'+'支付方式: '+paymodeName+'<br/>'+'确定日期: '+(expirydate|timestampFilter)",
                    createDate: "createdate|timestampFilter"
                }
            }
        });
    });

