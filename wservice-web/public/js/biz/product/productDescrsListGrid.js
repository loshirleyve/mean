/**
 * Created by leon on 15/11/26.
 */
angular.module("productApp.productDescrsListGrid", [])
    .factory("productDescrsListGrid", function (nptGridStore) {
        return nptGridStore("productDescrsListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'descr', displayName: "标题", width: 150},
                    {field: 'descrvalue', displayName: "内容", width: 700},
                    {field: 'type', displayName: "类型", width: 100,cellFilter: "ctrlCodeFilter:'productdescrtype':'name':'no'"}
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

