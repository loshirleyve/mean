/**
 * Created by leon on 15/12/9.
 */

angular.module("userRegisterApp", ["ui.neptune", "ui-notification", "ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/:id", {
                controller: "UserRegisterController as vm",
                templateUrl: "register.html"
            })
            .when("/", {
                controller: "UserRegisterController as vm",
                templateUrl: "register.html"
            })
            .otherwise({
                redirectTo: "/"
            });
    })
    .factory("RegUserForm", function (nptFormlyStore) {
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
                    key: 'no',
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
                        label: '密码:',
                        required: true
                    }
                }, {
                    key: "repasswd",
                    type: 'input',
                    templateOptions: {
                        label: '确认密码:',
                        required: true
                    }
                }
            ]
        })
    })
    .factory("KitActionQuery", function (nptRepository) {
        return nptRepository("KitActionQuery");
    })
    .factory("RegisteUser", function (nptRepository) {
        return nptRepository("RegisteUser");
    })
    .controller("UserRegisterController", function ($location, $routeParams, KitActionQuery, RegUserForm, RegisteUser) {
        var vm = this;

        vm.reposRegisteUser = RegisteUser;
        vm.code = $routeParams.id;
        vm.model = {
            userstate: "normal"
        };

        vm.originModel = angular.copy(vm.model);

        vm.regFormOptions = {
            store: RegUserForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;

                vm.nptFormApi.setOnActionListen(function () {
                    vm.model = angular.copy(vm.originModel);
                });

                vm.nptFormApi.addOnSubmitListen(function () {

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
                vm.model.no = vm.params.phoneNum;
                vm.model.inviteUserid = vm.params.inviteUserid;
                vm.model.inviteDeptid = vm.params.inviteDeptid;
                vm.model.inviteInstName = vm.params.inviteInstName;
                vm.originModel = angular.copy(vm.model);
            }, function (error) {
                console.info(error);
            });
        }

    });