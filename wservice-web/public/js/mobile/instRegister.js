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
    }).factory("RegUserForm", function (nptFormlyStore) {
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
                        required: true
                    }
                }, {
                    key: "passwd",
                    type: 'input',
                    templateOptions: {
                        type: "password",
                        label: '密码:',
                        required: true
                    }
                }, {
                    key: "repasswd",
                    type: 'input',
                    templateOptions: {
                        type: "password",
                        label: '确认密码:',
                        required: true
                    }
                }
            ]
        });
    }).factory("KitActionQuery", function (nptRepository) {
        return nptRepository("KitActionQuery");
    }).controller("InstRegisterController", function (RegUserForm, Notification) {
        var vm = this;
        vm.model = {};

        vm.regFormOptions = {
            store: RegUserForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;

                vm.nptFormApi.setOnActionListen(function () {
                    vm.model = angular.copy(vm.originModel);
                });

                vm.nptFormApi.addOnSubmitListen(function ($q) {

                    //var deferd = $q.defer();
                    //
                    //vm.reposRegisteUser.post(vm.model).then(function (response) {
                    //    //注册成功.转到成功提示页面
                    //    deferd.resolve(response);
                    //    $location.path("/success");
                    //}, function (error) {
                    //    Notification.error({
                    //        title: "注册用户出错.",
                    //        message: error.data.cause,
                    //        dealy: 2000
                    //    });
                    //    deferd.reject();
                    //});
                    //
                    //return deferd.promise;
                });
            }
        };
    }).controller("SuccessController", function () {

    }).controller("FailedController", function () {

    });