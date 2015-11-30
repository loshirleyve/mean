
/**
 * Created by rxy on 15/11/17.
 */
angular.module("receivableApp.receivableForm", ["ui.neptune"])
    .factory("receivableForm", function (nptFormlyStore) {
        return nptFormlyStore("receivableForm", {
            options: {
                formState: {
                    disabled: true
                }

            },
            fields: [
                {
                    key: 'id',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '收款id:',
                        placeholder: "请输入分组名称"
                    }
                },
                {
                    key: 'businessKey',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '业务内容:',
                        placeholder: "请输入排序"
                    }
                },
                {
                    key: 'paymodeName',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '付款方式:',
                        placeholder: "请输入排序"
                    }
                },
                {
                    key: 'amount',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '应收金额:',
                        placeholder: "请输入排序"
                    }
                },
                {
                    key: 'payamount',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '已收金额:',
                        placeholder: "请输入排序"
                    }
                },
                {
                    key: 'unPayamount',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '代收金额:',
                        placeholder: "请输入排序"
                    }
                }
            ],
            buttons: {
                ok: false,
                reset: false
            }
        });
    });