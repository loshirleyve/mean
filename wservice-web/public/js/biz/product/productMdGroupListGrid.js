/**
 * Created by rxy on 15/11/17.
 */
angular.module("productApp.productMdGroupListGrid", [])
    .factory("productMdGroupListGrid", function (nptGridStore, addGroupForm, editGroupForm,groupService) {
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
                        function (params, $q) {
                           return groupService.addGroup(params,$q);
                        }

                    ]
                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    target: editGroupForm,
                    listens: [
                        function (params, $timeout, $q) {
                            return groupService.addGroup(params,$q);
                        }
                    ]
                },
                del: {
                    label: "删除",
                    type: "del",
                    listens: [
                        function (params,RemoveProductMdGroup) {
                           return  RemoveProductMdGroup.post({groupid: params.item.id});
                        }
                    ]
                }
            },mobile: {
                fields: {
                    title: "name",
                    tip: "sort"
                }
            }
        });
    });

