/**
 * Created by rxy on 15/11/17.
 */



angular.module("wservice.dt.store.receivable", ["ui.neptune"]).
    run(function (nptDatatableStore) {
        nptDatatableStore.putDatatable("receivable", {
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
    });
