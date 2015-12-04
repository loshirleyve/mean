/**
 * Created by rxy on 15/12/3.
 */

angular.module("instApp.instListGrid", [])
    .factory("instListGrid", function (nptGridStore) {
        return nptGridStore("instListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'name', displayName: "机构名称", width: 300},
                    {field: 'homepath', displayName: "企业网址", width: 200},
                    {field: 'tel', displayName: "企业电话", width: 200}
                ]
            },
            action: {
                view: {
                    label: "编辑",
                    type: "view",
                    listens: [
                        function ($location, params) {
                            if (params.item && params.item.length > 0) {
                                var id = params.item[0].id;
                                $location.path("/detail/" + id);
                            }
                        }
                    ]
                }
            }
        });
    });

