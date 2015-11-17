/**
 * Created by rxy on 15/11/17.
 */

'use strict';
angular.module("wservice.form.store.receivable", ["ui.neptune"])
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
        });
});