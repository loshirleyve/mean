/**
 * Created by Shirley on 2015/12/11.
 */

angular.module("joinUsByEmailApp.emailForm", ["ui.neptune"])
    .factory("EmailForm", function(nptFormlyStore, RegExpValidatorFactory){
        return nptFormlyStore("EmailForm", {
            fields:[
                {
                    key: 'email',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        type:"email",
                        label: '电子邮箱:',
                        placeholder: "填写邮箱地址"
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/i),
                            message: '"邮箱格式不正确!"'
                        }
                    },
                    modelOptions:{ updateOn: 'blur' }
                }
            ]
        });
    });