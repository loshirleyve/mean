/**
 * Created by leon on 15/11/26.
 */
angular.module("receivableApp.receivableListGrid", [])
    .factory("receivableListGrid", function (nptGridStore) {
        return nptGridStore("receivableListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'id', displayName: "id", width: 100},
                    {field: 'businessKey', displayName: "业务内容", width: 300},
                    {field: 'amount', displayName: "应收金额", width: 100,cellFilter: "number"},
                    {field: 'payamount', displayName: "已收金额", width: 100,cellFilter: "number"},
                    {field: 'complete',displayName: "收款状态", width: 100},
                    {field: 'paymodeName', displayName: "支付方式", width: 100},
                    {field: 'createdate', displayName: "创建日期", width: 160, cellFilter: "timestampFilter"},
                    {field: 'expirydate', displayName: "确定日期", width: 160,cellFilter: "timestampFilter"}
                ]
            },
            action: {
                view: {
                    label: "查看",
                    type: "view"
                }
            }
        })
    });

