/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("clientApp.clientForm", ["ui.neptune"])
    .factory("ClientForm", function (nptFormlyStore, QueryCtrlCode,
                                     QueryMdInstScale, nptCache, RegExpValidatorFactory, QueryInstClients, nptSessionManager) {
        return nptFormlyStore("ClientForm", {
            fields: [
                {
                    key: 'fullname',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '客户公司名称:',
                        disabled:true
                    }
                },
                {
                    key: 'name',
                    type: 'input',
                    optionsTypes: ['bizValidator'],
                    templateOptions: {
                        required: true,
                        label: '客户公司简称:',
                        placeholder: "请输入客户公司简称",
                        reversal: true,
                        searchProp:"name",
                        repository: QueryInstClients
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^[\u2E80-\u9FFF]+$/i),
                            message: '"客户公司简称必须是汉字！"'
                        }
                    },
                    modelOptions:{ updateOn: 'blur' }
                },
                {
                    key: 'sn',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '编号:',
                        disabled:true
                    }
                },
                {
                    key: 'industry',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
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
                        optionsAttr: "bs-options",
                        required: true,
                        label: '类型:',
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
                        optionsAttr: "bs-options",
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
                        optionsAttr: "bs-options",
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
                        optionsAttr: "bs-options",
                        required: true,
                        label: '规模:',
                        valueProp:'type',
                        labelProp:'name',
                        placeholder:'请选择',
                        options:[],
                        repository: QueryMdInstScale,
                        repositoryParams: {"instid":nptSessionManager.getSession().getInst().id}
                    }
                },
                {
                    key: 'contactman',
                    type: 'input',
                    templateOptions: {
                        label: '联系人:',
                        required:true,
                        disabled:true
                    }
                },
                {
                    key: 'contactphone',
                    type: 'maskedInput',
                    templateOptions: {
                        label: '手机号:',
                        required:true,
                        disabled:true
                    }
                },
                {
                    key: 'contactposition',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
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
                        placeholder:'请输入地区'
                    }
                },
                {
                    key: 'address',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '地址:',
                        placeholder:'请输入地址'
                    }
                },
                {
                    key: 'clientinstid',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        label: '客户机构:',
                        valueProp:'instid',
                        labelProp:'instname',
                        options:[],
                        allowClear:false,
                        disabled:true
                    },
                    expressionProperties:{
                    "templateOptions.options":function($viewValue,$modelValue,scope) {
                        if (scope.to.options && scope.to.options.length > 0) {
                            return scope.to.options;
                        }
                        var data = nptCache.get("inst",$modelValue);
                        if (data) {
                            return [data];
                        }
                    }
                }
                },
                {
                    key: 'clientadminid',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        label: '客户管理员:',
                        valueProp:'id',
                        labelProp:'name',
                        options:[],
                        allowClear:false,
                        disabled:true
                    },
                    expressionProperties: {
                        "templateOptions.options": function ($viewValue, $modelValue, scope) {
                            if (scope.to.options && scope.to.options.length > 0) {
                                return scope.to.options;
                            }
                            var data = nptCache.get("user", $modelValue);
                            if (data) {
                                return [data];
                            }
                        }
                    }
                },
                {
                    key: 'createdate',
                    type: 'dateInput',
                    templateOptions: {
                        required: true,
                        label: '创建时间:',
                        "formateType": "long",
                        disabled:true
                    }
                },
                {
                    key: 'updatedate',
                    type: 'dateInput',
                    templateOptions: {
                        required: true,
                        label: '更新时间:',
                        "formateType": "long",
                        disabled:true
                    }
                },
                {
                    key: 'remark',
                    type: 'textarea',
                    templateOptions: {
                        label: '备注:'
                    }
                }
            ]
        });
    })
    .factory("QueryMdInstScale",function(nptRepository){
        return nptRepository("queryMdInstScale").addResponseInterceptor(function (response) {
            response.data = response.data.bizMdInstScales;
            return response;
        });
    });