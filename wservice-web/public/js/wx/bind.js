/**
 * Created by leon on 15/12/21.
 */

angular.module("BindWxApp", ["ui.neptune", "ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "bind.html",
            controller: "BindWxController as vm"
        }).otherwise({
            redirectTo: "/"
        })
    })
    .controller("BindWxController", function () {
        var vm = this;
        //从页面读取微信数据
        var temp = $("#wxprofile").html();
        vm.wxProfile = angular.fromJson(temp);
    });