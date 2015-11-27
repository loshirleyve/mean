/**
 * Created by leon on 15/11/26.
 */
angular.module("workorderApp.WorkorderListGrid", [])
    .factory("WorkorderListGrid", function (nptGridStore) {
        return nptGridStore("WorkorderListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'sn', displayName: "工单号", width: 120},
                    {field: 'name', displayName: "工单名称"},
                    {field: 'assignedid', displayName: "分配人", width: 60, cellFilter: "cacheFilter:'user':'name':'id'"},
                    {field: 'assigneddate', displayName: "分配日期", cellFilter:"timestampFilter"},
                    {field: 'processid', displayName: "处理人", cellFilter: "cacheFilter:'user':'name':'id'"},
                    {field: 'processdate', displayName: "计划开始日期", cellFilter: "timestampFilter"},
                    {field: 'doactiondate', displayName: "实际开始日期", cellFilter: "timestampFilter"},
                    {field: 'expirydate', displayName: "计划完成日期", cellFilter: "timestampFilter"},
                    {field: 'completedate', displayName: "实际完成日期", cellFilter: "timestampFilter"},
                    {field: 'expriyday', displayName: "距离完成期限(天)", cellFilter: "timestampFilter"},
                    {field: 'state', displayName: "工单状态", cellFilter: "ctrlCodeFilter:'workstate':'name':'no'"},
                    {field: 'createdate', displayName: "创建日期", cellFilter: "timestampFilter"},
                ]
            }
        })
    });

