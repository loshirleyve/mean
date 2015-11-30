/**
 * Created by leon on 15/11/26.
 */
angular.module("receivableApp.receivableCollectionListGrid", [])
    .factory("receivableCollectionListGrid", function (nptGridStore) {
        return nptGridStore("receivableCollectionListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'amount', displayName: "付款金额", width: 300,cellFilter: "number"},
                    {field: 'ptcode', displayName: "付款方式", width: 100},
                    {field: 'collectuserid', displayName: "收款人", width: 100,cellFilter: "cacheFilter:'user':'name':'id'"},
                    {field: 'payregisterid',displayName: "收款出纳", width: 100,cellFilter: "cacheFilter:'user':'name':'id'"},
                    {field: 'state', displayName: "收款状态", width: 100,cellFilter: "ctrlCodeFilter:'payregistercollectstate':'name':'no'"},
                    {field: 'createdate', displayName: "付款日期", width: 160, cellFilter: "timestampFilter"},
                    {field: 'ptdescr', displayName: "说明", width: 160}
                ]
            },
            action: {
                view: {
                    label: "查看",
                    type: "view"
                }
            }
        });
    });

