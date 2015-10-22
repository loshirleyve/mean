/**
 * Created by leon on 15/10/22.
 */

var security = require("y9-mars-security");
var store = security.FilterStore();

store.use();

module.exports = store;