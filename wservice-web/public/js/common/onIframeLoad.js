/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

$(function () {

    function resizeIframe() {
        if (window && window.parent) {
            window.parent.$.AdminLTE.layout.fix();
            var frameHeight = $('.content-wrapper', window.parent.document).height();
            $("#contentIFrame", window.parent.document).height(frameHeight);
            $('.content-wrapper', window.parent.document).height(frameHeight);
        }
    }

    // 父窗口大小改变时
    $(window.parent).resize(function () {
        resizeIframe();
    });

    // iframe加载完毕时
    $(window).load(function () {
        resizeIframe();
    });
});
