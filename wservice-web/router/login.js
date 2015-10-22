/**
 * Created by rxy on 15/10/20.
 */


'use strict';

var express=require("express");
var router=express.Router();

router.get("/",function(req,res,next)
{
    res.render("login/login",{
        "title":"用户登录"
    });
});

module.exports = router;