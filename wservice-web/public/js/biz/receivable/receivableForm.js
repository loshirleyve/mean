
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
                        label: '本次收款金额:',
                        value:"0"
                    }
                },
                {
                    key: 'payTypeCode',
                    type: 'ui-select',
                    templateOptions: {
                        label: '本次收款方式:',
                        required: true,
                        valueProp: 'code',
                        labelProp: 'name',
                        placeholder: '请选择',
                        options: [],
                        repository: QueryPayModeType,
                        repositoryParams: {"instid": "10000001468002"},
                        search:["name"]
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
                        required: true,
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
    });