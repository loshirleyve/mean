/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("orderApp.orderForm", ["ui.neptune"])
    .factory("OrderForm", function (nptFormlyStore, QueryCtrlCode) {
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
                        label: '订单编号:'
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
                        options: []
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
                        options: []
                    }
                },
                {
                    key: 'instid',
                    type: 'input',
                    templateOptions: {
                        label: '服务机构:'
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