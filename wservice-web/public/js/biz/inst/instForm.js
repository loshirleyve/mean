/**
 * Created by rxy on 15/12/3.
 */

angular.module("instApp.instForm", ["ui.neptune"])
    .factory("editInstForm", function (nptFormlyStore,QueryImageByMaterialLevel,RegExpValidatorFactory) {
        return nptFormlyStore("editInstForm", {
            options: {
                formState:{
                    disabled:true
                }
            },
            fields: [
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '机构全称:'
                    }
                },
                {
                    key: 'logo',
                    type: 'npt-select-image',
                    templateOptions: {
                        label: '机构logo:',
                        required: true,
                        single: true,
                        imageRepository: QueryImageByMaterialLevel
                    }
                },
                {
                    key: 'simplename',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '机构简称:'
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/),
                            message: '"机构简称不可以有特殊字符！"'
                        }
                    }
                },
                {
                    key: 'homepath',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '机构网址:'
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/[a-zA-z]+:\/\/[^\s]*/),
                            message: '"机构网址必须为网址链接！"'
                        }
                    }
                },
                {
                    key: 'tel',
                    type: 'maskedInput',
                    templateOptions: {
                        required: true,
                        label: '机构电话:',
                        mask:"999 9999 9999"
                    }
                }
            ],
            buttons: {
                ok: false,
                reset: false
            },
            onSubmitListens: [
                function (model, $timeout, $q) {
                    var deferd = $q.defer();

                    $timeout(function () {
                        deferd.resolve();
                    }, 1000);

                    return deferd.promise;
                }
            ]
        });
    })
    .factory("instSearchForm", function (nptFormlyStore,RegExpValidatorFactory) {
        return nptFormlyStore("instSearchForm", {
            options: {

            },
            fields: [
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        label: '机构名称:',
                        placeholder: "请输入机构名称"
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/),
                            message: '"机构名称不可以有特殊字符！"'
                        }
                    },
                    modelOptions:{ updateOn: 'blur' }
                }
            ],
            buttons: {
                ok: false,
                reset: false
            },
            onSubmitListens: [
                function (model, $timeout, $q) {
                    var deferd = $q.defer();

                    $timeout(function () {
                        deferd.resolve();
                    }, 1000);

                    return deferd.promise;
                }
            ]
        });
    });