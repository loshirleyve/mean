/**
 * Created by leon on 15/11/9.
 */

angular.module("clientApp.clientListDatatable", ["ui.neptune"])
    .run(function (nptDatatableStore) {
        nptDatatableStore.putDatatable("client", {
            header: {
                sn: {
                    label: "客户编号"
                },
                name: {
                    label: "公司简称"
                },
                type: {
                    label: "类型"
                },
                industry: {
                    label: "行业"
                },
                scaleid: {
                    label: "公司规模"
                },
                source: {
                    label: "来源"
                },
                region: {
                    label: "区域"
                },
                address: {
                    label: "客户地址"
                },
                contactman: {
                    label: "联系人名"
                },
                contactphone: {
                    label: "联系电话"
                },
                contactposition: {
                    label: "职位"
                },
                level: {
                    label: "客户等级"
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
                    target: "client",
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
