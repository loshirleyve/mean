/**
 * Created by rxy on 16/1/14.
 */

angular.module("userManagerApp.userForm", ["ui.neptune",'ui.bootstrap',"wservice.common"])
    .factory("userRoleForm", function (nptFormlyStore,QueryInstRole) {
        return nptFormlyStore("userRoleForm", {
            options: {
            },
            fields: [
                {
                    key: 'ids',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: 'bs-options',
                        label: '用户角色:',
                        required: true,
                        valueProp: 'id',
                        labelProp: 'name',
                        placeholder: '请选择',
                        options: [],
                        multiple:true,
                        repository: QueryInstRole
                    }
                }
            ],
            buttons: {
                ok: true,
                reset: true
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
    }).factory("userSearchForm", function (nptFormlyStore) {
        return nptFormlyStore("userSearchForm", {
            options: {

            },
            fields: [
                {
                    key: 'no',
                    type: 'input',
                    templateOptions: {
                        label: '用户编号:',
                        placeholder: "请输入用户编号"
                    }
                },
                {
                    key: 'userName',
                    type: 'input',
                    templateOptions: {
                        label: '用户姓名:',
                        placeholder: "请输入用户姓名"
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
    }).factory("QueryInstRole", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryInstRole").params({
            "instid": nptSessionManager.getSession().getInst().id
        });
    });