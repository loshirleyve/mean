/**
 * Created by Shirley on 2015/11/30.
 */
/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("clientApp.addClientForm", ["ui.neptune"])
    .factory("AddClientForm", function (nptFormlyStore, QueryCtrlCode, QueryMdInstScale, QueryInstClients, RegExpValidatorFactory) {
        return nptFormlyStore("AddClientForm", {
            fields: [
                {
                    key: 'fullname',
                    type: 'input',
                    optionsTypes: ['bizValidator'],
                    templateOptions: {
                        required: true,
                        label: '客户公司名称:',
                        placeholder: "请输入客户公司名称",
                        reversal: true,
                        searchProp:"fullname",
                        repository: QueryInstClients
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^[\u2E80-\u9FFF]+$/i),
                            message: '"客户公司名称必须是汉字!"'
                        }
                    },
                    modelOptions:{ updateOn: 'blur' }
                },
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '客户公司简称:',
                        placeholder: "请输入客户公司简称"
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
                    optionsTypes: ['bizValidator'],
                    templateOptions: {
                        required: true,
                        label: '编号:',
                        placeholder: "请输入4至8位由字母或数字组成的客户编号",
                        reversal: true,
                        searchProp:"sn",
                        repository: QueryInstClients
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^[a-z0-9A-Z]{4,8}$/i),
                            message: '"请输入4至8位由字母或数字组成的客户编号！"'
                        }
                    },
                    modelOptions:{ updateOn: 'blur' }
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
                        repositoryParams: {"instid":"10000001463017"}
                    }
                },
                {
                    key: 'contactman',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '联系人:',
                        placeholder:'请输入联系人，联系人保存后不可更改'
                    }
                },
                {
                    key: 'contactphone',
                    type: 'maskedInput',
                    optionsTypes: ['bizValidator'],
                    templateOptions: {
                        required: true,
                        label: '手机号:',
                        placeholder:'请输入手机号',
                        "mask":"999 9999 9999",
                        reversal: true,
                        searchProp:"contactphone",
                        repository: QueryInstClients
                    },
                    modelOptions:{ updateOn: 'blur' }
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