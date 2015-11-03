/**
 * Created by leon on 15/11/2.
 */

angular.module("workorderConfig", ["bizModule"])
    .config(function (bizModuleConfigProvider) {
        bizModuleConfigProvider.reg("workorder", {
            "header": [
                {
                    "name": "sn",
                    "label": "工单号"
                },
                {
                    "name": "name",
                    "label": "工单名称"
                },
                {
                    "name": "assignedid",
                    "label": "分配人"
                },
                {
                    "name": "assigneddate",
                    "label": "分配日期"
                },
                {
                    "name": "processid",
                    "label": "处理人"
                },
                {
                    "name": "processdate",
                    "label": "计划开始日期"
                },
                {
                    "name": "doactiondate",
                    "label": "实际开始日期"
                },
                {
                    "name": "expirydate",
                    "label": "计划完成日期"
                },
                {
                    "name": "completedate",
                    "label": "实际完成日期"
                },
                {
                    "name": "expriyday",
                    "label": "距离完成期限(天)"
                },
                {
                    "name": "state",
                    "label": "工单状态"
                },
                {
                    "name": "createdate",
                    "label": "创建日期"
                }
            ],
            "action": [
                {
                    "name": "view",
                    "label": "查看",
                    "link": "#/detail"
                }
            ]
        });
    });