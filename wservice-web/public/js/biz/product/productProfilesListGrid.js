/**
 * Created by leon on 15/11/26.
 */
angular.module("productApp.productProfilesListGrid", [])
    .factory("productProfilesListGrid", function (nptGridStore) {
        return nptGridStore("productProfilesListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'synopsis', displayName: "内容描述", width: 600},
                    {field: 'sort', displayName: "排序", width: 100}
                ]
            },
            action: {
                view: {
                    label: "查看",
                    type: "view"
                },
                add: {
                    label: "添加",
                    type: "add"
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

