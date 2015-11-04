/*!
 * mars
 * 父窗口将需要提供给子窗口使用的服务，发布到window下面的$masterService对象中；
 * master模块中的masterService服务继承父窗口的$masterService，一遍提供调用
 * 父窗口的服务；
 * 服务清单：
 * menuService,用户打开/关闭窗口
 * messageService,用于弹出提示框
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';
angular.module('master',[])
    .service('masterService',function() {
        if (window.parent && window.parent.$masterService) {
            angular.copy(window.parent.$masterService,this);
        }
    });