/**
 * Created by shirley on 15/11/11.
 */

angular.module("wservice.dt.store.client", ["ui.neptune"]).
    run(function (nptDatatableStore) {
        nptDatatableStore.putDatatable("client", {
            header: {
                name: {
                    label: "名称"
                },
                industry: {
                    label: "行业"
                },
                type: {
                    label: "类型"
                },
                level: {
                    label: "级别"
                },
                source: {
                    label: "来源"
                },
                contactman: {
                    label: "联系人"
                },
                contactphone: {
                    label: "电话"
                },
                createdate: {
                    label: "创建日期"
                }
            },
            action: {
                view: {
                    label: "查看",
                    type: "none"
                },
                add: {
                    label: "添加",
                    type: "add",
                    target: "addClient",
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
                            console.info("开始执行后台更新服务.")
                            $timeout(function () {
                                if (params.index === 0) {
                                    deferd.reject("不能编辑第一行");
                                } else {
                                    deferd.resolve("执行成功!");
                                    params.data["demo"] = "测试添加一行数据";
                                    params.data["sn"] = "测试修改订单号"
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