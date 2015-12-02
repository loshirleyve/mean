
/**
 * Created by rxy on 15/11/17.
 */
angular.module("receivableApp.receivableForm", ["ui.neptune"])
    .factory("receivableForm", function (nptFormlyStore) {
        return nptFormlyStore("receivableForm", {
            options: {
//                formState: {
//                    disabled: true
//                }

            },
            fields: [
                {
                    key: 'businessKey',
                    type: 'label',
                    templateOptions: {
                        required: true,
                        label: '购买内容:'
                    }
                },
                {
                    key: 'paymodeName',
                    type: 'label',
                    templateOptions: {
                        required: true,
                        label: '付款方式:'
                    }
                },
                {
                    key: 'amount',
                    type: 'label',
                    templateOptions: {
                        required: true,
                        label: '应收金额:'
                    }
                },
                {
                    key: 'payamount',
                    type: 'label',
                    templateOptions: {
                        required: true,
                        label: '已收金额:'
                    }
                },
                {
                    key: 'amount',
                    type: 'label',
                    templateOptions: {
                        required: true,
                        label: '本次收款金额:'
                    }
                },
                {
                    key: 'remark',
                    type: 'textarea',
                    templateOptions: {
                        required: true,
                        label: '本次收款方式:'
                    }
                },
                {
                    key: 'collectuserid',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '收款人:'
                    }
                },
                {
                    key: '',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '说明:'
                    }
                }
            ],
            buttons: {
                ok: false,
                reset: false
            }
        });
    });