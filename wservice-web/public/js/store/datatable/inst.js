/**
 * Created by leon on 15/11/9.
 */

angular.module("wservice.dt.store.datatable.inst", ["ui.neptune"]).
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
                        function (params, $timeout, $q,nptResource) {
                            var deferd = $q.defer();
                            var temp_params = {};

                            console.info("开始执行后台更新服务.");
                            console.info(params);

                            temp_params.instid = params.data.id;
                            temp_params.updateby = "10000002334767";
                            temp_params.name = params.data.name;

                            console.info(params);
                            nptResource
                                .post("updateInst", params, function (data) {
                                    success(data);
                                }, function (data) {
                                    //TODO 弹出提示检索错误通知窗口
                                });
                            return deferd.promise;
                        }
                    ]
                }
            }
        });
    }).factory("UpdateInstRepo",function(nptRepository) {
        return nptRepository("updateInst");
    });
