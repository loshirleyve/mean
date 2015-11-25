/**
 * Created by rxy on 15/11/17.
 */



angular.module("wservice.dt.store.receivable", ["ui.neptune"]).
    run(function (nptDatatableStore) {
        nptDatatableStore.putDatatable("receivable", {
                header: {
                    businessKey: {
                        label: "业务内容"
                    },
                    amount: {
                        label: "应收金额"
                    },
                    payamount: {
                        label: "已收金额"
                    },
                    complete: {
                        label: "收款状态"
                    },
                    paymodeName: {
                        label: "支付方式"
                    },
                    createdate: {
                        label: "创建日期"
                    },
                    expirydate: {
                        label: "确定日期"
                    }
                },
                action: {
                    view: {
                        label: "查看",
                        type: "none"
                    }
                }
            }
        );
    });
