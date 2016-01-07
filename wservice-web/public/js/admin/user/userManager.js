/**
 * Created by rxy on 16/1/7.
 */
angular.module("userManagerApp", ["ui.neptune",
    "userManagerApp.userListGrid",
    "wservice.common",
    "ngRoute",
    "ui-notification"])
    .config(function ($routeProvider) {
        //注册产品路由
        $routeProvider
            .when("/list", {
                controller: "userListController as vm",
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

    }).factory("QueryCities", function (nptRepository) {
        return nptRepository("queryCities").params({});
    }).factory("QueryMdProductGroup", function (nptRepository) {
        return nptRepository("QueryMdProductGroupBylocation").params({});
    })
    .controller("userListController", function (userListGrid) {
        var vm = this;

        vm.userListGridOptions = {
            store: userListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.nptGridApi = nptGridApi;
            }
        };

        vm.users=[{name: "权志龙",sex: "男",tel: "1369101459",occupation: "歌手，制作人",hobby: "唱歌，作词作曲",address: "韩国首尔"},
                  {name: "东永裴",sex: "男",tel: "424171203",occupation: "歌手",hobby: "唱歌，跳舞",address: "韩国首尔"},
                  {name: "崔胜贤",sex: "男",tel: "1690107228",occupation: "歌手，rap",hobby: "唱歌，收藏艺术品",address: "韩国首尔"},
                  {name: "姜大声",sex: "男",tel: "520711973",occupation: "歌手",hobby: "唱歌",address: "韩国首尔"},
                  {name: "李胜贤",sex: "男",tel: "6732917301",occupation: "歌手",hobby: "唱歌，看书",address: "韩国首尔"}]


    });