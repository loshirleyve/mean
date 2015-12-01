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
                        label: '订单编号:',
                        disabled: true
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
                        allowClear: false
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
                        allowClear: false
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
                        allowClear: false
                    }
                },
                {
                    key: 'begindate',
                    "type": "dateInput",
                    "templateOptions": {
                        label: "开始日期",
                        "formateType": "short",
                    }
                },
                {
                    key: 'enddate',
                    type: 'dateInput',
                    templateOptions: {
                        label: '结束日期:',
                        "formateType": "short",
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
    })
    .factory("OrderConfirmForm", function (nptFormlyStore, OrgListBySelectTree, UserListBySelectTree, QueryUserInfoById) {
        return nptFormlyStore("OrderConfirmForm", {
            fields: [
                {
                    key: 'begindate',
                    type: 'dateInput',
                    templateOptions: {
                        "formateType": "short",
                        label: '服务开始日期:',
                        required: true
                    }
                }, {
                    key: 'enddate',
                    type: 'dateInput',
                    templateOptions: {
                        "formateType": "short",
                        label: '服务结束日期:',
                        required: true
                    }
                }, {
                    key: 'adviser',
                    type: 'npt-select-tree-single',
                    templateOptions: {
                        label: '专属顾问:',
                        required: true,
                        viewvalueQueryProp: "userid",
                        treeRepository: OrgListBySelectTree,
                        listRepository: UserListBySelectTree,
                        viewvalueRepository: QueryUserInfoById
                    }
                }, {
                    key: 'salesmanid',
                    type: 'npt-select-tree-single',
                    templateOptions: {
                        label: '业务员:',
                        required: true,
                        viewvalueQueryProp: "userid",
                        treeRepository: OrgListBySelectTree,
                        listRepository: UserListBySelectTree,
                        viewvalueRepository: QueryUserInfoById
                    }
                }
            ]
        });
    }).factory("OrderAdviserForm", function (nptFormlyStore, OrgListBySelectTree, UserListBySelectTree, QueryUserInfoById) {
        return nptFormlyStore("OrderAdviserForm", {
            fields: [
                {
                    key: 'adviser',
                    type: 'npt-select-tree-single',
                    templateOptions: {
                        label: '专属顾问:',
                        required: true,
                        viewvalueQueryProp: "userid",
                        treeRepository: OrgListBySelectTree,
                        listRepository: UserListBySelectTree,
                        viewvalueRepository: QueryUserInfoById
                    }
                }
            ]
        });
    }).factory("OrderChangePriceForm", function (nptFormlyStore) {
        return nptFormlyStore("OrderAdviserForm", {
            fields: [
                {
                    key: 'newprice',
                    type: 'numberInput',
                    templateOptions: {
                        label: '新价格:',
                        required: true,
                        "min": 0.00,
                        "max": 10000
                    }
                },
                {
                    key: 'reason',
                    type: 'textarea',
                    templateOptions: {
                        label: '原因:',
                        required: true
                    }
                }
            ]
        });
    });