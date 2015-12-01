/**
 * Created by rxy on 15/11/17.
 */
angular.module("productApp.productPhaseListGrid", [])
    .factory("productPhaseListGrid", function (nptGridStore,productForm) {
        return nptGridStore("productPhaseListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'name', displayName: "阶段名称", width: 200},
                    {field: 'cyclevalue', displayName: "阶段周期", width: 150},
                    {field: 'duty', displayName: "阶段职责", width:400},
                    {field: 'times', displayName: "办理天数", width: 150},
                    {field: 'processdays', displayName: "服务次数", width: 100}
                ]
            },
            action: {
                add: {
                    label: "添加",
                    type: "add",
                    target:"productPhase"

                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    target:"productPhase"
                },
                del: {
                    label: "删除",
                    type: "del"
                }
            }
        });
    });

