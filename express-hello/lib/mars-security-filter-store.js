/**
 * Created by Leon on 15/9/15.
 */

var debug = require("debug")("mars-security");

module.exports = Store

function Store(options) {
    debug("Store创建.");
}

Store.prototype.hello = function () {
    debug("hello 调用.")
}

