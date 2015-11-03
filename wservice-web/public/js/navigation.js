/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';

angular.module('wsweb').controller('navigationCtrl',
    function ($scope, Menus, navigationService) {
        navigationService.autoResizeIframe();
        Menus.query({userId: '10086', instId: '2'}).then(function (response) {
            navigationService.setupMenus(response.data);
            $scope.menus = response.data;
        }, function (response) {
            location.href = '/login';
        });

        this.navigateTo = function (menuNo) {

        }

        this.autoResizeIframe = function() {

        }
    }).service('navigationService', function () {
        // 设置iframe加载事件
        var self = this;
        $("#mainiframe").load(function () {
            self.autoResizeIframe();
        });
        this.menus = [];
        // 加载导航菜单
        this.setupMenus = function(menus) {
            $("#sidebarMenu").find("li").not(":first").remove(); // 清除现有菜单
            if (!menus || !(menus instanceof Array) || menus.length == 0) {
                return;
            }
            menus.forEach(function (menu) {
                var node = "<li class='treeview'>" +
                    "<a href='#'><i class='fa fa-files-o'></i><span>" +
                    menu.name + "</span><i class='fa fa-angle-left pull-right'></i></a>";
                var items = menu.navigationItems;
                if (items && items.length > 0) {
                    node += "<ul class='treeview-menu' style='display: none'>";
                    items.forEach(function (item) {
                        node += "<li><a id='mno_"+item.no+"' href='#' onclick='nav_onclickNavigationItem(this,\""
                            + item.mainurl + "\")'><i class='fa fa-circle-o'></i>" + item.name + "</a></li>";
                    });
                    node += "</ul>";
                }
                node += "</li>"
                $(node).appendTo($("#sidebarMenu"));
            });
        }

        this.autoResizeIframe = function() {
            nav_iframeAutoResize();
        }

        this.navigateTo = function(menuNo) {
            var checkElement = $("#mno_"+menuNo);
            checkElement.parent().parent().prev().click();
            setTimeout(function(){
                checkElement.click();
            },300);
        }
    })
    .factory('navigationMaster',function() {

    });


/**
 * iframe 页面跳转
 * @param url
 */
function nav_onclickNavigationItem(obj, url) {
    var parentNode = $(obj.parentNode);
    parentNode.parents('ul').find('li.active').removeClass('active');
    parentNode.addClass('active');
    $("#mainiframe", parent.document.body).attr("src", url);
}

/**
 * 重新设置iframe的高度
 */
function nav_iframeAutoResize() {
    $("#mainiframe").height($("#mainiframe").contents().find("body").height());
    $("#mainiframe").contents().find("body").attr("onclick",
        "window.parent.document.body.click();");
}