/**
 * Created by rxy on 15/11/3.
 */
angular.module("productConfig", ["bizModule"])
    .config(function (bizModuleConfigProvider) {
        bizModuleConfigProvider.reg("product", {
            "header": [
                {
                    "name": "instid",
                    "label": "服务商名称"
                },
                {
                    "name": "sn",
                    "label": "产品编号"
                },
                {
                    "name": "name",
                    "label": "产品名称"
                },
                {
                    "name": "pricedescr",
                    "label": "售价"
                },
                {
                    "name": "state",
                    "label": "产品状态"
                },
                {
                    "name": "type",
                    "label": "产品类型"
                },
                {
                    "name": "createdate",
                    "label": "创建日期"
                }
            ],
            "action": [
                {
                    "name": "view",
                    "label": "查看"
                }
            ]
        }).reg("productInfo", {
            header: [
                {
                    name: "name",
                    label: "产品名称"
                },
                {
                    name: "saleprice",
                    label: "价格"
                },
                {
                    name: "state",
                    label: "产品状态"
                },
                {
                    name: "pricedescr",
                    label: "促销价格"
                },
                {
                    name: "type",
                    label: "产品类型"
                },
                {
                    name: "daynum",
                    label: "办理天数"
                }
            ]
        });
    });