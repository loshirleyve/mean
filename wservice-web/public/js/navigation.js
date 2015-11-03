/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';

angular.module('wsweb')
    .controller('navigationCtrl', function ($scope, Menus) {

        this.menus = {};
        // 初始化菜单，映射no跟url
        this.initMenus = function (mns) {
            var self = this;
            mns.forEach(function(menu) {
                if (menu.navigationItems) {
                    menu.navigationItems.forEach(function(item) {
                        self.menus[item.no] = item.mainurl;
                    });
                }
            });
        }

        // 导航到指定menuNo界面
        this.navigateTo = function (menuNo) {
            var self = this;
            var checkElement = $("#mno_" + menuNo);
            var ul = checkElement.parent().parent().prev();
            if (!ul.is(":visible")) {
                ul.click();
            }
            var parentNode = checkElement.parent();
            parentNode.parent().children().removeClass('active');
            setTimeout(function () {
                parentNode.addClass('active');
                $("#mainiframe", parent.document.body).attr("src", self.menus[menuNo]);
            }, 300);
        }
        // 将iframe body的点击事件传递回主界面
        $("#mainiframe").load(function () {
            $("#mainiframe").contents().find("body").attr("onclick",
                "window.parent.document.body.click();");
        });
        var self = this;
        Menus.query({userId: '10086', instId: '2'}).then(function (response) {
            var mns = response.data;
            self.initMenus(mns);
            $scope.menus = mns;
        }, function (response) {
            location.href = '/login';
        });
    })
    .factory('navigationMaster', function () {
        var navigationMaster = {};

        return navigationMaster;
    });