/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("wservice.form.store.form.inst", ["ui.neptune"])
    .run(function (nptFormStore) {
        nptFormStore.put("inst", {
            options: {},
            fields: [
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '机构名称:',
                        placeholder: "请输入机构名称"
                    }
                },
                {
                    key: 'hostname',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '企业网址:',
                        placeholder: "请输入企业网址"
                    }
                },
                {
                    key: 'tel',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '企业电话:',
                        placeholder: "请输入企业电话"
                    }
                }
            ]
        });
    });