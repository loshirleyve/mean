/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
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
                        disabled:true
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
                        allowClear:false
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
    });