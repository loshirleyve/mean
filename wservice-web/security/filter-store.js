/**
 * Created by leon on 15/10/22.
 */

var security = require("y9-mars-security");
var store = security.FilterStore();

store.use("/app*", {
    needLogin: true,
    needInst: true
    //role: ["user"]
}).use("/admin*", {
    needLogin: true,
    needInst: true,
    role: ["admin"]
}).use("/biz*", {
    needLogin: true,
    needInst: true
}).use("/", {
    needLogin: true,
    needInst: true
});

module.exports = store;