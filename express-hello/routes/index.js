var express = require('express');
var router = express.Router();
var debug = require("debug")("express-hello");

router.get("/", function (req, res, next) {
    res.render("index");
});


router.get("/home",function(req,res,next){
    debug("/home 路由.");
    next();
});

router.get('/home', function (req, res, next) {
    debug("/home 转发页面路由!");
    res.render('index');
});


router.get('/home/:id', function (req, res, next) {
    res.render('home', {"id": req.params.id});
});

module.exports = router;
