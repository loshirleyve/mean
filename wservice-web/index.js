#!/usr/bin/env node

/*!
 * mars
 * Copyright(c) 2015 Leon Huang
 * MIT Licensed
 */

'use strict';

var app = require("./app");
var debug = require("debug")("y9-ax-tcp");

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;


    console.log('WService web app listening at http://%s:%s', host, port);
});
