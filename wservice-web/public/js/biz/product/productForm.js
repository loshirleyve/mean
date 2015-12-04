/**
 * Created by rxy on 15/11/17.
 */

angular.module("productApp.productForm", ["ui.neptune", 'ui.bootstrap'])
    .factory("productForm", function (nptFormlyStore, QueryCtrlCode, QueryImageByMaterialLevel, QueryUserInfoById) {
        return nptFormlyStore("productForm", {
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
                    key: 'imgid',
                    type: 'npt-select-image',
                    templateOptions: {
                        label: '产品logo:',
                        required: true,
                        single: true,
                        imageRepository: QueryImageByMaterialLevel
                    }
                },
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        label: '产品名称:',
                        required: true
                    }
                },
                {
                    key: 'saleprice',
                    type: 'numberInput',
                    templateOptions: {
                        label: '产品价格:',
                        required: true,
                        max: 9999,
                        min: 0
                    }
                },
                {
                    key: 'type',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        label: '产品类型:',
                        required: true,
                        valueProp: 'no',
                        labelProp: 'name',
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "producttype"},
                        options: [],
                        allowClear: true
                    }
                },
                {
                    key: 'introduce',
                    type: 'textarea',
                    templateOptions: {
                        label: '服务详情:',
                        required: true
                    }
                },
                {
                    key: 'introduceurl',
                    type: 'input',
                    templateOptions: {
                        label: '详情链接:'
                    }
                },
                {
                    key: 'createby',
                    type: 'ui-select',
                    templateOptions: {
                        "optionsAttr": "bs-options",
                        label: '创建人:',
                        disabled: true,
                        "valueProp": "id",
                        "labelProp": "name",
                        "options": [],
                        search: ["userid"],
                        repository: QueryUserInfoById
                    }
                }
            ]
        });
    }).factory("ProductGroupForm", function (nptFormlyStore, QueryImageByMaterialLevel,QueryUserInfoById) {
        return nptFormlyStore("productGroupForm", {
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
                    key: 'backgorundimgid',
                    type: 'npt-select-image',
                    templateOptions: {
                        label: '分组图片:',
                        required: true,
                        single: true,
                        imageRepository: QueryImageByMaterialLevel
                    }
                },
                {
                    key: "groupid",
                    type: "select-product-group",
                    templateOptions: {
                        label: '所属分组:',
                        required: true,
                        labelProp: "groupname"
                    }
                },
                {
                    key: 'top',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: 'bs-options',
                        valueProp:"id",
                        labelProp:"name",
                        label: '是否置顶:',
                        options:[
                            {
                                name:"是",
                                id:'1'
                            },
                            {
                                name:"否",
                                id:'0'
                            }
                        ],
                        allowClear:false
                    },
                    defaultValue:0
                },
                {
                    key: 'sort',
                    type: 'numberInput',
                    templateOptions: {
                        required: true,
                        label: '排序:',
                        placeholder: "请输入排序",
                        min: 0,
                        max: 9999,
                        numberMask: 0
                    }
                },
                {
                    key: 'createby',
                    type: 'ui-select',
                    templateOptions: {
                        "optionsAttr": "bs-options",
                        label: '创建人:',
                        disabled: true,
                        "valueProp": "id",
                        "labelProp": "name",
                        "options": [],
                        search: ["userid"],
                        repository: QueryUserInfoById
                    }
                }
            ]
        });
    })
    .factory("addGroupForm", function (nptFormlyStore) {
        return nptFormlyStore("addGroupForm", {
            options: {
                formState: {
                    disabled: false
                }

            },
            fields: [
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '分组名称:',
                        placeholder: "请输入分组名称"
                    }
                }
            ],
            buttons: {
                ok: false,
                reset: false
            }
        });
    }).factory("ProductPhaseForm", function (nptFormlyStore, QueryCtrlCode,QueryUserInfoById) {
        return nptFormlyStore("productPhaseForm", {
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
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        label: '阶段名称:'
                    }
                },
                {
                    key: 'duty',
                    type: 'input',
                    templateOptions: {
                        label: '阶段职责:'
                    }
                },
                {
                    key: 'cycle',
                    type: 'ui-select',
                    templateOptions: {
                        "optionsAttr": "bs-options",
                        label: '服务类型:',
                        required: true,
                        valueProp: 'no',
                        labelProp: 'name',
                        placeholder: '请选择',
                        options: [],
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "cycle"}
                    }
                },
                {
                    key: 'processdays',
                    type: 'numberInput',
                    templateOptions: {
                        label: '自购买日几天起:',
                        numberMask: 0,
                        max: 99999,
                        min: 0
                    }
                },
                {
                    key: 'cyclevalue',
                    type: 'numberInput',
                    templateOptions: {
                        label: '服务次数:',
                        numberMask: 0,
                        max: 99999,
                        min: 0
                    }
                },
                {
                    key: 'times',
                    type: 'numberInput',
                    templateOptions: {
                        label: '办理天数:',
                        numberMask: 0,
                        max: 99999,
                        min: 0
                    }
                },
                {
                    key: 'sortno',
                    type: 'numberInput',
                    templateOptions: {
                        label: '排序:',
                        numberMask: 0,
                        max: 99999,
                        min: 0
                    }
                },
                {
                    key: 'remark',
                    type: 'input',
                    templateOptions: {
                        label: '阶段说明:'
                    }
                },
                {
                    key: 'createby',
                    type: 'ui-select',
                    templateOptions: {
                        "optionsAttr": "bs-options",
                        label: '创建人:',
                        disabled: true,
                        "valueProp": "id",
                        "labelProp": "name",
                        "options": [],
                        search: ["userid"],
                        repository: QueryUserInfoById
                    }
                }
            ]
        });
    })
    .factory("ProductRequirementForm", function (nptFormlyStore) {
        return nptFormlyStore("productRequirementForm", {
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
                    key: 'synopsis',
                    type: 'textarea',
                    templateOptions: {
                        label: '内容描述:'
                    }
                },
                {
                    key: 'sort',
                    type: 'numberInput',
                    templateOptions: {
                        label: '排序:',
                        numberMask: 0,
                        max: 99999,
                        min: 0
                    }
                }
            ]
        });
    }).factory("ProductProfilesForm", function (nptFormlyStore, QueryUserInfoById) {
        return nptFormlyStore("productProfilesForm", {
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
                    key: 'synopsis',
                    type: 'textarea',
                    templateOptions: {
                        label: '内容描述:'
                    }
                },
                {
                    key: 'sort',
                    type: 'numberInput',
                    templateOptions: {
                        label: '排序:',
                        numberMask: 0,
                        max: 99999,
                        min: 0
                    }
                },
                {
                    key: 'createby',
                    type: 'ui-select',
                    templateOptions: {
                        "optionsAttr": "bs-options",
                        label: '创建人:',
                        disabled: true,
                        "valueProp": "id",
                        "labelProp": "name",
                        "options": [],
                        search: ["userid"],
                        repository: QueryUserInfoById
                    }
                }
            ]
        });
    }).factory("ProductClassifiesForm", function (nptFormlyStore, QueryCtrlCode,QueryUserInfoById) {
        return nptFormlyStore("productClassifiesForm", {
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
                    key: 'classifyname',
                    type: 'input',
                    templateOptions: {
                        label: '分类名称:',
                        required: true
                    }
                },
                {
                    key: 'price',
                    type: 'numberInput',
                    templateOptions: {
                        label: '价格:',
                        required: true,
                        max: 9999,
                        min: 0

                    }
                },
                {
                    key: 'packagetype',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: 'bs-options',
                        label: '套餐类型:',
                        required: true,
                        valueProp: 'no',
                        labelProp: 'name',
                        placeholder: '请选择',
                        options: [],
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "packagetype"}
                    }
                },
                {
                    key: 'sort',
                    type: 'numberInput',
                    templateOptions: {
                        required: true,
                        label: '排序:',
                        numberMask: 0,
                        max: 99999,
                        min: 0
                    }
                }, {
                    key: 'remark',
                    type: 'textarea',
                    templateOptions: {
                        label: '备注:'
                    }
                },
                {
                    key: 'createby',
                    type: 'ui-select',
                    templateOptions: {
                        "optionsAttr": "bs-options",
                        label: '创建人:',
                        disabled: true,
                        "valueProp": "id",
                        "labelProp": "name",
                        "options": [],
                        search: ["userid"],
                        repository: QueryUserInfoById
                    }
                }
            ]
        });
    }).factory("ProductDescrsForm", function (nptFormlyStore, QueryCtrlCode,QueryUserInfoById) {
        return nptFormlyStore("productDescrsForm", {
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
                    key: 'descr',
                    type: 'input',
                    templateOptions: {
                        label: '标题:',
                        required: true
                    }
                },
                {
                    key: 'type',
                    type: 'ui-select',
                    templateOptions: {
                        "optionsAttr": "bs-options",
                        label: '类型:',
                        required: true,
                        valueProp: 'no',
                        labelProp: 'name',
                        placeholder: '请选择',
                        options: [],
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "productdescrtype"}
                    }
                },
                {
                    key: 'descrvalue',
                    type: 'input',
                    templateOptions: {
                        label: '内容:',
                        required: true
                    }
                },
                {
                    key: 'createby',
                    type: 'ui-select',
                    templateOptions: {
                        "optionsAttr": "bs-options",
                        label: '创建人:',
                        disabled: true,
                        "valueProp": "id",
                        "labelProp": "name",
                        "options": [],
                        search: ["userid"],
                        repository: QueryUserInfoById
                    }
                }
            ]
        });
    });

