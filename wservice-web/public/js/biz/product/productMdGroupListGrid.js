/**
 * Created by rxy on 15/11/17.
 */
angular.module("productApp.productMdGroupListGrid", [])
    .factory("productMdGroupListGrid", function (nptGridStore, addGroupForm, editGroupForm) {
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
                    target: addGroupForm,
                    listens: [
                        function (params, $q, $timeout, AddOrUpdateMdProductGroup) {
                            return AddOrUpdateMdProductGroup.post();
                        }
//                        ,
//                        function ($timeout) {
//                            var deferd = $q.defer();
//
//                            $timeout(function () {
//                                deferd.resolve({
//                                    name: "leon"
//                                });
//                            }, 3000);
//
//                            deferd.promise.then(function (response) {
//                                return response;
//                            }, function (error) {
//                                return error;
//                            });
//
//                            return deferd.promise;
//                        }, function () {
//                            return {
//                                test: "def"
//                            }
//                        }
                    ]
                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    target: editGroupForm,
                    listens: [
                        function (params, $timeout, $q) {
//                            var deferd = $q.defer();
//                            $timeout(function () {
//                                ProductQueryService.addGroup(params, $q).then(function () {
//                                    deferd.resolve();
//                                });
//                            }, 500);
//                            return deferd.promise;
                        }
                    ]
                },
                del: {
                    label: "删除",
                    type: "del",
                    listens: [
                        function (params, $timeout, $q) {
                            return RemoveProductMdGroup.post();
                        }
                    ]
                }
            }
        });
    });

