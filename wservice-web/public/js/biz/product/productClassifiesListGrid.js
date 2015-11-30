/**
 * Created by rxy on 15/11/17.
 */
angular.module("productApp.productClassifiesListGrid", [])
    .factory("productClassifiesListGrid", function (nptGridStore,productForm) {
        return nptGridStore("productClassifiesListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'classifyname', displayName: "分类名称", width: 150},
                    {field: 'classifyno', displayName: "分类编号", width: 150},
                    {field: 'price', displayName: "价格", width: 100,cellFilter: "number"},
                    {field: 'phasename', displayName: "所属服务阶段", width: 200},
                    {field: 'sort', displayName: "排序", width: 100}
                ]
            },
            action: {
                add: {
                    label: "添加",
                    type: "add",
                    target:"productClassifies"
                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    target:"productClassifies"
                },
                del: {
                    label: "删除",
                    type: "del"
                }
            }
        });
    });

