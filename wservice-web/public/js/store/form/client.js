/**
 * Created by shirley on 15/11/11.
 */

angular.module("wservice.form.store.client", ["ui.neptune","wservice.common"])
    .run(function (nptFormStore,QueryCtrlCode,QueryMdInstScale) {
        nptFormStore.put("client", {
            options: {},
            fields: [
                {
                    key: 'id',
                    type: 'input',
                    templateOptions: {
                        disabled:true,
                        required: true,
                        label: 'ID:'
                    }
                },
                {
                    key: 'fullname',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '名称:',
                        placeholder: "请输入客户名称"
                    }
                },
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '客户简称:',
                        placeholder: "请输入客户简称"
                    }
                },
                {
                    key: 'sn',
                    type: 'input',
                    templateOptions: {
                        disabled:true,
                        required: true,
                        label: '编号:'
                    }
                },
                {
                    key: 'industry',
                    type: 'ui-select',
                    templateOptions: {
                        label:'行业',
                        required: true,
                        valueProp:'no',
                        labelProp:'name',
                        placeholder:'请选择',
                        options:[],
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "clientindustry"}
                    }
                },
                {
                    key: 'type',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '类型:'
                    }
                },
                {
                    key: 'level',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '级别:'
                    }
                },
                {
                    key: 'source',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '来源:'
                    }
                },
                {
                    key: 'scaleid',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '规模:'
                    }
                },
                {
                    key: 'contactman',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '联系人:'
                    }
                },
                {
                    key: 'contactphone',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '电话:'
                    }
                },
                {
                    key: 'contactposition',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '职位:'
                    }
                },
                {
                    key: 'region',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '地区:'
                    }
                },
                {
                    key: 'address',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '地址:'
                    }
                },
                {
                    key: 'clientinstid',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '客户机构:'
                    }
                },
                {
                    key: 'clientadminid',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '客户管理员:'
                    }
                },
                {
                    key: 'createdate',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '创建时间:'
                    }
                },
                {
                    key: 'updatedate',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '更新时间:'
                    }
                },
                {
                    key: 'remark',
                    type: 'input',
                    templateOptions: {
                        label: '备注:'
                    }
                }
            ]
        }).put("addClient", {
            fields: [
                {
                    key: 'fullname',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '名称:',
                        placeholder: "请输入客户名称"
                    }
                },
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '客户简称:',
                        placeholder: "请输入客户简称"
                    }
                },
                {
                    key: 'sn',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '编号:',
                        placeholder: "请输入4至8位客户编号",
                        maxlength:8,
                        minlength:4
                    }
                },
                {
                    key: 'industry',
                    type: 'ui-select',
                    templateOptions: {
                        label:'行业',
                        required: true,
                        valueProp:'no',
                        labelProp:'name',
                        placeholder:'请选择',
                        options:[],
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "clientindustry"}
                    }
                },
                {
                    key: 'type',
                    type: 'ui-select',
                    templateOptions: {
                        label: '类型:',
                        required: true,
                        valueProp:'no',
                        labelProp:'name',
                        placeholder:'请选择',
                        options:[],
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "clienttype"}
                    }
                },
                {
                    key: 'level',
                    type: 'ui-select',
                    templateOptions: {
                        required: true,
                        label: '级别:',
                        valueProp:'no',
                        labelProp:'name',
                        placeholder:'请选择',
                        options:[],
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "clientlevel"}
                    }
                },
                {
                    key: 'source',
                    type: 'ui-select',
                    templateOptions: {
                        required: true,
                        label: '来源:',
                        valueProp:'no',
                        labelProp:'name',
                        placeholder:'请选择',
                        options:[],
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "clientsource"}
                    }
                },
                {
                    key: 'scaleid',
                    type: 'ui-select',
                    templateOptions: {
                        required: true,
                        label: '规模:',
                        valueProp:'type',
                        labelProp:'name',
                        placeholder:'请选择',
                        options:[],
                        repository: QueryMdInstScale,
                        repositoryParams: {"instid":"10000001463017"}
                    },
                    expressionProperties:{
                        "templateOptions.options":function($viewValue,$modelValue,scope) {
                            if (scope.to.options && scope.to.options.length > 0 && angular.isArray(scope.to.options[0].bizMdInstScales)) {
                                scope.to.options =  scope.to.options[0].bizMdInstScales;
                            }
                            return scope.to.options;
                        }
                    }
                },
                {
                    key: 'contactman',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '联系人:',
                        placeholder: "请输入联系人"
                    }
                },
                {
                    key: 'contactphone',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '电话:',
                        placeholder: "请输入电话号码"
                    }
                },
                {
                    key: 'contactposition',
                    type: 'ui-select',
                    templateOptions: {
                        required: true,
                        label: '职位:',
                        valueProp:'no',
                        labelProp:'name',
                        placeholder:'请选择',
                        options:[],
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "contactposition"}
                    }
                },
                {
                    key: 'region',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '地区:',
                        placeholder: "请输入地区"
                    }
                },
                {
                    key: 'address',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '地址:',
                        placeholder: "请输入地址"
                    }
                }
            ]
        });
    }).factory("QueryMdInstScale",function(nptRepository){
        return nptRepository("queryMdInstScale");
    });