/**
 * Created by leon on 15/12/17.
 */

angular.module("AXBeginTaskApp", ["ui.neptune", "ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/form/:code", {
            controller: "AXBeginTaskController as vm",
            templateUrl: "form.html"
        });

    }).controller("AXBeginTaskController", function ($routeParams) {
        var vm = this;

        vm.code = $routeParams.code;


    });