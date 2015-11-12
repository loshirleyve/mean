/**
 * Created by rxy on 15/10/16.
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

router.get("/productDetail",function(req,res,next)
{
    res.render("app/productDetail",{
        "title":"产品详情"
    });
});



module.exports = router;