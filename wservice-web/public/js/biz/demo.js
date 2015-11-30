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
    }).controller("ListController",function($scope,sessionData,demoService) {
        /**
         * 注意上面的sessionData，这个就是在上面config里面controller跳转前配置的resolve的参数；
         * 可以通过，getInst();getUser()获取当前机构，当前用户；
         */


        $scope.data = [];
        /**
         * 除了增删改，其他配置的方法，如查看，会进入这个方法；
         * 我们可以在这里定制自己的处理逻辑
         * @param type 按钮类型
         * @param item
         * @param index
         */
        $scope.demoAction = function (type, item, index) {
            console.info(type);
        };

        //设置自定义查询以及检查新订单
        $scope.query = demoService.query;
        $scope.checkNew = demoService.checkNew;

        /**
         * 根据状态查询当前用户机构的订单列表
         */
        $scope.queryByState = function () {
            demoService.query.list($scope.query.state, function (data) {
                $scope.data = data;
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            });
        };

        //首先查询全部订单
        if (demoService.query.data.length <= 0) {
            $scope.queryByState();
        } else {
            $scope.data = orderService.query.data;
        }
    }).service("demoService",function($http, $location, QueryOrderListRepo, nptSessionManager) {
        /*如果你在上面的controller使用了resolve获取session，那么接下来的其他构件中，你就可以如上这样
         * 注入nptSessionManager，从中getSession()获取当前session数据；然后从session中getInst();getUser()*/

        var self = this;
        /**
         * 切换是否执行检查新订单
         */
        this.checkNew = {
            isCollapsed: false,
            toggle: function () {

                self.checkNew.isCollapsed = !self.checkNew.isCollapsed;
                if (self.checkNew.isCollapsed) {
                    self.checkNew.text = "停止检查";
                    if (self.query.isCollapsed) {
                        self.query.toggle();
                    }
                }
                else {
                    self.checkNew.text = "检查新订单";
                }
            }
        };

        this.query = {
            state: "all",
            data: [],
            currPage: 0,
            isCollapsed: false,
            toggle: function () {
                self.query.isCollapsed = !self.query.isCollapsed;
                if (self.query.isCollapsed) {
                    self.query.text = "关闭查询";
                    if (self.checkNew.isCollapsed) {
                        self.checkNew.toggle();
                    }
                } else {
                    self.query.text = "打开查询";
                }
            },
            list: function (state, success, error) {
                //将按钮设置为查询中
                self.query.loading('loading');
                //如果当前查询状态不是全部类型则将状态作为参数传递到服务器查询
                var params = {};

                if (state !== "all") {
                    params.state = state;
                }

                /**
                 * 从session中获取当前用户跟当前机构
                 */
                params.instid = nptSessionManager.getSession().getInst().id;
                params.userid = nptSessionManager.getSession().getUser().id;

                QueryOrderListRepo.post(params).then( function (response) {
                    self.query.data = response.data;
                    self.query.state = state;
                    self.query.loading('reset');
                    success(response.data);
                }, function (err) {
                    self.query.loading('reset');
                    error(err);
                });
            },
            loading: function (state) {
                $("#all").button(state);
                $("#waitconfirm").button(state);
                $("#inservice").button(state);
                $("#buy").button(state);
            }
        };


        //默认状态为关闭自定义查询
        this.query.toggle();
        //默认状态为启动检查新单据
        this.checkNew.toggle();
    }).factory("QueryOrderListRepo",function(nptRepository) {
        return nptRepository("queryOrderList");
    });
