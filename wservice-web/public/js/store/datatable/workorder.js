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
                }
            }
        });

        nptDatatableStore.putDatatable("orderAttachment", {
            header: {
                attachname:{
                    label: "资料名称"
                },
                transfertype:{
                    "label": "资料交接类型"
                },
                inputtype:{
                    "label": "资料类型"
                }
            },
            action: {
                view: {
                    label: "查看",
                    type: "none"
                }
            }
        });

        nptDatatableStore.putDatatable("workorderComment", {
            header: {
                commenttext:{
                    label: "评价心得"
                },
                createdate:{
                    "label": "评论时间"
                },
                senderid:{
                    "label": "评论者"
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
