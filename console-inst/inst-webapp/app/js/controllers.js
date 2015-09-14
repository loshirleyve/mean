'use strict';

/* Controllers */

//function MyCtrl1() {
//}
//MyCtrl1.$inject = [];
//
//
//function MyCtrl2($scope) {
//    $scope.name = 'HelloWorld!';
//}
//MyCtrl2.$inject = [];

app.controller("HomeCtrl", function ($scope) {
    $scope.name = "你好，这里是首页！"
})

app.controller("HelloCtrl", function ($scope) {
    $scope.name = '测试内容'
});

app.controller("MyCtrl2", function ($scope) {
    $scope.name = "HelloWorld!";
});

app.controller("OrderListCtrl",function($scope){

});

app.controller("c",function($scope){

});