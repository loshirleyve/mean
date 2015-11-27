/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("workorderApp.orderForm", ["ui.neptune"])
    .factory("workOrderForm", function (nptFormlyStore, QueryCtrlCode) {
        return nptFormlyStore("workOrderForm", {
            options: {
                formState: {
                    disabled: true
                }

            },
            fields: [
                {
                    key: 'sn',
                    type: 'input',
                    templateOptions: {
                        label: '工单编号:'
                    }
                },
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        label: '工单名称:'
                    }
                },
                {
                    key: 'descr ',
                    type: 'input',
                    templateOptions: {
                        label: '工单描述:'
                    }
                },
                {
                    key: 'state',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        label: '工单状态:',
                        valueProp: 'no',
                        labelProp: 'name',
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "orderstatetype"},
                        options: [],
                        allowClear:false
                    }
                },
                {
                    key: 'processid',
                    type: 'input',
                    templateOptions: {
                        label: '处理人:'
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