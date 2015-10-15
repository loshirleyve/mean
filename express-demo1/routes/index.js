var express = require('express');
var router = express.Router();
var debug = require("debug")("express-demo:index")

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get("/home*/:user",function(req,res,next){
    debug("第二个Home进入了"+",User:"+req.params.user);
    if (req.params.user =="liuli"){
        next();
    }else{
        res.send("没有权限访问.");
    }
});


router.get("/home/:user", function (req, res, next) {
    debug("home路由进入了！"+",User:"+req.params.user);
    res.send("我执行了");
});


router.get("/home/demo", function (req, res, next) {
    debug("home路由进入了！"+",User:"+req.params.user);
    res.send("我执行了");
});


module.exports = router;
