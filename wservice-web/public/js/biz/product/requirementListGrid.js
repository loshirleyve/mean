/**
 * Created by rxy on 15/11/17.
 */
angular.module("productApp.requirementListGrid", [])
    .factory("requirementListGrid", function (nptGridStore) {
        return nptGridStore("requirementListGrid", {
            gridOptions: {
                multiSelect: true,
                enableRowSelection: false,
                enableSelectAll: true,
                columnDefs: [
                    {field: 'attachname', displayName: "资料名称", width: 120},
                    {field: 'inputtype', displayName: "交接类型", width: 100},
                    {field: 'transfertype', displayName: "资料类型", width: 100},
                    {field: 'inputdesc', displayName: "要求描述", width: 100}
                ]
            }
        });
    });

