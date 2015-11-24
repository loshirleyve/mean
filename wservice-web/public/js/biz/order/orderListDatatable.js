/**
 * Created by leon on 15/11/9.
 */

angular.module("orderApp.orderListDatatable", ["ui.neptune"])
    .run(function (nptDatatableStore) {
        nptDatatableStore.putDatatable("order", {
            header: {
                ordersn: {
                    label: "订单编号"
                },
                buyerinstid: {
                    label: "客户",
                    filter: "cacheFilter:'inst':'instname':'instid'"
                },
                purchase: {
                    label: "购买人",
                    filter: "cacheFilter:'user':'name':'id'"
                },
                name: {
                    label: "订单内容"
                },
                introduce: {
                    label: "简介"
                },
                state: {
                    label: "订单状态",
                    filter: "ctrlCodeFilter:'orderstatetype':'name':'no'"
                },
                paystate: {
                    label: "支付状态",
                    filter: "ctrlCodeFilter:'orderpaystate':'name':'no'"
                },
                begindate: {
                    label: "开始日期",
                    filter: "timestampFilter"
                },
                enddate: {
                    label: "结束日期",
                    filter: "timestampFilter"
                },
                adviser: {
                    label: "专属顾问",
                    filter: "cacheFilter:'user':'name':'id'"
                },
                factamount: {
                    label: "订单原价"
                },
                orderamount: {
                    label: "订单金额"
                },
                salesmanid: {
                    label: "销售人",
                    filter: "cacheFilter:'user':'name':'id'"
                },
                proxyinstid: {
                    label: "代理机构",
                    filter: "cacheFilter:'inst':'instname':'instid'"
                },
                proxyman: {
                    label: "代理人",
                    filter: "cacheFilter:'user':'name':'id'"
                },
                createby: {
                    label: "创建人",
                    filter: "cacheFilter:'user':'name':'id'"
                },
                createdate: {
                    label: "创建日期",
                    filter: "timestampFilter"
                },
                remark: {
                    label: "备注"
                }
            },
            action: {
                view: {
                    label: "查看",
                    type: "view"
                },
                add: {
                    label: "添加",
                    type: "add",
                    target: "demo",
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
                    target: "order",
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
