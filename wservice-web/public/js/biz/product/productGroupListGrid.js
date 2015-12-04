/**
 * Created by rxy on 15/11/17.
 */
angular.module("productApp.productGroupListGrid", [])
    .factory("productGroupListGrid", function (nptGridStore,productGroupForm) {
        return nptGridStore("productGroupListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'backgorundimgid', displayName: "分组图标", width: 120},
                    {field: 'groupname', displayName: "分组名称", width: 120},
                    {field: 'province', displayName: "省", width: 100},
                    {field: 'city', displayName: "市", width: 150},
                    {field: 'district', displayName: "区", width: 100},
                    {field: 'top', displayName: "是否置顶", width: 100},
                    {field: 'sort', displayName: "排序", width: 100}
                ]
            },
            action: {
                add: {
                    label: "添加",
                    type: "add",
                    target:productGroupForm,
                    listens: []
                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    target:productGroupForm,
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

