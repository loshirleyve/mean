/**
 * Created by leon on 15/11/9.
 */

angular.module("wservice.dt.store.inst", ["ui.neptune"]).
    run(function (nptDatatableStore) {
        nptDatatableStore.putDatatable("inst", {
            header: {
                name:{
                    label: "机构名称"
                },
                hostname:{
                    "label": "企业网址"
                },
                tel:{
                    "label": "企业电话"
                }
            },
            action: {
                view: {
                    label: "查看",
                    type: "none"
                }
            }
        });

        nptDatatableStore.putDatatable("instDetail", {
            header: {
                name:{
                    label: "机构名称"
                },
                hostname:{
                    "label": "企业网址"
                },
                tel:{
                    "label": "企业电话"
                }
            },
            action: {
                view: {
                    label: "查看",
                    type: "none"
                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    target: "inst",
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
