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
        }).reg("productPhases", {
            header: [
                {
                    name: "name",
                    label: "阶段名称"
                },
                {
                    name: "cyclevalue",
                    label: "阶段周期"
                },
                {
                    name: "duty",
                    label: "阶段职责"
                },
                {
                    name: "times",
                    label: "办理天数"
                },
                {
                    name: "processdays",
                    label: "服务次数"
                }
            ],
            "action": [
                {
                    "name": "edit",
                    "label": "编辑"
                },
                {
                    "name": "delete",
                    "label": "删除"
                }
            ]
        }).reg("productRequirements", {
            header: [
                {
                    name: "name",
                    label: "资料名称"
                },
                {
                    name: "cyclevalue",
                    label: "交接类型"
                },
                {
                    name: "duty",
                    label: "资料类型"
                },
                {
                    name: "times",
                    label: "要求描述"
                }
            ],
            "action": [
                {
                    "name": "edit",
                    "label": "编辑"
                },
                {
                    "name": "delete",
                    "label": "删除"
                }
            ]
        }).reg("productProfiles", {
            header: [
                {
                    name: "synopsis",
                    label: "内容描述"
                },
                {
                    name: "sort",
                    label: "排序"
                }
            ],
            "action": [
                {
                    "name": "edit",
                    "label": "编辑"
                },
                {
                    "name": "delete",
                    "label": "删除"
                }
            ]
        }).reg("productGroups", {
            header: [
                {
                    name: "backgorundimgid",
                    label: "分组图标"
                },
                {
                    name: "groupname",
                    label: "分组名称"
                },
                {
                    name: "province",
                    label: "省"
                },
                {
                    name: "city",
                    label: "市"
                },
                {
                    name: "district",
                    label: "区"
                },
                {
                    name: "top",
                    label: "是否置顶"
                },
                {
                    name: "sort",
                    label: "排序"
                }
            ],
            "action": [
                {
                    "name": "edit",
                    "label": "编辑"
                },
                {
                    "name": "delete",
                    "label": "删除"
                }
            ]
        }).reg("productClassifies", {
            header: [
                {
                    name: "classifyname",
                    label: "分类名称"
                },
                {
                    name: "classifyno",
                    label: "分类编号"
                },
                {
                    name: "price",
                    label: "价格"
                },
                {
                    name: "phasename",
                    label: "所属服务阶段"
                },
                {
                    name: "sort",
                    label: "排序"
                }
            ],
            "action": [
                {
                    "name": "edit",
                    "label": "编辑"
                },
                {
                    "name": "delete",
                    "label": "删除"
                }
            ]
        }).reg("productDescrs", {
            header: [
                {
                    name: "descr",
                    label: "标题"
                },
                {
                    name: "descrvalue",
                    label: "内容"
                },
                {
                    name: "type",
                    label: "类型"
                }
            ],
            "action": [
                {
                    "name": "edit",
                    "label": "编辑"
                },
                {
                    "name": "delete",
                    "label": "删除"
                }
            ]
        }).reg("allproductClassifies", {
            header: [
                {
                    name: "classifyname",
                    label: "分类名称"
                },
                {
                    name: "sort",
                    label: "排序"
                }
            ],
            "action": [
                {
                    "name": "edit",
                    "label": "编辑"
                },
                {
                    "name": "delete",
                    "label": "删除"
                }
            ]
        });

    });