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
    .factory("QueryProductInfoById", function(nptRepository){
        return nptRepository("QueryProductInfoById");
    })
    .factory("queryFileById", function(nptRepository){
        return nptRepository("QueryFileById");
    })
    .controller("ProductDescController", function ($scope, Notification, $location, $routeParams, QueryProductInfoById, queryFileById) {
        var vm = this;
        vm.productid = $routeParams.id;
        vm.productInfo = QueryProductInfoById;
        vm.model = [];
        vm.imageOptions={
          repository: queryFileById,
          searchProp:"fileid",
          labelProp:"fileUrl"
        };
        vm.query = function(){
            vm.productInfo.post({"productid":vm.productid}).then(function(response){
                vm.model=response.data.bizProductDescrs;
            }, function(err){
                Notification.error({
                    message:err.data.cause,
                    delay:2000
                })
            })
        };
        vm.query();
    });