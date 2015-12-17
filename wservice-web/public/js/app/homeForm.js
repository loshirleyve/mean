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
                    type: "reset"
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
                        label: '评论人:',
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
    }).factory("shareForm", function (nptFormlyStore,QueryUserInfoById,OrgListBySelectTree,UserListBySelectTree) {
        return nptFormlyStore("shareForm", {
            buttons: {
                ok: true,
                reset: false
            },
            actions: [
                {
                    label: "重置",
                    type: "reset"
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
                    key: 'touserid',
                    type: 'npt-select-tree-single',
                    templateOptions: {
                        label: '转发给:',
                        required: true,
                        viewvalueQueryProp: "userid",
                        treeRepository: OrgListBySelectTree,
                        listRepository: UserListBySelectTree,
                        viewvalueRepository: QueryUserInfoById
                    }
                },
                {
                    key: 'createby',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        label: '转发人:',
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
    }).factory("messageForm", function (nptFormlyStore,QueryUserInfoById,OrgListBySelectTree,UserListBySelectTree,QueryImageByMaterialLevel,QueryTopics) {
        return nptFormlyStore("messageForm", {
            buttons: {
                ok: true,
                reset: false
            },
            actions: [
                {
                    label: "重置",
                    type: "reset"
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
                        label: '消息内容:',
                        required: true,
                        maxlength: 200
                    }
                },
                {
                    key: 'topic',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: 'bs-options',
                        label: '消息话题:',
                        required: true,
                        valueProp: 'id',
                        labelProp: 'name',
                        placeholder: '请选择',
                        options: [],
                        repository: QueryTopics
                    }
                },
                {
                    key: 'touserid',
                    type: 'npt-select-tree-single',
                    templateOptions: {
                        label: '消息权限:',
                        required: true,
                        viewvalueQueryProp: "userid",
                        treeRepository: OrgListBySelectTree,
                        listRepository: UserListBySelectTree,
                        viewvalueRepository: QueryUserInfoById
                    }
                },
                {
                    key: 'attachments',
                    type: 'npt-select-image',
                    templateOptions: {
                        label: '选择图片:',
                        required: true,
                        single: false,
                        imageRepository: QueryImageByMaterialLevel
                    }
                },
                {
                    key: 'createby',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        label: '消息发送人:',
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