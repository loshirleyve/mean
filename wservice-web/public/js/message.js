/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';
angular.module('wsweb')
.service('message',function(wswebProvider) {
        var divId = wswebProvider.messageDiv||'message_alert';
        this.levelsEnum  = {
            'success':'success',
            'info':'info',
            'warning':'warning',
            'danger':'danger'
        };

        this.alert = function (message,levels) {
            var l = levels||this.levelsEnum['success'];
            var alert = createAlert(message,l);
            var div = $("#"+divId);
            alert.appendTo(div);
            // 居中
            div.css('marginLeft',($(window).width()-div.width())/2);
            // 是否自动消除消息框
            if (wswebProvider.get("autoDismissMessage")) {
                setTimeout(function() {
                    alert.alert('close');
                },wswebProvider.get("dismissMessageTimeout")||3000);
            }
        }

        function createAlert(message,levels) {
            var alert = $("<div " +
                "class='alert alert-"+levels+" alert-dismissible fade in' role='alert'>" +
                "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
                "<span aria-hidden='true'>×</span></button>" +
                message +
                "</div>");
            return alert;
        }

    });