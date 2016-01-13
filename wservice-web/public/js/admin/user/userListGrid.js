/**
 * Created by rxy on 16/1/7.
 */
angular.module("userManagerApp.userListGrid", [])
    .factory("userListGrid", function (nptGridStore) {
        return nptGridStore("userListGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'name', displayName: "名称", width: 120},
                    {field: 'sex', displayName: "性别", width: 120},
                    {field: 'tel', displayName: "电话", width: 120},
                    {field: 'occupation', displayName: "职业", width: 120},
                    {field: 'hobby', displayName: "爱好", width: 120},
                    {field: 'address', displayName: "住址", width: 120}
                ]
            },
            action: {
                view: {
                    label: "查看",
                    type: "view",
                    listens: [
                        function ($location, params) {
                            $location.path("/detail/1");
                        }
                    ]
                }
            }
        });
    });

