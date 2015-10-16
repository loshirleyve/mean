/**
 * Created by rxy on 15/10/15.
 */

'use strict';

var express=require("express");
var router=express.Router();

router.get("/",function(req,res,next)
{
    res.render("receivable/receivableList",{
        "title":"收款管理"
    });
});



module.exports = router;