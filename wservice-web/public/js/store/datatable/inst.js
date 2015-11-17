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
    });
