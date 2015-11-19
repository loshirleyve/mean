/**
 * Created by leon on 15/11/19.
 */

angular.module("selectInstApp", ["ui.neptune"])
    .config(function ($locationProvider) {
    })
    .controller("SelectInstController", function ($scope, $location, nptSession) {
        var vm = this;
        nptSession().then(function (session) {
            vm.insts = session.getUser().insts;
        });

    });