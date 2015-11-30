/**
 * Created by leon on 15/11/26.
 */
angular.module("workorderApp.WorkorderCommentGrid", [])
    .factory("WorkorderCommentGrid", function (nptGridStore) {
        return nptGridStore("WorkorderCommentGrid", {
            gridOptions: {
                columnDefs: [
                    {field: 'commenttext', displayName: "评价心得"},
                    {field: 'createdate', displayName: "评论时间"},
                    {field: 'label', displayName: "评论者"}
                ]
            }
        });
    });

