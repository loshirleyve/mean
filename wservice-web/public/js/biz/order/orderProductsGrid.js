/**
 * Created by leon on 15/11/26.
 */

angular.module("orderApp.OrderProductGrid", [])
    .factory("OrderProductGrid", function (nptGridStore) {
        return nptGridStore("OrderProductGrid", {
            gridOptions: {
                paginationPageSizes: [],
                paginationPageSize: 0,
                columnDefs: [
                    {field: 'productname', displayName: "产品名称", width: 150},
                    {field: 'productIntroduce', displayName: "产品简介", width: 500},
                    {field: 'instid', displayName: "服务机构", width: 300, cellFilter: "cacheFilter:'inst':'instname':'instid'"},
                    {field: 'goodsamount', displayName: "价格", width: 50},
                    {field: 'productclassifyname', displayName: "已选分类", width: 100}
                ]
            }
        })
    });