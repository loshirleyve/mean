/**
 * Created by rxy on 15/11/17.
 */

angular.module("productApp.productForm", ["ui.neptune"])
    .factory("productForm", function (nptFormlyStore, QueryCtrlCode) {
        return nptFormlyStore("productForm", {
            options: {
                formState: {
                    disabled: true
                }

            },
            fields: [
                {
                    key: 'imgid',
                    type: 'input',
                    templateOptions: {
                        label: '产品logo:',
                        disabled: true
                    }
                },
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        label: '产品名称:'
                    }
                },
                {
                    key: 'saleprice',
                    type: 'input',
                    templateOptions: {
                        label: '产品价格:'
                    }
                },
                {
                    key: 'type',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        label: '产品类型:',
                        valueProp: 'no',
                        labelProp: 'name',
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "producttypecode"},
                        options: [],
                        allowClear: false
                    }
                },
                {
                    key: 'introduce',
                    type: 'input',
                    templateOptions: {
                        label: '服务详情:'
                    }
                },
                {
                    key: 'introduceurl',
                    type: 'input',
                    templateOptions: {
                        label: '详情链接:'
                    }
                }
            ],
            buttons: {
                ok: false,
                reset: false
            }
        });
    }).factory("groupForm", function (nptFormlyStore) {
        return nptFormlyStore("groupForm", {
            options: {
                formState: {
                    disabled: true
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
                },
                {
                    key: 'sort',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '排序:',
                        placeholder: "请输入排序"
                    }
                }
            ],
            buttons: {
                ok: false,
                reset: false
            }
        });
    })
    .factory("addGroupForm", function (nptFormlyStore) {
        return nptFormlyStore("addGroupForm", {
            options: {
                formState: {
                    disabled: true
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
    }).factory("productPhaseForm", function (nptFormlyStore, QueryCtrlCode) {
        return nptFormlyStore("productPhaseForm", {
            options: {
                formState: {
                    disabled: true
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
                        label: '服务类型:',
                        required: true,
                        valueProp: 'no',
                        labelProp: 'name',
                        placeholder: '请选择',
                        options: [],
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "cycle"},
                        search:['name']
                    }
                },
                {
                    key: 'processdays',
                    type: 'input',
                    templateOptions: {
                        label: '自购买日几天起:'
                    }
                },
                {
                    key: 'cyclevalue',
                    type: 'input',
                    templateOptions: {
                        label: '服务次数:'
                    }
                },
                {
                    key: 'times',
                    type: 'input',
                    templateOptions: {
                        label: '办理天数:'
                    }
                },
                {
                    key: 'sortno',
                    type: 'input',
                    templateOptions: {
                        label: '排序:'
                    }
                },
                {
                    key: 'remark',
                    type: 'input',
                    templateOptions: {
                        label: '阶段说明:'
                    }
                }
            ],
            buttons: {
                ok: false,
                reset: false
            }
        });
    })
    .factory("productRequirementForm", function (nptFormlyStore) {
        return nptFormlyStore("productRequirementForm", {
            options: {
                formState: {
                    disabled: true
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
                    type: 'input',
                    templateOptions: {
                        label: '排序:'
                    }
                }
            ],
            buttons: {
                ok: false,
                reset: false
            }
        });
    }).factory("productProfilesForm", function (nptFormlyStore) {
        return nptFormlyStore("productProfilesForm", {
            options: {
                formState: {
                    disabled: true
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
                    type: 'input',
                    templateOptions: {
                        label: '排序:'
                    }
                }
            ],
            buttons: {
                ok: false,
                reset: false
            }
        });
    }).factory("productGroupForm", function (nptFormlyStore, QueryCtrlCode, QueryImageByUserLevel) {
        return nptFormlyStore("productGroupForm", {
            options: {
                formState: {
                    disabled: true
                }

            },
            fields: [
                {
                    key: 'backgorundimgid',
                    type: 'npt-select-image',
                    templateOptions: {
                        label: "选择logo",
                        imageRepository: QueryImageByUserLevel
                    }
                },
                {
                    key: 'groupid',
                    type: 'input',
                    templateOptions: {
                        label: '分组名称:'
                    }
                },
                {
                    key: 'top',
                    type: 'input',
                    templateOptions: {
                        label: '是否置顶:'
                    }
                },
                {
                    key: 'sort',
                    type: 'input',
                    templateOptions: {
                        label: '排序:'
                    }
                }

            ],
            buttons: {
                ok: false,
                reset: false
            }
        });
    }).factory("productClassifiesForm", function (nptFormlyStore, QueryCtrlCode, QueryImageByUserLevel, QueryProductPhases) {
        return nptFormlyStore("productClassifiesForm", {
            options: {
                formState: {
                    disabled: true
                }

            },
            fields: [
                {
                    key: 'cityid',
                    type: 'input',
                    templateOptions: {
                        label: '选择分类地域:'
                    }
                },
                {
                    key: 'classifyname',
                    type: 'input',
                    templateOptions: {
                        label: '分类名称:'
                    }
                },
                {
                    key: 'classifyno',
                    type: 'input',
                    templateOptions: {
                        label: '分类编号:'
                    }
                },
                {
                    key: 'price',
                    type: 'input',
                    templateOptions: {
                        label: '价格:'
                    }
                },
                {
                    key: 'sort',
                    type: 'input',
                    templateOptions: {
                        label: '排序:'
                    }
                },
                {
                    key: 'phaseid',
                    type: 'ui-select',
                    templateOptions: {
                        label: '服务阶段:',
                        required: true,
                        valueProp: 'id',
                        labelProp: 'name',
                        placeholder: '请选择',
                        options: [],
                        repository: QueryProductPhases,
                        repositoryParams: {"productid": "10000001519207"},
                        search:['name']
                    }
                }
            ],
            buttons: {
                ok: false,
                reset: false
            }
        });
    }).factory("productDescrsForm", function (nptFormlyStore, QueryCtrlCode) {
        return nptFormlyStore("productDescrsForm", {
            options: {
                formState: {
                    disabled: true
                }

            },
            fields: [
                {
                    key: 'descr',
                    type: 'input',
                    templateOptions: {
                        label: '标题:'
                    }
                },
                {
                    key: 'type',
                    type: 'ui-select',
                    templateOptions: {
                        label: '类型:',
                        required: true,
                        valueProp: 'id',
                        labelProp: 'name',
                        placeholder: '请选择',
                        options: [],
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "productdescrtype"},
                        search:['name']
                    }
                },
                {
                    key: 'descrvalue',
                    type: 'input',
                    templateOptions: {
                        label: '内容:'
                    }
                }
            ],
            buttons: {
                ok: false,
                reset: false
            }
        });
    });

