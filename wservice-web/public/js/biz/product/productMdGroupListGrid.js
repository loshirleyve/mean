/**
 * Created by rxy on 15/11/17.
 */
angular.module("productApp.productMdGroupListGrid", [])
    .factory("productMdGroupListGrid", function (nptGridStore,productForm) {
        return nptGridStore("productMdGroupListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'name', displayName: "分组名称", width: 120},
                    {field: 'sort', displayName: "排序", width: 120}
                ]
            },
            action: {
                edit: {
                    label: "编辑",
                    type: "edit",
                    target:"group"
                },
                del: {
                    label: "删除",
                    type: "del"
                }
            }
        });
    });

