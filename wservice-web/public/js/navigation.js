/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';

angular.module('wsweb')
    .controller('navigationCtrl', function ($scope, Menus, navigationService) {

        this.navigateTo = function (menuNo) {
            navigationService.navigateTo(menuNo);
        }

        this.autoResizeIframe = function () {
            navigationService.autoResizeIframe();
        }

        this.autoResizeIframe();
        Menus.query({userId: '10086', instId: '2'}).then(function (response) {
            $scope.menus = response.data;
        }, function (response) {
            location.href = '/login';
        });
    })
    .service('navigationService', function () {
        // 设置iframe加载事件
        var self = this;
        $("#mainiframe").load(function () {
            //self.autoResizeIframe();
        });

        this.autoResizeIframe = function () {
            $("#mainiframe").height($("#mainiframe").contents().find("body").height());
            $("#mainiframe").contents().find("body").attr("onclick",
                "window.parent.document.body.click();window.parent.nav_autoResizeIframe();");
        }

        this.navigateTo = function (menuNo) {
            var checkElement = $("#mno_" + menuNo);
            var ul = checkElement.parent().parent().prev();
            if (!ul.is(":visible")) {
                ul.click();
            }
            var parentNode = checkElement.parent();
            parentNode.parent().children().removeClass('active');
            setTimeout(function () {
                parentNode.addClass('active');
                $("#mainiframe", parent.document.body).attr("src", '/app/order');
            }, 300);
        }
    })
    .factory('navigationMaster', function () {
        var navigationMaster = {};

        return navigationMaster;
    });

function nav_autoResizeIframe () {
    $("#mainiframe").height($("#mainiframe").contents().find("body").height());
    $("#mainiframe").contents().find("body").attr("onclick",
        "window.parent.document.body.click();window.parent.nav_autoResizeIframe();");
}
