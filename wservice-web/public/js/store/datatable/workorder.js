/**
 * Created by leon on 15/11/9.
 */

angular.module("wservice.dt.store.workorder", ["ui.neptune"]).
    run(function (nptDatatableStore) {
        nptDatatableStore.putDatatable("workorder", {
            header: {
                sn:{
                    label: "工单号"
                },
                name:{
                    "label": "工单名称"
                },
                assignedid:{
                    "label": "分配人"
                },
                assigneddate:{
                    "label": "分配日期"
                },
                processid:{
                    "label": "处理人"
                },
                processdate:{
                    "label": "计划开始日期"
                },
                doactiondate:{
                    "label": "实际开始日期"
                },
                expirydate:{
                    "label": "计划完成日期"
                },
                completedate:{
                    "label": "实际完成日期"
                },
                expriyday:{
                    "label": "距离完成期限(天)"
                },
                state:{
                    "label": "工单状态"
                },
                createdate:{
                    "label": "创建日期"
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
