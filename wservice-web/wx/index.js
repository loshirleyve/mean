/**
 * Created by leon on 15/12/18.
 */

var wxApi = require("y9-wx-api");
var debug = require("debug")("y9-wservice-wx-gateway")
module.exports = function (app) {

    var BASE_URL = "http://www.yun9.com/biz/";

    var config = {
        token: 'Sybase12',
        appid: 'wx3f12d479b0082446',
        encodingAESKey: 'oBUm0JaR3RcM5GcZX2V5NqQwZ5G0T31JMzAiLi9260X'
    };

    /**
     * 获取基础信息所有菜单
     * @returns {Array}
     */
    function getBaseinfoMenus() {
        var menus = [];

        menus.push({
            title: '客户列表',
            url: BASE_URL + 'client'
        });

        menus.push({
            title: '产品列表',
            url: BASE_URL + 'product'
        });

        return menus;
    }

    /**
     * 获取通用设置所有菜单
     * @returns {Array}
     */
    function getSetupMenus() {
        var menus = [];

        menus.push({
            title: '素材管理',
            url: BASE_URL + 'file-material'
        });

        menus.push({
            title: '系统文件',
            url: BASE_URL + 'file-sys'
        });

        menus.push({
            title: '用户文件',
            url: BASE_URL + 'file-user'
        });

        menus.push({
            title: '机构列表',
            url: BASE_URL + 'inst'
        });


        return menus;
    }

    /**
     * 获取业务中心所有菜单
     * @returns {Array}
     */
    function getBusinesscenterMenus() {
        var menus = [];

        menus.push({
            title: '订单中心',
            url: BASE_URL + 'order'
        });

        menus.push({
            title: '工单中心',
            url: BASE_URL + 'workorder'
        });

        menus.push({
            title: '收款列表',
            url: BASE_URL + 'receivable'
        });

        return menus;
    }

    /**
     * 拷贝数组
     * @param src
     * @param dest
     */
    function copyArray(src, dest) {
        for (var i = 0;i < src.length;i++) {
            dest.push(src[i]);
        }
    }

    /**
     * 获取所有微信菜单
     * @returns {Array}
     */
    function getAllMenus() {
        var menus = [];
        //copyArray(getBaseinfoMenus, menus);
        //copyArray(getSetupMenus(), menus);
        copyArray(getBusinesscenterMenus(), menus);
        return menus;
    }

    function toDescription(menus) {
        var str = "";
        for (var i = 0;i < menus.length;i++) {
            str += "点击<a href='"+menus[i].url+"'>这里</a>查看["+menus[i].title+"]";
            if (i != menus.length -1) {
                str += "\n\n";
            }
        }
        return str;
    }

    //接入验证,Api中已经包括了验证
    app.use("/wx/gateway", wxApi(config, function (req, res, next) {
        var message = req.weixin;
        var content = message.Content || message.EventKey;
        if (content == "登录") {
            res.reply("请点击<a href='http://www.yun9.com/auth/loginByWeixinClient'>这里</a>进行登录");
        }else if (content === '功能') {
            res.reply(toDescription(getAllMenus()));
        } else if (content === '基础信息') {
            res.reply(toDescription(getBaseinfoMenus()));
        } else if (content === '通用设置') {
            res.reply(toDescription(getSetupMenus()));
        } else if (content === '业务中心') {
            res.reply(toDescription(getBaseinfoMenus()));
        } else {
            res.reply('你好!欢迎使用移办通!');
        }
    }));
};