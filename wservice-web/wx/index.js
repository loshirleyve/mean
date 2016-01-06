/**
 * Created by leon on 15/12/18.
 */

var wxApi = require("y9-wx-api");
var debug = require("debug")("y9-wservice-wx-gateway")
var proxy = require("../proxy");
module.exports = function (app) {

    var BASE_URL = "http://www.yun9.com";

    var config = {
        token: 'Sybase12',
        appid: 'wx3f12d479b0082446',
        encodingAESKey: 'oBUm0JaR3RcM5GcZX2V5NqQwZ5G0T31JMzAiLi9260X'
    };


    //接入验证,Api中已经包括了验证
    app.use("/wx/gateway", wxApi(config, function (req, res, next) {
        var message = req.weixin;
        var content = message.Content || message.EventKey;
        var openID = message.OpenID;

        if (content == "登录") {
            res.reply("请点击<a href='http://www.yun9.com/auth/loginByWeixinClient'>这里</a>进行登录");
        } else if (!content) {
            res.reply("");
        } else if (req.wxsession.menus) {
            res.reply(selectMenus(content, req.wxsession.menus));
        } else {
            queryWxUser(openID, res, function (menus) {
                req.wxsession.menus = buildMenusAsStruct(menus);
                res.reply(selectMenus(content, req.wxsession.menus));
            });
        }
    }));

    // 将菜单项转为文本
    function toDescription(menus) {
        var str = "";
        for (var i = 0; i < menus.length; i++) {
            str += "点击<a href='" + BASE_URL + menus[i].actionvalue + "'>这里</a>查看[" + menus[i].name + "]";
            if (i != menus.length - 1) {
                str += "\n\n";
            }
        }
        return str;
    }


    // 查询用户机构的菜单信息
    function queryMenus(userInfo, res, done) {
        proxy.post("QueryInstRoleNaviByUseridAndInstidAndDevice")
            .params({
                instid: userInfo.currinstid,
                userid: currinstid.id,
                device: "web"
            }).launch(function (response) {
                done(response.body.data);
            }, function (error) {
                debug(error.message);
                res.reply("无法获取当前用户的菜单信息，请稍后重试。");
            });
    }

    // 根据openId查询微信用户信息
    function queryWxUser(openID, res, done) {
        //通过openid查找用户信息,如果找不到用户信息,则抛出异常,需要用户绑定微信.
        proxy.post("QueryUserByWxInfo")
            .params({openid: openID})
            .launch(function (response) {
                var userInfo = response.body.data;
                if (userInfo) {
                    if (!userInfo.currinstid) {
                        res.reply("请点击<a href='http://www.yun9.com/inst/select'>这里</a>选择机构");
                    } else {
                        queryMenus(userInfo, res, done);
                    }
                } else {
                    res.reply("请点击<a href='http://www.yun9.com/auth/loginByWeixinClient'>这里</a>进行登录");
                }
            }, function (error) {
                debug(error.message);
                res.reply("查询微信用户出现错误，请稍后重试。");
            });
    }

    // 重新组织菜单列表
    function buildMenusAsStruct(menus) {
        var nMenus = {};
        for (var i = 0; i < menus.length; i++) {
            nMenus[menus[i].name] = menus.children;
        }
        return nMenus;
    }

    // 选择菜单
    function selectMenus(content, menus) {
        var sMenus = "";
        if (content == "功能") {
            for (var key in menus) {
                sMenus += toDescription(menus[key]);
            }
        } else if (menus[content]) {
            sMenus += toDescription(menus[content]);
        }
        return sMenus;
    }
};