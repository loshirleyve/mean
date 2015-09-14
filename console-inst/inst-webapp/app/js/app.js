'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('y9App', ['ngRoute', 'y9App.filters', 'y9App.services', 'y9App.directives']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {templateUrl: 'view/home.html', controller: "HomeCtrl"});
        $routeProvider.when('/view1', {templateUrl: 'view/partials/partial1.html', controller: "HelloCtrl"});
        $routeProvider.when('/view2', {templateUrl: 'view/partials/partial2.html', controller: "MyCtrl2"});
        $routeProvider.when('/demo/jumbotron', {templateUrl: 'view/demo/jumbotron.html', controller: "MyCtrl2"});
        $routeProvider.when('/demo/list', {templateUrl: 'view/demo/list.html', controller: "MyCtrl2"});
        $routeProvider.when('/order/order-list', {
            templateUrl: 'view/order/order-list.html',
            controller: "OrderListCtrl"
        });
        $routeProvider.when('/order/order-detail', {
            templateUrl: 'view/order/order-detail.html',
            controller: "OrderDetailCtrl"
        });

        //$routeProvider.otherwise({redirectTo: '/home'});
    }]);
