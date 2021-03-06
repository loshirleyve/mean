/**
 * Created by Leon on 15/9/15.
 */

var FilterStore = require("./mars-security-filter-store.js");
var util = require("util");
var fs = require("fs");
var path = require("path");

module.exports = FSFilterStore;

function FSFilterStore() {
    FilterStore.call(this);
    //从文件系统载入过滤配置
    this.filterConfig = loadConfigurationFile(path.join(__dirname, "../conf/filter-store.json"))
}

util.inherits(FSFilterStore, FilterStore);

function loadConfigurationFile(filename) {
    if (filename) {
        return JSON.parse(fs.readFileSync(filename, "utf8"));
    }
    return undefined;
}