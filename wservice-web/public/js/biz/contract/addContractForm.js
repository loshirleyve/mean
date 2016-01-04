/**
 * Created by Shirley on 2015/11/30.
 */
/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("contractApp.addContractForm", ["ui.neptune"])
    .factory("AddContractForm", function (nptFormlyStore, RegExpValidatorFactory, nptSessionManager) {
        return nptFormlyStore("AddContractForm", {
            fields: [
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
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '基本扣率:',
                        placeholder: "请输入基本扣率(若为1%,输入1)"
                    }
                },
                {
                    key: 'extralbaserate',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '超额扣率:',
                        placeholder: "请输入超额扣率(若为1%,输入1)"
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
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '补充条款:',
                        placeholder: "请输入补充条款"
                    }
                }

            ]
        });
    });