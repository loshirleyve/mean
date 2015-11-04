/**
 * Created by shirley on 15/11/3.
 */

angular.module("clientConfig", ["bizModule"])
    .config(function (bizModuleConfigProvider) {
        bizModuleConfigProvider.reg("client", {
            "header": [
                {
                    "name": "name",
                    "label": "名称"
                },
                {
                    "name": "industry",
                    "label": "行业"
                },
                {
                    "name": "type",
                    "label": "类型"
                },
                {
                    "name": "level",
                    "label": "级别"
                },
                {
                    "name": "source",
                    "label": "来源"
                },
                {
                    "name": "contactman",
                    "label": "联系人"
                },
                {
                    "name": "contactphone",
                    "label": "电话"
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
                    "link": "#detail"
                }
            ]
        })
    });