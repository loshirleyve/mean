/**
 * Created by rxy on 15/11/17.
 */
angular.module("productApp.productDescrsListGrid", [])
    .factory("productDescrsListGrid", function (nptGridStore,productDescrsForm) {
        return nptGridStore("productDescrsListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'descr', displayName: "标题", width: 150},
                    {field: 'descrvalue', displayName: "内容", width: 750},
                    {field: 'type', displayName: "类型", width: 100,cellFilter: "ctrlCodeFilter:'productdescrtype':'name':'no'"}
                ]
            },
            action: {
                add: {
                    label: "添加",
                    type: "add",
                    tareget:productDescrsForm
                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    tareget:productDescrsForm
                },
                del: {
                    label: "删除",
                    type: "del"
                }
            }
        });
    });

