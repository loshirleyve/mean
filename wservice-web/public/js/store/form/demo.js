/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("wservice.form.store.demo", ["ui.neptune"])
    .run(function (nptFormStore) {
        nptFormStore.put("demo", {
            options: {},
            fields: [
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '名称:',
                        placeholder: "请输入订单名称"
                    }
                },
                {
                    key: 'sales',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '销售顾问:',
                        placeholder: "请输入销售顾问"
                    }
                },
                {
                    key: 'orderamount',
                    type: 'numberInput',
                    templateOptions: {
                        required: true,
                        label: '请输入订单金额:'
                    }
                },
                {
                    key: 'createdate',
                    type: 'dateInput',
                    templateOptions: {
                        required: true,
                        label: '创建日期:',
                        placeholder: "请输入创建日期"
                    }
                },
                {
                    key: 'remark',
                    type: 'input',
                    templateOptions: {
                        label: '备注:'
                    }
                }
            ]
        });
    });