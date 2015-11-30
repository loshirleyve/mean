/**
 * Created by leon on 15/11/26.
 */
angular.module("productApp.productPhaseListGrid", [])
    .factory("productPhaseListGrid", function (nptGridStore,ProductForm) {
        return nptGridStore("productPhaseListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'name', displayName: "阶段名称", width: 200},
                    {field: 'cyclevalue', displayName: "阶段周期", width: 150},
                    {field: 'duty', displayName: "阶段职责", width:400},
                    {field: 'times', displayName: "办理天数", width: 150},
                    {field: 'processdays', displayName: "服务次数", width: 100}
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
                    target:"productPhase",
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
                },
                edit: {
                    label: "编辑",
                    type: "edit"
                },
                del: {
                    label: "删除",
                    type: "del"
                }
            }
        })
    });

