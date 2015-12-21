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

    });