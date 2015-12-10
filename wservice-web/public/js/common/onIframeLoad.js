/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

$(function () {
    $(window).load(function () {
        window.parent.$.AdminLTE.layout.fix();
        var frameHeight = $('.content-wrapper', window.parent.document).height();
        $("#contentIFrame", window.parent.document).height(frameHeight);
        $('.content-wrapper', window.parent.document).height(frameHeight);
    });
});
