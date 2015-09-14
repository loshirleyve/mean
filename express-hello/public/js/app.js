/**
 * Created by Leon on 15/9/11.
 */

'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('y9App', ['ngRoute']).controller("navCtrl", function ($scope,$window) {
    var tempInst = $window.sessionStorage.getItem("inst")

    $scope.inst = {title: "顶聚科技", product: "移办通"}

});
