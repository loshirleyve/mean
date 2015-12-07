
/**
 * Created by rxy on 15/11/17.
 */
angular.module("receivableApp.receivableForm", ["ui.neptune"])
    .factory("receivableForm", function (nptFormlyStore,OrgListBySelectTree,UserListBySelectTree,QueryUserInfoById,QueryPayModeType) {
        return nptFormlyStore("receivableForm", {
            options: {

            },
            fields: [
                {
                    key: 'amount',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '本次收款金额:'
                    }
                },
                {
                    key: 'payTypeCode',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: 'bs-options',
                        label: '本次收款方式:',
                        required: true,
                        valueProp: 'code',
                        labelProp: 'name',
                        placeholder: '请选择',
                        options: [],
                        repository: QueryPayModeType
                    }
                },
                {
                    key: 'collectuserid',
                    type: 'npt-select-tree-single',
                    templateOptions: {
                        label: '收款人:',
                        required: true,
                        viewvalueQueryProp: "userid",
                        treeRepository: OrgListBySelectTree,
                        listRepository: UserListBySelectTree,
                        viewvalueRepository: QueryUserInfoById
                    }
                },
                {
                    key: 'remark',
                    type: 'input',
                    templateOptions: {
                        label: '说明:'
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
    }).factory("receivableSearchForm", function (nptFormlyStore) {
        return nptFormlyStore("receivableSearchForm", {
            options: {

            },
            fields: [
                {
                    key: 'businessKey',
                    type: 'input',
                    templateOptions: {
                        label: '购买内容:'
                    }
                },
                {
                    key: 'begindate',
                    type: 'input',
                    templateOptions: {
                        label: '开始日期:',
                        placeholder: '日期格式为:20150101'
                    }
                },
                {
                    key: 'enddate',
                    type: 'input',
                    templateOptions: {
                        label: '结束日期:',
                        placeholder: '日期格式为:20150101'
                    }
                },
                {
                    key: 'complete',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: 'bs-options',
                        valueProp:"id",
                        labelProp:"name",
                        label: '是否完成:',
                        options:[
                            {
                                name:"不选",
                                id:'no'
                            },
                            {
                                name:"是",
                                id:'1'
                            },
                            {
                                name:"否",
                                id:'0'
                            }
                        ],
                        allowClear:false
                    },
                    defaultValue:0
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
