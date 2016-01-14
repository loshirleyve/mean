/**
 * Created by leon on 15/10/22.
 */

angular.module("naviApp", ["ui.neptune"
    ,"wservice.common"
    ,"ngRoute"
    ,"ui-notification"
    ,"naviApp.naviForm"])
    .config(function ($routeProvider) {
        //注册订单路由
        $routeProvider
            .when("/list", {
                controller: "NaviListController as vm",
                templateUrl: "list.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/add/:id", {
                controller: "NaviAddController as vm",
                templateUrl: "add.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .otherwise({
                redirectTo: "/list"
            });

    })
    .factory("QueryMdNavi", function (nptRepository) {
        return nptRepository("QueryMdNavi").params({
        });
    })
    .factory("AddOrUPdateMdNavi", function (nptRepository) {
        return nptRepository("AddOrUPdateMdNavi").params({
        });
    })
    .controller("NaviListController", function ($scope, $http, $location, QueryMdNavi) {
        var vm = this;

        //订单列表数据资源库
        vm.queryMdNavi = QueryMdNavi;

        //数据模型
        vm.navis = [];

        vm.query = function() {
            vm.queryMdNavi.post().then(function(response){
                vm.navis = response.data;
            }, function (error) {
                Notification.error({message: '查询导航数据出现错误,请稍后再试.', delay: 2000});
            })
        };

        vm.query();

        vm.toAddView = function(parentid) {
            $location.path("/add/" + parentid);
        };

    })
    .controller("NaviAddController", function ($scope, $http, $location,$routeParams, NaviForm, AddOrUPdateMdNavi, nptSessionManager, Notification) {
        var vm = this;
        vm.parentid = $routeParams.id;

        vm.addOrUPdateMdNavi = AddOrUPdateMdNavi;

        //表单配置
        vm.addNaviOptions = {
            store: NaviForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        vm.reset = function() {
            vm.navi = {};
        };

        vm.save = function(navi) {
            vm.nptFormApi.form.$commitViewValue();
            if(vm.nptFormApi.form.$invalid){
                var errorText = "";
                angular.forEach(vm.nptFormApi.getErrorMessages(), function(value){
                    errorText = errorText + value + "</br>";
                });
                Notification.error({
                    title:"请输入正确的新增合同信息",
                    message: errorText, delay:2000
                });
            }else{

                if(navi.id) {

                }else {
                    navi.createby = nptSessionManager.getSession().getUser().id;
                    navi.parentid = vm.parentid;
                    vm.addOrUPdateMdNavi.post(navi).then(function() {
                        $location.path("/list");
                    },function(error) {
                        Notification.error({message: '添加导航数据出现错误,请稍后再试.', delay: 2000});
                    })

                }


            }


        };


    });