/**
 * Created by rxy on 15/11/3.
 */

'use strict';

var express=require("express");
var router=express.Router();

router.get("/",function(req,res,next)
{
    res.render("app/product/product",{
        "title":"产品管理"
    });
});


module.exports = router;