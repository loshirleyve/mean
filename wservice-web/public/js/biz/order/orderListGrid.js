/**
 * Created by leon on 15/11/26.
 */
angular.module("orderApp.OrderListGrid", [])
    .factory("OrderListGrid", function (nptGridStore, OrderForm) {
        return nptGridStore("OrderListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'ordersn', displayName: "订单编号", width: 120},
                    {
                        field: 'buyerinstid',
                        displayName: "客户",
                        width: 200,
                        cellFilter: "cacheFilter:'inst':'instname':'instid'"
                    },
                    {field: 'purchase', displayName: "购买人", width: 60, cellFilter: "cacheFilter:'user':'name':'id'"},
                    {field: 'name', displayName: "订单内容", width: 120},
                    {field: 'introduce', displayName: "简介", width: 200},
                    {
                        field: 'state',
                        displayName: "订单状态",
                        width: 100,
                        cellFilter: "ctrlCodeFilter:'orderstatetype':'name':'no'"
                    },
                    {
                        field: 'paystate',
                        displayName: "支付状态",
                        width: 100,
                        cellFilter: "ctrlCodeFilter:'orderpaystate':'name':'no'"
                    },
                    {field: 'begindate', displayName: "开始日期", width: 100, cellFilter: "timestampFilter"},
                    {field: 'enddate', displayName: "结束日期", width: 100, cellFilter: "timestampFilter"},
                    {field: 'adviser', displayName: "专属顾问", width: 100, cellFilter: "cacheFilter:'user':'name':'id'"},
                    {field: 'factamount', displayName: "订单原价", width: 100, cellFilter: "number"},
                    {field: 'orderamount', displayName: "订单金额", width: 100, cellFilter: "number"},
                    {field: 'salesmanid', displayName: "业务员", width: 100, cellFilter: "cacheFilter:'user':'name':'id'"},
                    {
                        field: 'proxyinstid',
                        displayName: "代理机构",
                        width: 100,
                        cellFilter: "cacheFilter:'inst':'instname':'instid'"
                    },
                    {field: 'proxyman', displayName: "代理人", width: 100, cellFilter: "cacheFilter:'user':'name':'id'"},
                    {field: 'createby', displayName: "创建人", width: 100, cellFilter: "cacheFilter:'user':'name':'id'"},
                    {field: 'createdate', displayName: "创建日期", width: 100, cellFilter: "timestampFilter"},
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

