/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("wservice.form.store.demo", ["ui.neptune", "wservice.common"])
    .run(function (nptFormStore, OrgListBySelectTree,
                   UserListBySelectTree, QueryUserInfoById,
                   QueryCtrlCode, QueryImageByUserLevel,
                   QueryInsts, QueryUserByInst, UploadSignature, AddOrUpdateFileRepo) {
        nptFormStore.put("demo", {
            options: {},
            fields: [
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '名称:',
                        placeholder: "请输入订单名称"
                    }
                },
                {
                    key: 'sales',
                    type: 'npt-select-tree-single',
                    templateOptions: {
                        required: true,
                        label: '销售顾问:',
                        placeholder: "请输入销售顾问",
                        viewvalueQueryProp: "userid",
                        treeRepository: OrgListBySelectTree,
                        listRepository: UserListBySelectTree,
                        viewvalueRepository: QueryUserInfoById
                    }
                },
                {
                    key: 'orderamount',
                    type: 'numberInput',
                    templateOptions: {
                        required: true,
                        label: '请输入订单金额:'
                    }
                },
                {
                    "key": "cycle2",
                    "type": "ui-select",
                    templateOptions: {
                        optionsAttr: 'bs-options',
                        label: '服务周期(指定数据源):',
                        valueProp: 'id',
                        labelProp: 'name',
                        smallLabelProp: "defname",
                        placeholder: '请选择服务周期',
                        required: true,
                        options: [],
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "cycle"}
                    }
                },
                {
                    key: 'createdate',
                    type: 'dateInput',
                    templateOptions: {
                        required: true,
                        label: '创建日期:',
                        placeholder: "请输入创建日期"
                    }
                },
                {
                    key: 'remark',
                    type: 'textarea',
                    templateOptions: {
                        label: '备注:'
                    }
                },
                {
                    "key": "choiceInst",
                    "type": "ui-select",
                    templateOptions: {
                        optionsAttr: 'bs-options',
                        label: '选择机构:',
                        valueProp: 'id',
                        labelProp: 'name',
                        placeholder: '请选择机构',
                        smallLabelProp: "simplename",
                        required: true,
                        options: [],
                        search: ["name"],
                        repository: QueryInsts,
                        repositoryParams: {}
                    }
                },
                {
                    "key": "choiceUser2",
                    "type": "ui-select",
                    templateOptions: {
                        optionsAttr: 'bs-options',
                        label: '选择用户:',
                        valueProp: 'id',
                        labelProp: 'name',
                        placeholder: '请选择用户',
                        required: true,
                        options: [],
                        search: ["name"],
                        repository: QueryUserByInst,
                        repositoryParams: {}
                    }
                },
                {
                    key: 'selectImage',
                    type: 'npt-select-image',
                    templateOptions: {
                        label: "选择图片",
                        imageRepository: QueryImageByUserLevel
                    }
                },
                {
                    key: 'uploaddemo',
                    type: 'npt-formly-upload',
                    templateOptions: {
                        label: '头像',
                        required: true,
                        up: {
                            filters: {
                                mime_types: [
                                    {title: "Image File", extensions: "jpg,gif,png"}
                                ],
                                max_file_size: '100kb'
                            },
                            multi_selection: false
                        },
                        getSignature: UploadSignature.query,
                        repository: AddOrUpdateFileRepo,
                        repositoryParams: {}
                    }
                }
            ]
        });
    });