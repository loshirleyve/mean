/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module('wservice')
    .service('menuService', function (navigationMaster, Notification, storeManager) {
        /**menuService主要操作左侧导航菜单，联合navigationMaster控制右侧子窗口***/

        var storeId = "openedMenus";

        // 导航到指定menuNo界面
        this.navigateTo = function (menuNo) {
            if (!navigationMaster.isOpened(menuNo) && !navigationMaster.isNewable()) {
                Notification.success('不能创建更多的窗口了');
                return;
            }
            navigationMaster.navigateTo(menuNo);
            this.focusMenus();
            storeMenus();
        };

        /**
         * 重新定位菜单项
         * 主要是讲当前焦点的tab的菜单项标亮
         */
        this.focusMenus = function () {
            var keepGoing = true;
            navigationMaster.subWindows.forEach(function (win) {
                if (!keepGoing || !win.menuNo) {
                    return;
                }
                var menuNo = win.menuNo;
                var checkElement = $("#mno_" + menuNo);
                var ul = checkElement.parent().parent();
                var parentNode = checkElement.parent();
                parentNode.parent().children().removeClass('active');
                if (navigationMaster.currentFocus &&
                    navigationMaster.currentFocus.menuNo == menuNo) {
                    if (!ul.is(":visible")) {
                        ul.prev().click();
                        setTimeout(function () {
                            parentNode.addClass('active');
                        }, 300);
                    } else {
                        parentNode.addClass('active');
                    }
                    keepGoing = false;
                }
            });
        };

        /**
         * 关闭指定菜单项的窗口
         * @param menuNo 指定菜单no
         */
        this.closeWindow = function (menuNo) {
            $("#mno_" + menuNo).parent().removeClass('active');
            navigationMaster.closeWindow(menuNo);
            storeMenus();
        };

        /**
         * 获取缓存的当前编辑菜单项
         * @returns {*}
         */
        this.getStoreMenus = function () {
            if (store) {
                return store.get(storeId);
            }
        };

        /**
         * 保存当前正在编辑的菜单项
         */
        function storeMenus() {
            var menus = navigationMaster.subWindows;
            var storeObj = storeManager.get(storeId) || {};
            var menuArr = [];
            menus.forEach(function (mm) {
                if (mm.menuNo) {
                    menuArr.push(mm.menuNo);
                }
            });
            storeObj.menus = menuArr;
            storeObj.focusMenu = navigationMaster.currentFocus ? navigationMaster.currentFocus.menuNo : undefined;
            storeManager.set(storeId, storeObj);
        }

    })
    .factory('navigationMaster', function (wswebProvider, Notification) {
        /**navigationMaster主要操作子窗口***/

        /**
         * navigationMaster工厂对象
         * openedNums，当前打开窗口数量
         * limitNums，系统限制窗口数量
         * increaseId，子窗口增长序列，用户生成唯一ID
         * currentFocus，当前焦点的子窗口，SubWindow的实例
         * subWindows，所有子窗口的数组
         * menus，菜单menuNo与菜单配置的隐射
         * @type {*}
         */
        var navigationMaster = {
            openedNums: 0,
            limitNums: wswebProvider.get('limitSubWindow') || 1,
            increaseId: 0,
            currentFocus: undefined,
            subWindows: [],
            menus: {}
        };

        /**
         * 子窗口类构造器
         * @constructor
         */
        var SubWindow = function () {
            this.sid = "sub_" + (navigationMaster.increaseId++);

        };
        /**
         * 子窗口加载界面
         * @param name
         * @param url
         */
        SubWindow.prototype.load = function (menu) {
            this.name = menu.name;
            this.url = menu.actionvalue;
            this.menuNo = menu.no;
            this.isOpen = true;
            $("#" + this.sid, parent.document.body).attr("src", this.url);
            this.focus();
        };

        /**
         * 使当前子窗口获取焦点
         */
        SubWindow.prototype.focus = function () {
            $("#" + this.sid).parent().children().hide();
            $("#" + this.sid).show();
            $("#" + this.sid + '_li').parent().children().removeClass('active');
            $("#" + this.sid + '_li').show();
            $("#" + this.sid + '_li').addClass('active');
        };

        /**
         * 关闭当前子窗口
         */
        SubWindow.prototype.close = function () {
            this.isOpen = false;
            $("#" + this.sid).hide();
            $("#" + this.sid, parent.document.body).attr("src", "");
            $("#" + this.sid + '_li').hide();

            this.name = undefined;
            this.url = undefined;
            this.menuNo = undefined;
        };
        /**
         * 初始化工程
         * @param menus 菜单数据
         */
        navigationMaster.init = function (menus) {
            if (this.subWindows.length > 0) {
                throw new Error('已经初始化过navigationMaster了');
            }
            this.singleWindow = (this.limitNums == 1);
            var self = this;
            menus.forEach(function (menu) {
                if (menu.items) {
                    menu.items.forEach(function (item) {
                        self.menus[item.no] = item;
                    });
                }
            });
            // 生成subWindow对象
            for (var i = 0; i < this.limitNums; i++) {
                this.subWindows.push(new SubWindow());
            }
        };
        /**
         * 导航到指定menuNo界面
         * @param menuNo
         */
        navigationMaster.navigateTo = function (menuNo) {
            var menu = this.menus[menuNo];
            var self = this;
            // 如果已经打开，则定位到tab
            if (this.isOpened(menuNo)) {
                self.currentFocus = self.findOpenMenu(menuNo);
                self.currentFocus.focus();
                return;
            }

            // 如果是单窗口模式
            if (this.singleWindow) {
                if (!this.currentFocus) {
                    this.currentFocus = this.subWindows[0];
                }
                this.currentFocus.load(menu);
            } else if (this.openedNums < this.limitNums) {   // 如果还没超过显示tab数
                var keepGoing = true;
                this.subWindows.forEach(function (win) {
                    if (keepGoing && !win.name) {
                        self.currentFocus = win;
                        keepGoing = false;
                    }
                });
                this.sortWindows();
                this.currentFocus.load(menu);
                this.openedNums++;
            } else {
                Notification.success('已达到限制的最多子窗口个数，' + this.limitNums);
            }
        };

        /**
         * 关闭指定窗口
         * @param menuNo 指定菜单NO
         */
        navigationMaster.closeWindow = function (menuNo) {
            var keepGoing = true;
            this.subWindows.forEach(function (win) {
                if (keepGoing && win.menuNo == menuNo) {
                    win.close();
                    navigationMaster.openedNums--;
                    keepGoing = false;
                }
            });
            this.sortWindows();
            if (this.currentFocus && !this.currentFocus.menuNo) {
                this.currentFocus = undefined;
                keepGoing = true;
                var self = this;
                this.subWindows.forEach(function (win) {
                    if (keepGoing && win.menuNo) {
                        self.currentFocus = win;
                        keepGoing = false;
                    }
                });
                if (this.currentFocus) {
                    this.currentFocus.focus();
                }
            }
        };

        /**
         * 为当前子窗口排序，根据是否有打开东西排序
         * 没有打开界面的排在最后面
         */
        navigationMaster.sortWindows = function () {
            this.subWindows.sort(function (a, b) {
                return a.menuNo ? 0 : 1;
            });
        };

        /**
         * 是否可以创建新窗口
         * @returns {boolean}
         */
        navigationMaster.isNewable = function () {
            return (this.singleWindow) ? true : this.openedNums < this.subWindows.length;
        };

        /**
         * 指定menuNo的窗口是否已经打开
         * @param menuNo
         * @returns {boolean}
         */
        navigationMaster.isOpened = function (menuNo) {

            return !!this.findOpenMenu(menuNo);
        };

        /**
         * 查找指定menuNo的窗口，如果有打开则返回
         * @param menuNo
         * @returns {undefined}
         */
        navigationMaster.findOpenMenu = function (menuNo) {
            var keepGoing = true;
            var openOne;
            this.subWindows.forEach(function (win) {
                if (keepGoing && win.menuNo == menuNo) {
                    openOne = win;
                    keepGoing = false;
                }
            });
            return openOne;
        };

        return navigationMaster;
    });