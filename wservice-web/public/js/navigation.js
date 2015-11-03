/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';
$(function () {
    $("#mainiframe").load(function () {
        nav_iframeAutoResize();
    });
    nav_setupMenus();
    nav_iframeAutoResize();
});

/**
 * 加载导航菜单
 */
function nav_setupMenus(data) {
    var setupMenus = function (menus) {
        $("#sidebarMenu").find("li").not(":first").remove(); // 清除现有菜单
        if (!menus || !(menus instanceof Array) || menus.length == 0) {
            return;
        }
        menus.forEach(function(menu) {
            var node = "<li class='treeview'>" +
                "<a href='#'><i class='fa fa-files-o'></i><span>"+
                menu.name+"</span><i class='fa fa-angle-left pull-right'></i></a>";
            var items = menu.navigationItems;
            if (items && items.length > 0) {
                node += "<ul class='treeview-menu' style='display: none'>";
                items.forEach(function(item) {
                    node += "<li><a href='#' onclick='nav_onclickNavigationItem(this,\""+item.mainurl+"\")'><i class='fa fa-circle-o'></i>"+item.name+"</a></li>";
                });
                node += "</ul>";
            }
            node += "</li>"
            $(node).appendTo($("#sidebarMenu"));
        });
    }

    // 判断是否传递了菜单列表，没有则从服务器获取
    if (data) {
        setupMenus(data);
    } else {
        // TODO 从服务中获取导航菜单
        var menus = [{
            "id": "100",
            "name": "订单管理",
            "no": "orderManagement",
            "mainurl": "#",
            "type": "external",
            "sort": 6,
            "navigationItems": [
                {
                    "id": "102",
                    "name": "订单列表",
                    "no": "orderList",
                    "mainurl": "/order",
                    "type": "link",
                    "sort": 2
                },
                {
                    "id": "102",
                    "name": "订单列表",
                    "no": "orderList",
                    "mainurl": "/order",
                    "type": "link",
                    "sort": 2
                },
                {
                    "id": "102",
                    "name": "订单列表",
                    "no": "orderList",
                    "mainurl": "/order",
                    "type": "link",
                    "sort": 2
                }
            ]
        }, {
            "id": "101",
            "name": "客户管理",
            "no": "clientManagement",
            "mainurl": "#",
            "type": "external",
            "sort": 6,
            "navigationItems": [
                {
                    "id": "102",
                    "name": "客户列表",
                    "no": "clientList",
                    "mainurl": "/client",
                    "type": "link",
                    "sort": 2
                },{
                    "id": "102",
                    "name": "客户列表",
                    "no": "clientList",
                    "mainurl": "/client",
                    "type": "link",
                    "sort": 2
                },{
                    "id": "102",
                    "name": "客户列表",
                    "no": "clientList",
                    "mainurl": "/client",
                    "type": "link",
                    "sort": 2
                },{
                    "id": "102",
                    "name": "客户列表",
                    "no": "clientList",
                    "mainurl": "/client",
                    "type": "link",
                    "sort": 2
                }
            ]
        },{
            "id": "102",
            "name": "文件管理",
            "no": "fileManagement",
            "mainurl": "#",
            "type": "external",
            "sort": 6,
            "navigationItems": [
                {
                    "id": "104",
                    "name": "文件管理",
                    "no": "orderList",
                    "mainurl": "/order",
                    "type": "link",
                    "sort": 2
                },
                {
                    "id": "102",
                    "name": "文件管理",
                    "no": "orderList",
                    "mainurl": "/order",
                    "type": "link",
                    "sort": 2
                },
                {
                    "id": "102",
                    "name": "文件管理",
                    "no": "orderList",
                    "mainurl": "/order",
                    "type": "link",
                    "sort": 2
                }
            ]
        }];
        setupMenus(menus);
    }

}

/**
 * iframe 页面跳转
 * @param url
 */
function nav_onclickNavigationItem(obj,url) {
    $(obj.parentNode.parentNode).children().removeClass('active');
    $(obj.parentNode).addClass('active');
    $("#mainiframe", parent.document.body).attr("src", url);
}

/**
 * 重新设置iframe的高度
 */
function nav_iframeAutoResize() {
    $("#mainiframe").height($("#mainiframe").contents().find("body").height());
    $("#mainiframe").contents().find("body").attr("onclick", "window.parent.nav_iframeAutoResize();");
}

/**
 *
 */

