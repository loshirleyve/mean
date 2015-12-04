/**
 * Created by leon on 15/11/19.
 */

var instPassport = require("y9-mars-inst-passport");
var proxy = require("../proxy");
var express = require("express");
var router = express.Router();

module.exports = function (app) {

    function loadInstRole(instData, user, done) {
        proxy.post("queryInstRolesByUseridAndInstid")
            .params({
                instid: instData.id,
                userid: user.id
            }).launch(function (response) {
                instData.roles = response.body.data;
                done(null, instData);
            }, function (error) {
                done(new Error("无法获取机构角色" + error));
            });
    }

    instPassport.deserializeUser(function (inst, user, done) {
        //读取机构信息
        proxy.post("queryInstDetail").params({
            "instid": inst
        }).launch(function (response) {
            var instData = response.body.data;
            if (instData) {
                loadInstRole(instData, user, done);
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