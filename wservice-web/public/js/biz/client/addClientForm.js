/**
 * Created by Shirley on 2015/11/30.
 */
/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("clientApp.addClientForm", ["ui.neptune"])
    .factory("AddClientForm", function (nptFormlyStore, QueryCtrlCode, QueryMdInstScale, RegExpValidatorFactory) {
        return nptFormlyStore("AddClientForm", {
            fields: [
                {
                    key: 'fullname',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '客户公司名称:',
                        placeholder: "请输入客户公司名称"
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^[\u2E80-\u9FFF]+$/i),
                            message: '$viewValue + " 已被占用或含有非法字符"'
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
                            message: '$viewValue + " 中含有非法字符"'
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
                        placeholder: "请输入4至8位由字母或数字组成的客户编号"
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^[a-z0-9A-Z]{4,8}$/i),
                            message: '$viewValue + " 是无效的编号"'
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
                        placeholder:'请输入联系人'
                    }
                },
                {
                    key: 'contactphone',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '手机号:',
                        placeholder:'请输入手机号'
                    },
                    validators: {
                        phoneForm: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/i),
                            message: '$viewValue + " 是无效的电话号码"'
                        }
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
                    type: 'input',
                    templateOptions: {
                        label: '备注:'
                    }
                }
            ]
        });
    })
    .factory("QueryMdInstScale",function(nptRepository){
        return nptRepository("queryMdInstScale");
    });