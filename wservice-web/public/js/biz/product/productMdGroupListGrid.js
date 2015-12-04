/**
 * Created by rxy on 15/11/17.
 */
angular.module("productApp.productMdGroupListGrid", [])
    .factory("productMdGroupListGrid", function (nptGridStore,addGroupForm,editGroupForm,ProductQueryService) {
        return nptGridStore("productMdGroupListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'name', displayName: "分组名称", width: 120},
                    {field: 'sort', displayName: "排序", width: 120}
                ]
            },
            action: {
                add: {
                    label: "添加",
                    type: "add",
                    target:addGroupForm,
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                                ProductQueryService.addGroup(params,$q);
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
                    type: "edit",
                    target:editGroupForm,
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                                ProductQueryService.addGroup(params,$q);
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

