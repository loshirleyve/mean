/**
 * Created by rxy on 15/11/17.
 */
angular.module("productApp.productRequirementListGrid", [])
    .factory("productRequirementListGrid", function (nptGridStore,productRequirementForm) {
        return nptGridStore("productRequirementListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'attachname', displayName: "资料名称", width: 120},
                    {field: 'inputtype', displayName: "交接类型", width: 100},
                    {field: 'transfertype', displayName: "资料类型", width: 100},
                    {field: 'inputdesc', displayName: "要求描述", width: 100}
                ]
            },
            action: {
                add: {
                    label: "添加",
                    type: "add",
                    target:productRequirementForm,
                    listens:[]
                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    target:productRequirementForm,
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                },
                del: {
                    label: "删除",
                    type: "del"
                }
            }
        });
    });

