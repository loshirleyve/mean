/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

/**
 * wservice.dt.store.demo：配置datatable的模块
 * wservice.form.store.demo：配置表单FORM的模块
 * wservice.common：配置公共组件的模块，如公共的repository跟store
 * ngRoute：angular路由功能；
 * PS：由于wservice.dt.store.demo已经依赖了ui.neptune，所以这里不需要再写依赖
 */
angular.module("demoApp",
    ["wservice.dt.store.demo","wservice.form.store.demo","wservice.common", "ngRoute"])
.config(function($routeProvider){
        /**
         * 注册路由
         *
         * 一般情况下，只需要配置一个路由，即list路由，编辑跟新增界面由控件处理
         * 不需要额外路由的
         *
         * 请注意，如果如果你的模块中需要用到session数据，如当前用户，机构信息等；
         * 则需要模仿下面resolve的使用，按下面的代码，程序会在你的ListController里面
         * 注入Session信息，你可以在ListController入参里配置名称为：sessionData(根据你的配置)
         * 的参数进行获取；（参考ListController实现）
         *
         *
         * */
        $routeProvider
            .when("/list", {
                controller: "ListController",
                templateUrl: "list.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .otherwise({
                redirectTo: "/list"
            });
}).controller("ListController",function($scope,sessionData) {
        console.log('in listController...');
});
