/**
 * Created by leon on 15/11/19.
 */

var instPassport = require("y9-mars-inst-passport");
var proxy = require("../proxy");
var express = require("express");
var router = express.Router();

module.exports = function (app) {

    instPassport.deserializeUser(function (inst, done) {
        //读取机构信息
        proxy.post("queryInstDetail").params({
            "instid": inst
        }).launch(function (response) {
            if (response.body.data) {
                done(null, response.body.data);
            } else {
                done(new Error("不存在的机构:" + inst));
            }

        }, function (error) {
            done(new Error(error.message));
        });
    });

    app.use(instPassport.initialize());

    router.get("/select", function (req, res, next) {
        res.render("system/inst-select");
    });

    router.use("/setup", instPassport.setInst({
        successReturnToOrRedirect: "/home"
    }));

    app.use("/system/inst", router);
};