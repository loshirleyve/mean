/**
 * Created by leon on 15/12/21.
 */

angular.module("BindWxApp", ["ui.neptune", "ngRoute", "ui-notification"])
    .config(function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "bind.html",
            controller: "BindWxController as vm"
        }).when("/failed", {
            templateUrl: "failed.html",
            controller: "FailedController as vm"
        }).when("/success", {
            templateUrl: "success.html",
            controller: "SuccessController as vm"
        }).otherwise({
            redirectTo: "/"
        });
    }).factory("wxForm", function (nptFormlyStore) {
        return nptFormlyStore("wxForm", {
            buttons: {
                ok: true,
                reset: false
            },
            actions: [
                {
                    label: "重置",
                    type: "reset"
                }
            ],
            options: {
                formState: {
                    disabled: false
                }

            },
            fields: [
                {
                    key: 'userno',
                    type: 'input',
                    templateOptions: {
                        label: '用户名:',
                        maxlength: 25
                    }
                },
                {
                    key: 'passwd',
                    type: 'input',
                    templateOptions: {
                        label: "密   码：",
                        type: 'password',
                        maxlength: 10
                    }
                }
            ]
        });
    }).factory("queryUserExist", function (nptRepository) {
        return nptRepository("QueryIdentificationByUsernoAndPasswd").params({
        });
    }).factory("AddOrUpdateUserWx", function (nptRepository) {
        return nptRepository("AddOrUpdateUserWx").params({
        });
    })
    .controller("BindWxController", function ($location, Notification, wxForm, queryUserExist, AddOrUpdateUserWx) {
        var vm = this;
        vm.queryUserExist = queryUserExist;
        vm.addUserWx = AddOrUpdateUserWx;
        vm.isError = false;
        vm.userWx = {};
        //从页面读取微信数据
        vm.wxProfile = angular.fromJson($("#wxprofile").html());

        if (!vm.wxProfile) {
            $location.path("/failed");
            Notification.error({
                title: "绑定失败",
                message: "无法获取微信认证信息.",
                delay: 5000
            });
        } else {
            vm.userWx = angular.copy(vm.wxProfile._json);
            vm.userWx.displayName = angular.copy(vm.wxProfile.displayName);
        }
        //配置表单
        vm.wxFormOptions = {
            store: wxForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
                //注册提交事件
                vm.nptFormApi.addOnSubmitListen(save);
                //设置重置事件
                vm.nptFormApi.setOnActionListen(reset);
            }
        };

        function save() {
            vm.queryUserExist.post(vm.model)
                .then(function (response) {
                    vm.userWx.userid = angular.copy(response.data.user.id);
                    vm.userWx.createby = angular.copy(response.data.user.id);
                    delete vm.userWx.privilege;
                    addWx();
                }, function (error) {
                    vm.isError = true;
                });
        }


        function reset() {
            vm.model = {};
        }

        function addWx() {
            vm.addUserWx.post(vm.userWx).then(function (response) {
                $location.path("/success");
                Notification.success({
                    message: "绑定成功",
                    delay: 5000
                });
            }, function (error) {
                $location.path("/failed");
                Notification.error({
                    title: "绑定失败",
                    message: error.data.cause,
                    delay: 5000
                });
            });
        }
    }).controller("FailedController", function () {

    }).controller("SuccessController", function () {

    });