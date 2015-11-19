/**
 * Created by leon on 15/11/19.
 */

var instPassport = require("y9-mars-inst-passport");

module.exports = function (app) {

    instPassport.deserializeUser(function (inst, done) {
        done && done(null, {
            id: "1",
            name: "深圳市顶聚科技有限公司."
        })
    });

    app.use(instPassport.initialize());
    app.use("/set-inst", instPassport.setInst());
};