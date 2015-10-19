var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next){
   res.render("file/materialManage", {
       "title":"素材管理"
   })
});


router.get("/systemFile", function(req, res, next){
   res.render("file/systemFile", {
       "title":"系统文件"
   })
});

router.get("/userFile", function(req, res, next){
    res.render("file/userFile", {
        "title":"用户文件"
    })
});
module.exports = router;