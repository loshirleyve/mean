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
            description: '查看客户列表.',
            picurl: 'http://www.yun9.com/image/yun9logo.png',
            url: BASE_URL + 'client'
        });

        menus.push({
            title: '产品列表',
            description: '查看产品列表.',
            picurl: 'http://www.yun9.com/image/yun9logo.png',
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
            description: '查看素材管理.',
            picurl: 'http://www.yun9.com/image/yun9logo.png',
            url: BASE_URL + 'file-material'
        });

        menus.push({
            title: '系统文件',
            description: '查看系统文件.',
            picurl: 'http://www.yun9.com/image/yun9logo.png',
            url: BASE_URL + 'file-sys'
        });

        menus.push({
            title: '用户文件',
            description: '查看客户列表.',
            picurl: 'http://www.yun9.com/image/yun9logo.png',
            url: BASE_URL + 'file-user'
        });

        menus.push({
            title: '机构列表',
            description: '查看机构列表.',
            picurl: 'http://www.yun9.com/image/yun9logo.png',
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
            description: '查看订单中心.',
            picurl: 'http://www.yun9.com/image/yun9logo.png',
            url: BASE_URL + 'order'
        });

        menus.push({
            title: '工单中心',
            description: '查看工单中心.',
            picurl: 'http://www.yun9.com/image/yun9logo.png',
            url: BASE_URL + 'workorder'
        });

        menus.push({
            title: '收款列表',
            description: '查看收款列表.',
            picurl: 'http://www.yun9.com/image/yun9logo.png',
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
        src.forEach(function (item) {
            dest.push(item);
        });
    }

    /**
     * 获取所有微信菜单
     * @returns {Array}
     */
    function getAllMenus() {
        var menus = [];
        copyArray(getBaseinfoMenus, menus);
        copyArray(getSetupMenus(), menus);
        copyArray(getBusinesscenterMenus(), menus);
        return menus;
    }

    //接入验证,Api中已经包括了验证
    app.use("/wx/gateway", wxApi(config, function (req, res, next) {
        var message = req.weixin;
        var content = message.Content;
        if (content === '功能') {
            res.reply(getAllMenus());
        } else if (content === '基础信息') {
            res.reply(getBaseinfoMenus());
        } else if (content === '通用设置') {
            res.reply(getSetupMenus());
        } else if (content === '业务中心') {
            res.reply(getBaseinfoMenus());
        } else {
            res.reply('你好!欢迎使用移办通!');
        }
    }));
};