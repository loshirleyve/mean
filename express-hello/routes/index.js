var express = require('express');
var router = express.Router();


router.get("/", function (req, res, next) {
    res.render("index");
});

router.get('/home', function (req, res, next) {
    res.render('home');
});


router.get('/home/:id', function (req, res, next) {


    res.render('home', {"id": req.params.id});
});

module.exports = router;
