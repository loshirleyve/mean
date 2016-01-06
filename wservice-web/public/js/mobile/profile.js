/**
 * Created by Shirley on 2016/1/4.
 */

angular.module("UserProfileApp", ["ui.neptune","ngRoute", "ui-notification"])
    .factory("queryUserInfoById", function(nptRepository){
        return nptRepository("QueryUserInfoById").params({
           //"userid":nptSessionManager.getSession().getUser().id
           //"userid":"10000001519114"
           "userid":"10000001498059",
           "instid":"10000001463017"
        });
    })
    .factory("queryFileById", function(nptRepository){
        return nptRepository("QueryFileById");
    })
    .controller("UserProfileController", function(queryUserInfoById, Notification, queryFileById){
        var vm = this;
        vm.userInfo = queryUserInfoById;
        vm.queryUserInfo = function() {
            vm.userInfo.post().then(function (res) {
                angular.forEach(res.cache.user, function(key){
                   if(key.id == res.data.id){
                       vm.instName = key.instname;
                   }
                });
                vm.headerfileid = res.data.headerfileid;
            }, function (err) {
                Notification.error({
                    message: err.data.cause,
                    delay: 2000
                });
            });
        };
        vm.imageOptions={
            repository:queryFileById,
            searchProp:"fileid",
            labelProp:"fileUrl"
        };
        vm.queryUserInfo();
    });
