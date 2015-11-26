/**
 * Created by rxy on 15/11/11.
 */

angular.module("wservice.form.store.product", ["ui.neptune","wservice.common"])
    .run(function (nptFormStore,QueryCtrlCode,QueryProductPhases,QueryImageByUserLevel) {
        nptFormStore.put("group", {
            options: {},
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
            ]
        }).put("productPhase", {
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
                        valueProp:'no',
                        labelProp:'name',
                        placeholder:'请选择',
                        options:[],
                        repository:QueryCtrlCode,
                        repositoryParams:{"defno":"producttype"}
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
                }
            ]
        }).put("productProfiles", {
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
            ]
        }).put("productGroup", {
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

            ]
        }).put("productClassifies", {
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
                        valueProp:'id',
                        labelProp:'name',
                        placeholder:'请选择',
                        options:[],
                        repository:QueryProductPhases,
                        repositoryParams:{"productid":"10000001519207"}
                    }
                }
            ]
        }).put("productDescrs", {
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
                        valueProp:'id',
                        labelProp:'name',
                        placeholder:'请选择',
                        options:[],
                        repository:QueryCtrlCode,
                        repositoryParams:{"defno":"productdescrtype"}
                    }
                },
                {
                    key: 'descrvalue',
                    type: 'input',
                    templateOptions: {
                        label: '内容:'
                    }
                }
            ]
        });
    });