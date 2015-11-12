/**
 * Created by rxy on 15/11/11.
 */

angular.module("wservice.dt.store.product", ["ui.neptune"]).
    run(function (nptDatatableStore) {
        nptDatatableStore.putDatatable("product", {
                header: {
                    instid: {
                        label: "服务商名称"
                    },
                    sn: {
                        label: "产品编号"
                    },
                    name: {
                        label: "产品名称"
                    },
                    pricedescr: {
                        label: "售价"
                    },
                    state: {
                        label: "产品状态"
                    },
                    type: {
                        label: "产品类型"
                    },
                    createdate: {
                        label: "创建日期"
                    }
                },
                action: {
                    view: {
                        label: "查看",
                        type: "none"
                    }
                }
            }
        );
        nptDatatableStore.putDatatable("group",{
            header: {
                name: {
                    label: "分组名称"
                },
                sort: {
                    label: "排序"
                }
            },
            action: {
                edit: {
                    label: "编辑",
                    type: "edit",
                    target:"group",
                    listens:[
                        function(params,$timeout,$q,productService)
                        {
                            var deferd = $q.defer();
                            productService.query.editGroup(params.data,function(data){
                                deferd.resolve(data);
                            },function(error){
                                deferd.reject(error);
                            });
                            return deferd.promise;
                        }
                    ]
                },
                delete: {
                    label: "删除",
                    type: "delete"
                }
            }
        });
    });
