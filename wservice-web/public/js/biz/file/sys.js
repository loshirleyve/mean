/**
 * Created by leon on 15/12/1.
 */


angular.module("sysFileApp", [
    "ui.neptune",
    "ngRoute",
    "ui-notification",
    "wservice.common"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/list", {
                controller: "SysFileListController as vm",
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
            level: "system"
        });
    })
    .controller("SysFileListController", function (QueryFile, Notification, UploadSignature, AddOrUpdateFileRepo) {
        var vm = this;

        //默认显示image
        vm.fileType = "image";
        vm.queryFile = QueryFile;

        vm.uploadOptions = {
            uploadImage: false,
            uploadDoc: false,
            getSignature: UploadSignature.query,
            repository: AddOrUpdateFileRepo,
            repositoryParams:{"level":"system"},
            onRegisterApi: function (api) {
                vm.uploadApi = api;
            }
        };

        // 上传文件
        vm.upload = function () {
            var promise;
            if (vm.fileType == "image") {
                promise = vm.uploadApi.uploadImage();
            } else {
                promise = vm.uploadApi.uploadDoc("上传文件",{fileExtensions:"js,css"});
            }
            promise.then(function (datas) {
                vm.query(vm.fileType);
            });
        };

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