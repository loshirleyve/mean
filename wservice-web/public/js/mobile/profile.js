/**
 * Created by Shirley on 2016/1/4.
 */

angular.module("userProfileApp", ["ui.neptune","ngRoute", "ui-notification"])
    .factory("queryUserInfoById", function(nptRepository, nptSessionManager){
        return nptRepository("QueryUserInfoById").params({
           "userid":nptSessionManager.getSession().getUser().id
        });
    })
    .factory("queryFileById", function(nptRepository){
        return nptRepository("QueryFileById");
    })
    .controller("UserProfileController", function($scope, queryUserInfoById, Notification, queryFileById){
        var vm = this;
        $scope.userInfo = queryUserInfoById;
        $scope.queryUserInfo = $scope.userInfo.post().then(function(res){
            $scope.headerfileid = res.data.headerfileid;
        }, function(err){
            Notification.error({
               message:err.data.cause,
               delay:2000
            });
        });
        $scope.imageOptions={
            repository:queryFileById,
            searchProp:"fileid",
            labelProp:"fileUrl"
        };
    });
