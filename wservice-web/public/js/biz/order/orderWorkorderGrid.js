/**
 * Created by leon on 15/11/26.
 */

angular.module("orderApp.OrderWorkorderGrid", [])
    .factory("OrderWorkorderGrid", function (nptGridStore) {
        return nptGridStore("OrderWorkorderGrid", {
            gridOptions: {
                paginationPageSizes: [],
                paginationPageSize: 0,
                columnDefs: [
                    {field: 'descr', displayName: "工单内容", width: 150},
                    {field: 'assignedInfo', displayName: "分配信息", width: 300},
                    {field: 'allNum', displayName: "任务总数", width: 80},
                    {field: 'completeNum', displayName: "已完成数", width: 80},
                    {field: 'inserviceName', displayName: "完成状态", width: 80},

                ]
            }
        });
    });