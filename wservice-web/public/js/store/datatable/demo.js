/**
 * Created by leon on 15/11/9.
 */

angular.module("wservice.dt.store.demo", ["ui.neptune"])
    .run(function (nptDatatableStore) {
        /**
         * header里面的字段可以通过配置filter字段，对字段进行过滤；
         * 如果需要配置多个过滤器可以通过竖线分隔：|
         * 过滤器的参数通过冒号:链接，多个参数就多个冒号
         * 注意，如果参数是字符串，需要用引号括起来
         */
        nptDatatableStore.putDatatable("demo", {
            header: {
                id: {
                    label: "订单编号"
                },
                state: {
                    label: "状态",
                    filter:"ctrlCodeFilter:'orderstatetype':'name':'no'"
                },
                name: {
                    label: "名称"
                },
                instid: {
                    label: "机构ID"
                },
                orderamount: {
                    label: "订单金额"
                },
                createdate: {
                    label: "创建日期",
                    filter:"timestampFilter|json"
                },
                introduce: {
                    label: "简介"
                }
            },
            action: {
                view: {
                    label: "查看",
                    type: "none"
                },
                add: {
                    label: "添加",
                    type: "add",
                    target: "demo",
                    listens: []
                },
                del: {
                    label: "删除",
                    type: "del"
                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    target: "demo",
                    listens: [
                    ]
                }
            }
        });
    });
