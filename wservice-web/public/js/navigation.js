/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';

angular.module('wsweb')
    .service('menuService',function(navigationMaster) {
        // 导航到指定menuNo界面
        this.navigateTo = function (menuNo) {
            var checkElement = $("#mno_" + menuNo);
            var ul = checkElement.parent().parent().prev();
            if (!ul.is(":visible")) {
                ul.click();
            }
            var parentNode = checkElement.parent();
            parentNode.parent().children().removeClass('active');
            navigationMaster.navigateTo(menuNo);
            setTimeout(function () {
                parentNode.addClass('active');
            }, 300);
        }
    })
    .factory('navigationMaster', function () {

        var navigationMaster = {
            openedNums:0,
            limitNums:3,
            increaseId:0,
            currentFocus:undefined,
            subWindows:[],
            menus:{}
        };

        var SubWindow = function() {
            this.sid = "sub_"+(navigationMaster.increaseId++);

        }
        /**
         * 子窗口加载界面
         * @param name
         * @param url
         */
        SubWindow.prototype.load = function(menu) {
            this.name = menu.name;
            this.url = menu.mainurl;
            this.menuNo = menu.no;
            this.isOpen = true;
            $("#"+this.sid, parent.document.body).attr("src", this.url);
            this.focus();
        }

        SubWindow.prototype.focus = function() {
            $("#"+this.sid).parent().children().hide();
            $("#"+this.sid).show();
            $("#"+this.sid+'_li').parent().children().removeClass('active');
            $("#"+this.sid+'_li').show();
            $("#"+this.sid+'_li').addClass('active');
        }

        SubWindow.prototype.close = function() {
            this.isOpen = false;
            $("#"+this.sid).hide();
            $("#"+this.sid, parent.document.body).attr("src", "");
            $("#"+this.sid+'_li').hide();

            this.name = undefined;
            this.url = undefined;
            this.menuNo = undefined;
        }
        /**
         * 初始化工程
         * @param menus 菜单数据
         */
        navigationMaster.init = function(menus) {
            if (this.subWindows.length > 0) {
                throw new Error('已经初始化过navigationMaster了');
            }
            this.singleWindow = (this.limitNums == 1);
            var self = this;
            menus.forEach(function(menu) {
                if (menu.navigationItems) {
                    menu.navigationItems.forEach(function(item) {
                        self.menus[item.no] = item;
                    });
                }
            });
            // 生成subWindow对象
            for (var i = 0;i < this.limitNums;i++) {
                this.subWindows.push(new SubWindow())
            }
        }
        /**
         * 导航到指定menuNo界面
         * @param menuNo
         */
        navigationMaster.navigateTo = function (menuNo) {
            var menu = this.menus[menuNo];
            var self = this;
            // 如果已经打开，则定位到tab
            var isOpened = false;
            var keepGoing = true;
            this.subWindows.forEach(function(win) {
                if (keepGoing && win.menuNo == menuNo) {
                    isOpened = true;
                    self.currentFocus = win;
                    keepGoing = false;
                }
            });
            if (isOpened) {
                self.currentFocus.focus();
                return;
            }

            // 如果是单窗口模式
            if (this.singleWindow) {
                if (!this.currentFocus) {
                    this.currentFocus = this.subWindows[0];
                }
                this.currentFocus.load(menu);
            } else if (this.openedNums < this.limitNums){   // 如果还没超过显示tab数
                keepGoing = true;
                this.subWindows.forEach(function(win){
                    if (keepGoing && !win.name) {
                        self.currentFocus = win;
                        keepGoing = false;
                    }
                });
                this.currentFocus.load(menu);
                this.openedNums++;
            } else {
                // 警告
            }
        }

        navigationMaster.closeWindow = function(menuNo) {
            var keepGoing = true;
            this.subWindows.forEach(function(win){
                if (keepGoing && win.menuNo ==  menuNo) {
                    win.close();
                    navigationMaster.openedNums--;
                    keepGoing = false;
                }
            });
            if (this.currentFocus
                && !this.currentFocus.menuNo) {
                this.currentFocus = undefined;
                keepGoing = true;
                var self =this;
                this.subWindows.forEach(function(win){
                    if (keepGoing && win.menuNo) {
                        self.currentFocus = win;
                        keepGoing = false;
                    }
                });
                if (this.currentFocus) {
                    this.currentFocus.focus();
                }
            }
        }

        return navigationMaster;
    });