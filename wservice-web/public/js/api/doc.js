/**
 * Created by leon on 15/12/21.
 */

angular.module("ServiceDocApp", ["ui.neptune", "ngRoute", "ui-notification"])
    .factory("QueryActionList", function(nptRepository){
        return nptRepository("QueryActionList");
    })
    .controller("ServiceDocController", function ($scope, QueryActionList, Notification,$http) {
        var vm  = this;
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

        vm.invoke  = function(action){
            var params = {};
            angular.forEach(action.inputs.paramsDefs,function(reqParam) {
                params[reqParam.name] = action.inputs.paramsDefs.model[[reqParam.name]];
            });
            var data = {
                "token":"8fc50dd14a951318ca168e40a9fa1ec78d1110e058700c9affdbe6ab5eb6b931",
                "action":action.name,
                "data":params
            };
            console.log(data);
            return $http.post('/api/test',data).then(function(response) {
                action.inputs.paramsDefs.response = response.data;
            });
        }

    }).filter("docDataFilter",function() {
        return function(input) {
            if (!input || input.length == 0) return "{}";
            var output = "{\r\n";
            angular.forEach(input,function(each) {
                output += "      \""+ each.name +"\" : \"\",\r\n"
            });
            output = output.substring(0,output.length - 3);
            return output + "\r\n    }";
        };
    });
