/**
 * Created by shirley on 15/11/11.
 */

'use strict';
angular.module("wservice.form.store.client", ["ui.neptune"])
    .run(function (nptFormStore) {
        nptFormStore.put("client", {
            options: {},
            fields: [
                {
                    key: 'sn',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '订单编号:',
                        placeholder: "请输入订单编号"
                    }
                },
                {
                    key: 'state',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '订单状态:',
                        placeholder: "请输入订单编号"
                    }
                },
                {
                    key: 'clientid',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '客户编号:',
                        placeholder: "请输入客户编号"
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
                    key: 'amount',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '订单金额:'
                    }
                },
                {
                    key: 'createdate',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '创建日期:'
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
        }).put("demo", {
            fields: [
                {
                    key: 'lastName',
                    type: 'input',
                    templateOptions: {
                        label: 'Last Name'
                    }
                }
            ]
        });
    });