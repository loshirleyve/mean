/**
 * Created by leon on 15/12/10.
 */


angular.module("LoginApp", [])
    .controller("LoginController", function ($http) {
        var vm = this;


        vm.login = function () {
            $http.post("/auth", {
                userno: "13510237981",
                password: "1111111"
            }).then(function (response) {
            }, function (error) {
            });
        };
    });