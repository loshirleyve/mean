/**
 * Created by rxy on 15/11/11.
 */
'use strict';
angular.module("wservice.form.store.product", ["ui.neptune"])
    .run(function (nptFormStore) {
        nptFormStore.put("group", {
            options: {},
            fields: [
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '分组名称:',
                        placeholder: "请输入分组名称"
                    }
                },
                {
                    key: 'sort',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '排序:',
                        placeholder: "请输入排序"
                    }
                }
            ]
        }).put("demo", {
            fields: [
                {
                    key: 'lastName',
                    type: 'input',
                    templateOptions: {
                        label: 'Last Name'
                    }
                }
            ]
        });
    });