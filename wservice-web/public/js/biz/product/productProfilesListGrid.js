/**
 * Created by rxy on 15/11/17.
 */
angular.module("productApp.productProfilesListGrid", [])
    .factory("productProfilesListGrid", function (nptGridStore,productProfilesForm) {
        return nptGridStore("productProfilesListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'synopsis', displayName: "内容描述", width: 600},
                    {field: 'sort', displayName: "排序", width: 100}
                ]
            },
            action: {
                add: {
                    label: "添加",
                    type: "add",
                    target:productProfilesForm
                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    target:productProfilesForm
                },
                del: {
                    label: "删除",
                    type: "del"
                }
            }
        });
    });

