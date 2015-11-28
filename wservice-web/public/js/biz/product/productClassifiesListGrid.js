/**
 * Created by leon on 15/11/26.
 */
angular.module("productApp.productClassifiesListGrid", [])
    .factory("productClassifiesListGrid", function (nptGridStore) {
        return nptGridStore("productClassifiesListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'classifyname', displayName: "分类名称", width: 120},
                    {field: 'classifyno', displayName: "分类编号", width: 120},
                    {field: 'price', displayName: "价格", width: 100},
                    {field: 'phasename', displayName: "所属服务阶段", width: 150},
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

