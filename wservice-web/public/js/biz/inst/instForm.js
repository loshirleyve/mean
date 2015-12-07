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
                    }
                },
                {
                    key: 'homepath',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '机构网址:'
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
    .factory("instSearchForm", function (nptFormlyStore) {
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
    });