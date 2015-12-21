/**
 * Created by leon on 15/12/21.
 */

angular.module("BindWxApp.wxForm", ["ui.neptune", 'ui.bootstrap'])
    .factory("wxForm", function (nptFormlyStore) {
        return nptFormlyStore("wxForm", {
            buttons: {
                ok: true,
                reset: false
            },
            options: {
                formState: {
                    disabled: false
                }
            },
            fields: [
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        label: '用户名:',
                        required: true,
                        maxlength: 25
                    }
                },
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        label: '密码:',
                        required: true,
                        maxlength: 25
                    }
                }
            ]
        });
    });