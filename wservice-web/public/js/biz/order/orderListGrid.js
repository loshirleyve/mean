/**
 * Created by leon on 15/11/26.
 */
angular.module("orderApp.OrderListGrid", [])
    .factory("OrderListGrid", function (nptGridStore) {
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
                    type: "view"
                },
                add: {
                    label: "添加",
                    type: "add",
                    target: "OrderForm",
                    listens: [function ($q, $timeout) {
                        var deferd = $q.defer();
                        console.info("添加方法,在Store中配置");

                        $timeout(function () {
                            deferd.resolve();
                            console.info("添加方法,在配置中执行完成");
                        }, 1000);

                        return deferd.promise;
                    }, function (params, $timeout, $q) {
                        var deferd = $q.defer();
                        console.info("开始调用后台添加服务.");

                        $timeout(function () {
                            if (params.index === 0) {
                                deferd.reject("不能在第一行上添加.");
                            } else {
                                console.info("后台调用更成功.controller");
                                deferd.resolve("添加成功");
                            }
                        }, 500);

                        return deferd.promise;
                    }, function (params) {
                        console.info("添加的第二个方法!");
                    }]
                },
                del: {
                    label: "删除",
                    type: "del"
                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    target: "OrderForm",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            console.info("开始执行后台更新服务.");
                            $timeout(function () {
                                if (params.index === 0) {
                                    deferd.reject("不能编辑第一行");
                                } else {
                                    deferd.resolve("执行成功!");
                                    params.data.demo = "测试添加一行数据";
                                    params.data.sn = "测试修改订单号";
                                }
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                }
            }
        });
    });

