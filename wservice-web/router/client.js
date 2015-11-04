/**
 * Created by Administrator on 2015/10/15.
 */

'use strict';

var express = require("express");
var router = express.Router();

/**
 * 客户列表路由
 */
router.get("/", function (req, res, next) {
    res.render("app/client/client");
});







router.get("/", function(req, res, next){
   res.render("app/client/clientList",{
       "title":"客户管理"
   })
});

router.get("/client-detail", function(req, res, next){
   res.render("client/client-detail",{
       "title":"客户详情"
   })
});
router.get("/clientDetail", function(req, res, next){
   res.render("client/clientDetail",{
       "title":"客户详情"
   })
});

router.get("/newClient", function(req, res, next){
   res.render("client/newClient",{
       "title":"新增客户"
   })
});

module.exports = router;