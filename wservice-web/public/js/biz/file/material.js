/**
 * Created by leon on 15/12/1.
 */


angular.module("materialFileApp", [
    "ui.neptune",
    "ngRoute",
    "ui-notification"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/list", {
                controller: "MaterialFileListController as vm",
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
    })
    .factory("QueryFile", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryFile").params({
            instid: nptSessionManager.getSession().getInst().id,
            level: "material"
        });
    })
    .controller("MaterialFileListController", function (QueryFile, Notification) {
        var vm = this;

        //默认显示image
        vm.fileType = "image";
        vm.queryFile = QueryFile;

        //设置编辑状态
        vm.edit = false;
        vm.setEdit = function () {
            vm.edit = !vm.edit;
        };

        //删除
        vm.delete = function (file) {
            console.info("删除", file);
        };

        //切换查询类型
        vm.switch = function (type) {
            vm.fileType = type;
            //查询
            vm.queryFile.data = [];
            vm.query(type);
        };

        //
        vm.query = function (type) {
            vm.queryFile.post({
                filetype: type
            }).then(function (response) {
            }, function (error) {
                Notification.error({
                    message: "查询文件出现错误,请稍后尝试.",
                    delay: 2000
                });
            });
        };

        //查询
        vm.query(vm.fileType);
    });