/**
 * Created by Shirley on 15/11/27.
 */
angular.module("clientApp.ClientListGrid", [])
    .factory("ClientListGrid", function (nptGridStore) {
        return nptGridStore("ClientListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'sn', displayName: "客户编号", width: 85},
                    {field: 'name', displayName: "公司简称", width: 85},
                    {field: 'fullname', displayName: "公司全称", width: 85},
                    {field: 'type', displayName: "类型", width: 80},
                    {field: 'industry', displayName: "行业", width: 100},
                    {field: 'scaleid', displayName: "公司规模", width: 85},
                    {field: 'source', displayName: "来源", width: 120},
                    {field: 'region', displayName: "区域", width: 80},
                    {field: 'address', displayName: "客户地址", width: 85},
                    {field: 'contactman', displayName: "联系人名", width: 85},
                    {field: 'contactphone', displayName: "联系电话", width: 120},
                    {field: 'contactposition', displayName: "职位", width: 85},
                    {field: 'level', displayName: "客户等级", width: 85}
                ]
            },
            action: {
                view: {
                    label: "查看",
                    type: "view"
                },
                add: {
                    label: "添加",
                    type: "add",
                    target: "AddClientForm",
                    listens: [function ($q, $timeout) {
                        var deferd = $q.defer();
                        console.info("添加方法,在Store中配置");

                        $timeout(function () {
                            deferd.resolve();
                            console.info("添加方法,在配置中执行完成");
                        }, 1000);

                        return deferd.promise;
                    }, function (params, $timeout, $q) {
                        var deferd = $q.defer();
                        console.info("开始调用后台添加服务.");

                        $timeout(function () {
                            if (params.index === 0) {
                                deferd.reject("不能在第一行上添加.");
                            } else {
                                console.info("后台调用更成功.controller");
                                deferd.resolve("添加成功");
                            }
                        }, 500);

                        return deferd.promise;
                    }, function (params) {
                        console.info("添加的第二个方法!");
                    }]
                },
                del: {
                    label: "删除",
                    type: "del"
                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    target: "client",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            console.info("开始执行后台更新服务.");
                            $timeout(function () {
                                if (params.index === 0) {
                                    deferd.reject("不能编辑第一行");
                                } else {
                                    deferd.resolve("执行成功!");
                                    params.data.demo = "测试添加一行数据";
                                    params.data.sn = "测试修改订单号";
                                }
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                }
            }
        })
    });

