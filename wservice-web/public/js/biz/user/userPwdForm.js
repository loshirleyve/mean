/**
 * Created by Shirley on 2015/12/8.
 */

angular.module("userApp.userPwdForm", ["ui.neptune"])
    .factory("UserPwdForm", function(nptFormlyStore, RegExpValidatorFactory){
        return nptFormlyStore("UserPwdForm", {
            field:[
                {
                    key:'oldPasswd',
                    type:'password',
                    templateOptions:{
                        required:true,
                        label:'原密码'
                    }
                },
                {
                    key:'newPasswd',
                    type:'password',
                    templateOptions:{
                        required:true,
                        label:'新密码',
                        placeholder: "请输入6至12位由字母或数字组成的新密码"
                    },
                    validators: {
                        format: {
                            expression: RegExpValidatorFactory.createRegExpValidator(/^[a-z0-9A-Z]{6,12}$/i),
                            message: '"请输入6至12位由字母或数字组成的新密码！"'
                        }
                    },
                    modelOptions:{ updateOn: 'blur' }
                },
                {
                    key:'newPasswd2',
                    type:'password',
                    templateOptions:{
                        required:true,
                        label:'确认新密码'
                    },
                    validators: {
                        pwdFormat: {
                            expression: function(viewValue,modelValue,scope) {
                                return viewValue == scope.model.newPasswd;
                            },
                            message: '"再次密码输入不一致！"'
                        }
                    },
                    modelOptions:{ updateOn: 'blur' }
                }
            ]
        });
    });