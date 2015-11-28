/**
 * Created by rxy on 15/11/17.
 */

angular.module("receivableApp.receivableForm", ["ui.neptune"])
    .run(function (nptFormlyStore) {
        nptFormlyStore.put("group", {
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