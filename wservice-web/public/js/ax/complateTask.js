/**
 * Created by leon on 15/12/17.
 */

angular.module("AXCompleteTaskApp", ["ui.neptune", "ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/form/:code", {
            controller: "AXCompleteTaskController as vm",
            templateUrl: "form.html"
        });

    }).controller("AXCompleteTaskController", function ($routeParams) {
        var vm = this;

        vm.code = $routeParams.code;


    });