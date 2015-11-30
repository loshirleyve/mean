/**
 * Created by leon on 15/11/26.
 */
angular.module("workorderApp.WorkorderAttachmentGrid", [])
    .factory("WorkorderAttachmentGrid", function (nptGridStore) {
        return nptGridStore("WorkorderAttachmentGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'attachname', displayName: "资料名称", width: 130},
                    {field: 'transfertype', displayName: "资料交接类型",width: 200},
                    {field: 'inputtype', displayName: "资料类型"}
                ]
            },
            action: {
                view: {
                    label: "查看",
                    type: "view"
                }
            }
        });
    });

