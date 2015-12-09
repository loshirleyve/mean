/**
 * Created by rxy on 15/11/17.
 */

angular.module("productApp.productForm", ["ui.neptune", 'ui.bootstrap'])
    .factory("productForm", function (nptFormlyStore, QueryCtrlCode, QueryImageByMaterialLevel, QueryUserInfoById, RegExpValidatorFactory) {
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
                        required: true,
                        maxlength: 25
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/),
                            message: '"产品名称不可以有特殊字符！"'
                        }
                    }
                },
                {
                    key: 'saleprice',
                    type: 'numberInput',
                    templateOptions: {
                        label: '产品价格:',
                        required: true,
                        numberMask: 0,
                        max: 99999,
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
                        required: true,
                        maxlength: 200
                    }
                },
                {
                    key: 'introduceurl',
                    type: 'input',
                    templateOptions: {
                        label: '详情链接:',
                        maxlength: 200
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/[a-zA-z]+:\/\/[^\s]*/),
                            message: '"详情链接必须为网址链接！"'
                        }
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
                        allowClear: true
                    }
                }
            ]
        });
    }).factory("ProductGroupForm", function (nptFormlyStore, QueryImageByMaterialLevel, QueryUserInfoById) {
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
                        valueProp: "id",
                        labelProp: "name",
                        label: '是否置顶:',
                        options: [
                            {
                                name: "是",
                                id: '1'
                            },
                            {
                                name: "否",
                                id: '0'
                            }
                        ],
                        allowClear: false
                    },
                    defaultValue: 0
                },
                {
                    key: 'sort',
                    type: 'numberInput',
                    templateOptions: {
                        required: true,
                        label: '排序:',
                        placeholder: "请输入排序",
                        numberMask: 0,
                        max: 99999,
                        min: 0
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
                        allowClear: true
                    }
                }
            ]
        });
    })
    .factory("productSearchForm", function (nptFormlyStore,RegExpValidatorFactory) {
        return nptFormlyStore("productSearchForm", {
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
                        label: '产品名称:',
                        placeholder: "请输入产品名称",
                        maxlength: 25
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/),
                            message: '"产品名称不可以有特殊字符！"'
                        }
                    }
                }
            ]
        });
    })
    .factory("addGroupForm", function (nptFormlyStore,RegExpValidatorFactory,QueryMdProductGroup) {
        return nptFormlyStore("addGroupForm", {
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
                    optionsTypes: ['bizValidator'],
                    templateOptions: {
                        required: true,
                        label: '分组名称:',
                        placeholder: "请输入分组名称",
                        maxlength: 10,
                        reversal: true,
                        searchProp:"name",
                        repository: QueryMdProductGroup
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/),
                            message: '"分组名称不可以有特殊字符！"'
                        }
                    }
                }
            ]
        });
    })
    .factory("editGroupForm", function (nptFormlyStore,RegExpValidatorFactory) {
        return nptFormlyStore("editGroupForm", {
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
                        required: true,
                        label: '分组名称:',
                        placeholder: "请输入分组名称",
                        maxlength: 10
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/),
                            message: '"分组名称不可以有特殊字符！"'
                        }
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
                }
            ]
        });
    }).factory("ProductPhaseForm", function (nptFormlyStore, QueryCtrlCode, QueryUserInfoById,RegExpValidatorFactory) {
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
                        required: true,
                        label: '阶段名称:',
                        maxlength: 25,
                        validators: {
                            format: {
                                expression: RegExpValidatorFactory.createRegExpValidator(/^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/),
                                message: '"阶段名称不可以有特殊字符！"'
                            }
                        }
                    }
                },
                {
                    key: 'duty',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '阶段职责:',
                        maxlength: 100
                    }
                },
                {
                    key: 'cycle',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
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
                        required: true,
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
                        required: true,
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
                        required: true,
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
                        required: true,
                        label: '排序:',
                        numberMask: 0,
                        max: 99999,
                        min: 0
                    }
                },
                {
                    key: 'remark',
                    type: 'textarea',
                    templateOptions: {
                        label: '阶段说明:',
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
                        allowClear: true
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
                        required: true,
                        label: '内容描述:',
                        maxlength: 200
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
                        allowClear: true
                    }
                }
            ]
        });
    }).factory("ProductClassifiesForm", function (nptFormlyStore, QueryCtrlCode, QueryUserInfoById,QueryProductsGroup,RegExpValidatorFactory) {
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
                        required: true,
                        maxlength: 25
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/),
                            message: '"分类名称不可以有特殊字符！"'
                        }
                    }
                },
                {
                    key: 'price',
                    type: 'numberInput',
                    templateOptions: {
                        label: '价格:',
                        required: true,
                        numberMask: 0,
                        max: 99999,
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
                    key: 'packagecontent',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: 'bs-options',
                        label: '套餐内容:',
                        required: true,
                        valueProp: 'no',
                        labelProp: 'name',
                        placeholder: '请选择',
                        options: [],
                        multiple:true,
                        repository: QueryProductsGroup
                    },
                    hideExpression:"model.packagetype !='packages'"
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
                },
                {
                    key: 'remark',
                    type: 'textarea',
                    templateOptions: {
                        label: '备注:',
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
                        allowClear: true
                    }
                }
            ]
        });
    }).factory("ProductDescrsForm", function (nptFormlyStore, QueryCtrlCode, QueryUserInfoById,RegExpValidatorFactory) {
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
                        required: true,
                        maxlength:25
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/),
                            message: '"标题不可以有特殊字符！"'
                        }
                    }
                },
                {
                    key: 'type',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
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
                    type: 'textarea',
                    templateOptions: {
                        label: '内容:',
                        required: true,
                        maxlength:200
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
                        allowClear: true
                    }
                }
            ]
        });
    });

