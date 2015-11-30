/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("orderApp.orderForm", ["ui.neptune"])
    .factory("OrderForm", function (nptFormlyStore, QueryCtrlCode,nptFormStore) {
        nptFormStore.put("order", {
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
                    type: 'dateInput',
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
        return nptFormlyStore("OrderForm", {
            options: {
                formState: {
                    disabled: true
                }

            },
            fields: [
                {
                    key: 'ordersn',
                    type: 'input',
                    templateOptions: {
                        label: '订单编号:',
                        disabled:true
                    }
                },
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        label: '订单内容:'
                    }
                },
                {
                    key: 'introduce',
                    type: 'input',
                    templateOptions: {
                        label: '订单简介:'
                    }
                },
                {
                    key: 'state',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        label: '订单状态:',
                        valueProp: 'no',
                        labelProp: 'name',
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "orderstatetype"},
                        options: [],
                        allowClear:false
                    }
                },
                {
                    key: 'paystate',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        label: '支付状态:',
                        valueProp: 'no',
                        labelProp: 'name',
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "orderpaystate"},
                        options: [],
                        allowClear:false
                    }
                },
                {
                    key: 'instid',
                    type: 'ui-select',
                    templateOptions: {
                        label: '服务机构:',
                        optionsAttr: 'bs-options',
                        valueProp: 'id',
                        labelProp: 'instname',
                        search: ['instname'],
                        options: [],
                        allowClear:false
                    }
                },
                {
                    key: 'begindate',
                    type: 'input',
                    templateOptions: {
                        label: '开始日期:'
                    }
                },
                {
                    key: 'enddate',
                    type: 'input',
                    templateOptions: {
                        label: '结束日期:'
                    }
                },
                {
                    key: 'salesmanid',
                    type: 'input',
                    templateOptions: {
                        label: '业务员:'
                    }
                },
                {
                    key: 'adviser',
                    type: 'input',
                    templateOptions: {
                        label: '专属顾问:'
                    }
                },
                {
                    key: 'createby',
                    type: 'input',
                    templateOptions: {
                        label: '创建人:'
                    }
                },
                {
                    key: 'createdate',
                    type: 'dateInput',
                    templateOptions: {
                        label: '创建日期:'
                    }
                }
            ],
            buttons: {
                ok: false,
                reset: false
            },
            onSubmitListens: [
                function (model, $timeout, $q) {
                    var deferd = $q.defer();

                    $timeout(function () {
                        deferd.resolve();
                    }, 1000);

                    return deferd.promise;
                }
            ]
        });
    });