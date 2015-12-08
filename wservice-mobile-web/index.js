#!/usr/bin/env node

/*!
 * mars
 * Copyright(c) 2015 Leon Huang
 * MIT Licensed
 */

'use strict';

var app = require("./app");

var server = app.listen(3080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('WService mobile web app listening at http://%s:%s', host, port);
});
