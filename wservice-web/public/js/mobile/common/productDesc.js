/**
 * Created by leon on 15/12/21.
 */

angular.module("ProductDescApp", ["ui.neptune", "ui-notification", "ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/:id", {
                controller: "ProductDescController as vm",
                templateUrl: "productDesc.html"
            });
    })
    .controller("ProductDescController", function ($scope, Notification, $location, $routeParams) {
        var vm = this;

        vm.productid = $routeParams.id;
    });