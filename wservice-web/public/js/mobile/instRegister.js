/**
 * Created by leon on 15/12/10.
 */

angular.module("InstRegisterApp", ["ui.neptune", "ui-notification", "ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/form/:id", {
                controller: "InstRegisterController as vm",
                templateUrl: "register.html"
            })
            .when("/form", {
                controller: "InstRegisterController as vm",
                templateUrl: "register.html"
            })
            .when("/success", {
                controller: "SuccessController as vm",
                templateUrl: "success.html"
            })
            .when("/failed", {
                controller: "FailedController as vm",
                templateUrl: "failed.html"
            });
    }).factory("RegUserForm", function (nptFormlyStore, RegExpValidatorFactory, QueryMdInstScale) {
        return nptFormlyStore("RegUserForm", {
            actions: [
                {
                    label: "重置",
                    type: "reset"
                }
            ],
            buttons: {
                ok: true
            },
            fields: [
                {
                    key: "userNo",
                    type: 'input',
                    templateOptions: {
                        label: '用户编号:',
                        required: true,
                        disabled: true
                    }
                }, {
                    key: "userName",
                    type: 'input',
                    templateOptions: {
                        label: '用户名称:',
                        required: true,
                        placeholder: "请输入你的姓名."
                    }
                }, {
                    key: "passwd",
                    type: 'input',
                    templateOptions: {
                        type: "password",
                        label: '密码:',
                        required: true,
                        placeholder: "请输入6至12位由字母或数字组成的密码"
                    },
                    validators: {
                        pwdFormat: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^[a-z0-9A-Z]{6,12}$/i),
                            message: '"请输入6至12位由字母或数字组成的密码！"'
                        }
                    }
                }, {
                    key: "repasswd",
                    type: 'input',
                    templateOptions: {
                        type: "password",
                        label: '确认密码:',
                        required: true,
                        placeholder:"请再次确认密码"
                    },
                    validators: {
                        pwdFormat: {
                            expression: function(viewValue,modelValue,scope) {
                                return viewValue == scope.model.passwd;
                            },
                            message: '"两次密码输入不一致！"'
                        }
                    }
                },
                {
                    key: 'companyName',
                    type: 'input',
                    templateOptions: {
                        label: '公司名称:',
                        required: true,
                        placeholder: "请输入与营业执照上登记一致的公司名称."
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^[\u2E80-\u9FFF]+$/i),
                            message: '"公司名称必须是汉字!"'
                        }
                    },
                    modelOptions:{ updateOn: 'blur' }
                }, {
                    key: "simpleName",
                    type: 'input',
                    templateOptions: {
                        label: '公司简称:',
                        required: true,
                        placeholder: "请输入便于记忆的公司简称."
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^[\u2E80-\u9FFF]+$/i),
                            message: '"公司简称必须是汉字！"'
                        }
                    },
                    modelOptions:{ updateOn: 'blur' }
                }, {
                    key: "companyNo",
                    type: 'input',
                    templateOptions: {
                        label: '公司编号:',
                        required: true,
                        placeholder: "请输入公司简称的拼音首字母大写."
                    },
                    validators: {
                        pwdFormat: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^[A-Z]$/i),
                            message: '"请输入公司简称的拼音首字母大写！"'
                        }
                    }
                }/*, {
                    key: "companyScale",
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        selectIndex:0,
                        label: '公司规模:',
                        required: true,
                        placeholder: "请选择公司的规模,将根据你的选择初始化机构.",
                        valueProp:'type',
                        labelProp:'name',
                        options:[],
                        repository: QueryMdInstScale,
                        repositoryParams: {"instid":nptSessionManager.getSession().getInst().id}
                    }
                }*/
            ]
        });
    })
    .factory("QueryMdInstScale",function(nptRepository){
        return nptRepository("queryMdInstScale").addResponseInterceptor(function (response) {
            response.data = response.data.bizMdInstScales;
            return response;
        });
    })
    .factory("KitActionQuery", function (nptRepository) {
        return nptRepository("KitActionQuery");
    }).factory("InstInit", function (nptRepository) {
        return nptRepository("instInit");
    }).factory("KitActionFinish", function (nptRepository) {
        return nptRepository("KitActionFinish");
    }).controller("InstRegisterController", function (RegUserForm, Notification, $routeParams, $location, KitActionQuery, InstInit, KitActionFinish) {
        var vm = this;
        vm.model = {};
        vm.code = $routeParams.id;
        vm.reposInstInit = InstInit;

        //如果存在code则查询action
        if (vm.code) {
            KitActionQuery.post({
                code: vm.code
            }).then(function (response) {
                vm.params = angular.fromJson(response.data.params);
                vm.model.userNo = vm.params.email;
                vm.originModel = angular.copy(vm.model);
            }, function (error) {
                $location.path("/failed");
                Notification.error({
                    title: "获取注册信息错误.",
                    message: error.data.cause,
                    dealy: 5000
                });
            });
        }

        vm.regFormOptions = {
            store: RegUserForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;

                vm.nptFormApi.setOnActionListen(function () {
                    vm.model = angular.copy(vm.originModel);
                });

                vm.nptFormApi.addOnSubmitListen(function ($q) {

                    var deferd = $q.defer();

                    vm.reposInstInit.post(vm.model).then(function (response) {
                        //注册成功.转到成功提示页面
                        deferd.resolve(response);
                        $location.path("/success");

                    }, function (error) {
                        Notification.error({
                            title: "注册机构出错.",
                            message: error.data.cause,
                            dealy: 2000
                        });
                        deferd.reject();
                    });

                    return deferd.promise;
                });
            }
        };
    }).controller("SuccessController", function () {

    }).controller("FailedController", function () {

    });