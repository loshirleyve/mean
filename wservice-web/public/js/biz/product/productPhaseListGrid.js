/**
 * Created by leon on 15/11/26.
 */
angular.module("productApp.productPhaseListGrid", [])
    .factory("productPhaseListGrid", function (nptGridStore) {
        return nptGridStore("productPhaseListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'name', displayName: "阶段名称", width: 120},
                    {field: 'cyclevalue', displayName: "阶段周期", width: 120},
                    {field: 'duty', displayName: "阶段职责", width: 100},
                    {field: 'times', displayName: "办理天数", width: 150},
                    {field: 'processdays', displayName: "服务次数", width: 100}
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

