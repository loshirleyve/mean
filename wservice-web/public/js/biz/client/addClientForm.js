/**
 * Created by Shirley on 2015/11/30.
 */
/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("clientApp.addClientForm", ["ui.neptune"])
    .factory("AddClientForm", function (nptFormlyStore, QueryCtrlCode, QueryMdInstScale) {
        return nptFormlyStore("AddClientForm", {
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
                        disabled:true,
                        required: true,
                        label: '编号:',
                        minlength: 4,
                        maxlength: 8,
                        placeholder: "请输入4至8位客户编号"
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
                        label: '联系人:'
                    }
                },
                {
                    key: 'contactphone',
                    type: 'maskedInput',
                    templateOptions: {
                        required: true,
                        label: '手机号:',
                        "mask":"999 9999 9999"
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