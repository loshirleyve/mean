/**
 * Created by leon on 15/11/19.
 */

var instPassport = require("y9-mars-inst-passport");
var proxy = require("../proxy");
var express = require("express");
var router = express.Router();
var Q = require("q");

module.exports = function (app) {

    function loadInstRole(inst, user) {
        var defered = Q.defer();
        proxy.post("queryInstRolesByUseridAndInstid")
            .params({
                instid: inst,
                userid: user.id
            }).launch(function (response) {
                defered.resolve(response.body.data);
            }, function (error) {
                defered.reject(new Error("无法获取机构角色：" + error.message));
            });
        return defered.promise;
    }

    function updateCurrentInst(int, user) {
        var defered = Q.defer();
        proxy.post("UpdateUserByCurrinstid")
            .params({
                currinstid: int,
                userid: user.id
            }).launch(function (response) {
                defered.resolve(response.body.data);
            }, function (error) {
                defered.reject(new Error("更新当前机构错误：" + error.message));
            });
        return defered.promise;
    }

    function queryInst(inst) {
        var defered = Q.defer();
        proxy.post("queryInstDetail").params({
            "instid": inst
        }).launch(function (response) {
            var instData = response.body.data;
            if (instData) {
                defered.resolve(instData);
            } else {
                defered.reject(new Error("不存在的机构：" + inst));
            }
        }, function (error) {
            defered.reject(new Error("不存在的机构：" + error.message));
        });
        return defered.promise;
    }

    instPassport.deserializeUser(function (inst, user, done) {
        Q.all([queryInst(inst), loadInstRole(inst, user), updateCurrentInst(inst, user)])
            .then(function (ress) {
                var instData = ress[0];
                instData.roles = ress[1];
                done(null, instData);
            }, function (error) {
                done(error);
            });
    });

    app.use(instPassport.initialize());

    router.get("/select", function (req, res, next) {
        res.render("system/inst-select");
    });

    router.use("/setup", instPassport.setInst({
        successReturnToOrRedirect: "/"
    }));

    app.use("/system/inst", router);
};