/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module('wservice')
    .factory("storeManager",function(wswebProvider) {
        // 如果用户配置了不保存工作台，则清空之前的数据
        if (!wswebProvider.get("storeWorkbench") && store) {
            store.clear();
        }
        return {
            set : function(name,obj) {
                if (wswebProvider.get("storeWorkbench") && store) {
                    store.set(name,obj);
                }
            },
            get : function (name) {
                if (store) {
                    return store.get(name);
                }
                return undefined;
            }
        };
    });