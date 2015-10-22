/**
 * Created by leon on 15/10/22.
 */

var security = require("y9-mars-security");
var store = security.FilterStore();

store.use("/app*", {
    needLogin: true,
    role: ["user"]
}).use("/admin*", {
    needLogin: true,
    role: ["admin"]
});

module.exports = store;