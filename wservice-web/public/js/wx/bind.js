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
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        label: '用户名:',
                        maxlength: 25
                    }
                },
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        label: "密   码：",
                        maxlength: 25
                    }
                }
            ]
        });
    })
    .controller("BindWxController", function ($location, Notification,wxForm) {
        var vm = this;
        //从页面读取微信数据
        vm.wxProfile = angular.fromJson($("#wxprofile").html());

        if (!vm.wxProfile) {
            $location.path("/failed");
            Notification.error({
                title: "绑定失败",
                message: "无法获取微信认证信息.",
                delay: 5000
            });
        }else{

        }

        //配置表单
        vm.wxFormOptions = {
            store: wxForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

    }).controller("FailedController", function () {

    });