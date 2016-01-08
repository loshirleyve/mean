/**
 * Created by Shirley on 2015/11/30.
 */
/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("contractApp.addContractForm", ["ui.neptune","wservice.common"])
    .factory("AddContractForm", function (QueryInstClients, nptFormlyStore, RegExpValidatorFactory, nptSessionManager, QueryFileByUserLevel,QueryImageByUserLevel,UploadSignature, AddOrUpdateFileRepo) {
        return nptFormlyStore("AddContractForm", {
            fields: [
                {
                    key: 'projectid',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        required: true,
                        label: '项目:',
                        valueProp:'id',
                        labelProp:'name',
                        placeholder:'请选择',
                        options:[],
                        repository: QueryInstClients,
                        repositoryParams: {"instid":nptSessionManager.getSession().getInst().id}
                    }
                },
                {
                    key: 'shoppename',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '专柜名称:',
                        placeholder: "请输入专柜名称"
                    }
                },
                {
                    key: 'trademark',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '经营品牌:',
                        placeholder: "请输入经营品牌"
                    }
                },
                {
                    key: 'isbase',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        required: true,
                        label: '是否保底:',
                        valueProp:'id',
                        labelProp:'name',
                        placeholder:'请选择',
                        options:[{
                            id:"0",
                            name:"是"
                            },
                            {
                                id:"1",
                                name:"否"
                            }]
                    }
                },
                {
                    key: 'rent',
                    type: 'numberInput',
                    templateOptions: {
                        required: true,
                        label: '租金:',
                        placeholder: "请输入租金",
                        "min": 0.00,
                        "max": 99999

                    }
                },
                {
                    key: 'baseamount',
                    type: 'numberInput',
                    templateOptions: {
                        required: true,
                        label: '保底金额:',
                        placeholder: "请输入保底金额",
                        "min": 0.00,
                        "max": 99999
                    }
                },
                {
                    key: 'baserate',
                    type: 'maskedPercentInput',
                    templateOptions: {
                        required: true,
                        label: '基本扣率:',
                        placeholder: "请输入基本扣率",
                        percentMask:2
                    }
                },
                {
                    key: 'extralbaserate',
                    type: 'maskedPercentInput',
                    templateOptions: {
                        required: true,
                        label: '超额扣率:',
                        placeholder: "请输入超额扣率",
                        percentMask:2
                    }
                },
                {
                    key: 'slottingfee',
                    type: 'numberInput',
                    templateOptions: {
                        required: true,
                        label: '进场费:',
                        placeholder: "请输入进场费"
                    }
                },
                {
                    key: 'deposit',
                    type: 'numberInput',
                    templateOptions: {
                        required: true,
                        label: '保证金:',
                        placeholder: "请输入保证金"
                    }
                },
                {
                    key: 'other',
                    type: 'numberInput',
                    templateOptions: {
                        required: true,
                        label: '其他费用:',
                        placeholder: "请输入其他费用"
                    }
                },
                {
                    key: 'clause',
                    type: 'textarea',
                    templateOptions: {
                        required: false,
                        label: '补充条款:',
                        placeholder: "请输入补充条款"
                    }
                }
                ,
                {
                    key: 'attachmentsnFiles',
                    type: 'npt-select-file',
                    templateOptions: {
                        required: false,
                        label: '添加文档:',
                        fileRepository: QueryFileByUserLevel,
                        uploadOptions : {
                            getSignature: UploadSignature.query,
                            repository: AddOrUpdateFileRepo,
                            repositoryParams:{"level":"user"}
                        }
                    }
                }
                ,
                {
                    key: 'attachmentsnImages',
                    type: 'npt-select-image',
                    templateOptions: {
                        required: false,
                        label: '添加图片:',
                        imageRepository: QueryImageByUserLevel,
                        uploadOptions : {
                            getSignature: UploadSignature.query,
                            repository: AddOrUpdateFileRepo,
                            repositoryParams:{"level":"user"}
                        }
                    }
                }

            ]
        });
    })
    .factory("QueryInstClients",function(nptRepository){
        return nptRepository("queryInstClients");
    }).factory("QueryFileByUserLevel", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryFile").params({
            "level": "user",
            "instid": nptSessionManager.getSession().getInst().id,
            "filetype":"doc"
        });
    }).factory("QueryImageByUserLevel", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryFile").params({
            "level": "user",
            "instid": nptSessionManager.getSession().getInst().id,
            "filetype":"image"
        });
    });