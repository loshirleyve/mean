/**
 * Created by Leon on 15/9/11.
 */

'use strict';

angular.module('wsweb',['wsweb.service','wsweb.session'])
    .controller('launchCtrl',['$scope','Menus',function($scope,Menus) {
    console.log(JSON.stringify($scope.session));
    Menus.query({name:'hbl',defaultMenu:'defaultX'},function(menus) {
        console.log(menus);
    });
}]);

