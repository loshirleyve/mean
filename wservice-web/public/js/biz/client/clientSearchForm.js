/**
 * Created by Shirley on 2015/11/30.
 */
/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("clientApp.clientSearchForm", ["ui.neptune"])
    .factory("ClientSearchForm", function (nptFormlyStore, QueryCtrlCode) {
        return nptFormlyStore("ClientSearchForm", {
            fields: [
                {
                    key: 'contactman',
                    type: 'input',
                    templateOptions: {
                        label: '联系人:',
                        placeholder: "请输入联系人"
                    }
                },
                {
                    key: 'contactphone',
                    type: 'maskedInput',
                    templateOptions: {
                        label: '手机号:',
                        placeholder: "请输入手机号",
                        "mask":"999 9999 9999"
                    }
                },
                {
                    key: 'fullname',
                    type: 'input',
                    templateOptions: {
                        label: '名称:',
                        placeholder: "请输入客户名称"
                    }
                },
                {
                    key: 'industry',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        label:'行业',
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
                        label: '来源:',
                        valueProp:'no',
                        labelProp:'name',
                        placeholder:'请选择',
                        options:[],
                        repository: QueryCtrlCode,
                        repositoryParams: {"defno": "clientsource"}
                    }
                }
            ]
        });
    })
    .factory("QueryMdInstScale",function(nptRepository){
        return nptRepository("queryMdInstScale");
    });