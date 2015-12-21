/**
 * Created by leon on 15/12/21.
 */

angular.module("ServiceDocApp", ["ui.neptune", "ui-notification"])
    .factory("QueryActionList", function(nptRepository){
        return nptRepository("QueryActionList");
    })
    .controller("ServiceDocController", function (QueryActionList, Notification) {
        var vm = this;
        vm.queryActionList = QueryActionList;
        vm.model = [];
        vm.query = function(){
            vm.queryActionList.post().then(function(response){
                vm.model = response.data;
            }, function(err){
                Notification.error({
                    message:err.data.cause,
                    delay:2000
                });
            })
        }
    });