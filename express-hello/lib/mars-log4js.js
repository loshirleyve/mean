/**
 * 日志处理模块
 * Created by Leon on 15/9/15.
 */

var path = require("path");
var log4js = require("log4js");

exports.configure = function (mode) {
    if (mode == "master") {
        log4js.configure(path.join(__dirname, "../conf/log4js-master.json"));
    } else if (mode == "worker") {
        log4js.configure(path.join(__dirname, "../conf/log4js-worker.json"));
    } else {
        log4js.configure(path.join(__dirname, "../conf/log4js.json"));
    }
}

exports.logger = function (name) {
    var dateFileLog = log4js.getLogger(name);
    dateFileLog.setLevel(log4js.levels.INFO);
    return dateFileLog;
}

exports.useLog = function () {
    return log4js.connectLogger(log4js.getLogger("app"), {
            level: log4js.levels.INFO
        }
    );
}