/**
 * Created by rxy on 15/12/14.
 */
angular.module("homeApp.homeForm", ["ui.neptune", 'ui.bootstrap'])
    .factory("commentForm", function (nptFormlyStore,QueryUserInfoById) {
        return nptFormlyStore("commentForm", {
            buttons: {
                ok: true,
                reset: false
            },
            actions: [
                {
                    label: "重置",
                    type: "resetProduct"
                }
            ],
            options: {
                formState: {
                    disabled: false
                }
            },
            fields: [
                {
                    key: 'content',
                    type: 'textarea',
                    templateOptions: {
                        label: '评论:',
                        required: true,
                        maxlength: 200
                    }
                },
                {
                    key: 'createby',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        label: '创建人:',
                        disabled: true,
                        valueProp: "id",
                        labelProp: "name",
                        options: [],
                        search: ["userid"],
                        repository: QueryUserInfoById,
                        allowClear: false
                    }
                }
            ]
        });
    }) .factory("commentForm", function (nptFormlyStore,QueryUserInfoById,QueryUserByInst) {
        return nptFormlyStore("commentForm", {
            buttons: {
                ok: true,
                reset: false
            },
            actions: [
                {
                    label: "重置",
                    type: "resetProduct"
                }
            ],
            options: {
                formState: {
                    disabled: false
                }
            },
            fields: [
                {
                    key: 'content',
                    type: 'textarea',
                    templateOptions: {
                        label: '转发内容:',
                        required: true,
                        maxlength: 200
                    }
                },
                {
                    key: 'users',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: 'bs-options',
                        label: '转发给:',
                        required: true,
                        valueProp: 'id',
                        labelProp: 'name',
                        placeholder: '请选择',
                        options: [],
                        multiple:true,
                        repository: QueryUserByInst
                    }
                },
                {
                    key: 'createby',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        label: '创建人:',
                        disabled: true,
                        valueProp: "id",
                        labelProp: "name",
                        options: [],
                        search: ["userid"],
                        repository: QueryUserInfoById,
                        allowClear: false
                    }
                }
            ]
        });
    });