/**
 * Created by rxy on 15/12/3.
 */

angular.module("instApp.instForm", ["ui.neptune","wservice.common"])
    .factory("editInstForm", function (nptFormlyStore,QueryImageByMaterialLevel,RegExpValidatorFactory,UploadSignature, AddOrUpdateFileRepo) {
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
                        imageRepository: QueryImageByMaterialLevel,
                        uploadOptions : {
                            getSignature: UploadSignature.query,
                            repository: AddOrUpdateFileRepo,
                            repositoryParams:{"level":"material"}
                        }
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