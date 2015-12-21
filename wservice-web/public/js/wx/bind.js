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
        })
    })
    .controller("BindWxController", function ($location, Notification) {
        var vm = this;
        //从页面读取微信数据
        vm.wxProfile = angular.fromJson($("#wxprofile").html());

        if (!vm.wxProfile) {
            $location.path("/failed")
            Notification.error({
                title: "绑定失败",
                message: "无法获取微信认证信息.",
                delay: 5000
            })
        }
    }).controller("FailedController", function () {

    });