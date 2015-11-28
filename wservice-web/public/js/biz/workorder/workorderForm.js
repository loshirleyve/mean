/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("workorderApp.workorderForm", ["ui.neptune"])
    .factory("WorkorderForm", function (nptFormlyStore, QueryCtrlCode) {
        return nptFormlyStore("WorkorderForm", {
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
                    key: 'assignedid',
                    type: 'input',
                    templateOptions: {
                        label: '处理人:'
                    }
                },
                {
                    key: 'assigneddate',
                    type: 'input',
                    templateOptions: {
                        label: '分配日期:'
                    }
                },
                {
                    key: 'completedate',
                    type: 'input',
                    templateOptions: {
                        label: '完成日期:'
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