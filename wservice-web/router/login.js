/**
 * Created by rxy on 15/10/20.
 */


'use strict';

var express=require("express");
var router=express.Router();

router.get("/",function(req,res,next)
{
    var message = req.flash('error');
    res.render("login/login",{
        "title":"用户登录",
        error_message:message
    });
});

module.exports = router;