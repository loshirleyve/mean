/**
 * Created by leon on 15/12/8.
 */

var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var middleware = require("./middleware");
var proxy = require("./proxy");

//设置视图引擎
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");



//4.载入中间件
middleware(app);