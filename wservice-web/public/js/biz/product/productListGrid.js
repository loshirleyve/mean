/**
 * Created by leon on 15/11/26.
 */
angular.module("productApp.productListGrid", [])
    .factory("productListGrid", function (nptGridStore) {
        return nptGridStore("productListGrid", {
            gridOptions: {
                columnDefs: [
                    {
                        field: 'instid',
                        displayName: "服务商名称",
                        width: 250,
                        cellFilter: "cacheFilter:'inst':'instname':'instid'"
                    },
                    {field: 'sn', displayName: "产品编号", width: 120},
                    {field: 'name', displayName: "产品名称", width: 120},
                    {field: 'pricedescr', displayName: "售价", width: 100},
                    {
                        field: 'state',
                        displayName: "产品状态",
                        width: 100,
                        cellFilter: "ctrlCodeFilter:'productstate':'name':'no'"
                    },
                    {
                        field: 'type',
                        displayName: "产品类型",
                        width: 100,
                        cellFilter: "ctrlCodeFilter:'producttype':'name':'no'"
                    },
                    {field: 'createdate', displayName: "创建日期", width: 150, cellFilter: "timestampFilter"}
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

