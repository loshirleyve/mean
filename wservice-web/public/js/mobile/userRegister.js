/**
 * Created by leon on 15/12/9.
 */

angular.module("userRegisterApp", ["ui.neptune", "ui-notification", "ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/form/:id", {
                controller: "UserRegisterController as vm",
                templateUrl: "register.html"
            })
            .when("/form", {
                controller: "UserRegisterController as vm",
                templateUrl: "register.html"
            })
            .when("/success", {
                controller: "RegSuccessController as vm",
                templateUrl: "success.html"
            })
            .when("/failed", {
                controller: "RegFailedController as vm",
                templateUrl: "failed.html"
            });
    })
    .factory("RegUserForm", function (nptFormlyStore, RegExpValidatorFactory) {
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
                    key: 'userno',
                    type: 'input',
                    templateOptions: {
                        label: '用户编号:',
                        disabled: true
                    }
                }, {
                    key: "name",
                    type: 'input',
                    templateOptions: {
                        label: '用户名称:',
                        required: true,
                        placeholder: "请输入用户名"
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
                        placeholder: "请再次确认密码"
                    },
                    validators: {
                        pwdFormat: {
                            expression: function (viewValue, modelValue, scope) {
                                if (scope.fc && viewValue) {
                                    scope.fc.$touched = true;
                                }
                                return viewValue == scope.model.passwd;
                            },
                            message: '"两次密码输入不一致！"'
                        }
                    }
                }
            ]
        });
    })
    .factory("KitActionQuery", function (nptRepository) {
        return nptRepository("KitActionQuery");
    })
    .factory("RegisteUser", function (nptRepository) {
        return nptRepository("RegisteUser");
    })
    .controller("UserRegisterController", function ($location, $routeParams, KitActionQuery, RegUserForm, RegisteUser, Notification) {
        var vm = this;

        vm.reposRegisteUser = RegisteUser;
        vm.code = $routeParams.id;
        vm.model = {
            state: "normal"
        };

        vm.originModel = angular.copy(vm.model);

        vm.regFormOptions = {
            store: RegUserForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;

                vm.nptFormApi.setOnActionListen(function () {
                    vm.model = angular.copy(vm.originModel);
                });

                vm.nptFormApi.addOnSubmitListen(function ($q) {

                    var deferd = $q.defer();

                    vm.reposRegisteUser.post(vm.model).then(function (response) {
                        //注册成功.转到成功提示页面
                        deferd.resolve(response);
                        $location.path("/success");
                    }, function (error) {
                        Notification.error({
                            title: "注册用户出错.",
                            message: error.data.cause,
                            dealy: 2000
                        });
                        deferd.reject();
                    });

                    return deferd.promise;
                });
            }
        };

        //如果存在code则查询action
        if (vm.code) {
            KitActionQuery.post({
                code: vm.code
            }).then(function (response) {
                vm.params = angular.fromJson(response.data.params);
                vm.model.phoneNum = vm.params.phoneNum;
                vm.model.userno = vm.params.phoneNum;
                vm.model.inviteUserid = vm.params.inviteUserid;
                vm.model.inviteDeptid = vm.params.inviteDeptid;
                vm.model.inviteInstName = vm.params.inviteInstName;
                vm.model.inviteInstid = vm.params.inviteInstid;
                vm.model.passwd = "";
                vm.model.repasswd = "";
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

    })
    .controller("RegSuccessController", function () {

    })
    .controller("RegFailedController", function () {

    });
