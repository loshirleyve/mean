/**
 * Created by leon on 15/11/26.
 */
angular.module("productApp.productGroupListGrid", [])
    .factory("productGroupListGrid", function (nptGridStore) {
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
                view: {
                    label: "查看",
                    type: "view"
                }
            }
        })
    });

