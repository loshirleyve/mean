/**
 * Created by leon on 15/12/21.
 */

angular.module("ServiceDocApp", ["ui.neptune", "ngRoute", "ui-notification"])
    .factory("QueryActionList", function(nptRepository){
        return nptRepository("QueryActionList");
    })
    .controller("ServiceDocController", function ($scope, QueryActionList, Notification) {
        $scope.queryActionList = QueryActionList;
        $scope.model = [];
        $scope.inputParams=[];
        $scope.query = function(){
            $scope.queryActionList.post().then(function(response){
                $scope.model = response.data;
            }, function(err){
                Notification.error({
                    message:err.data.cause,
                    delay:2000
                });
            });
        };
        $scope.query();
    }).filter("docDataFilter",function() {
        return function(input) {
            if (!input) return input;
            var output = "{\r\n";
            angular.forEach(input,function(each) {
                output += "      \""+ each.name +"\" : \"\",\r\n"
            });
            output = output.substring(0,output.Length-1);
            return output+"}";
        };
    });