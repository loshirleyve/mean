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

//建立sock
var sockServer = require('net').createServer(function (socket) {
    //socket.setEncoding('utf8');

    socket.on('data', function (data) {

        debug("收到数据:", data);
        socket.write('Hello!');
    });

    socket.on('end', function (data) {
        debug("接受数据完成", data);
        socket.write('Hello by end!');
    });
}).listen(3099);
//监听
sockServer.on("listening", function () {
    console.log('Server tcp is listening on port', 3099);
});

sockServer.on("close", function () {
    console.log('Server tcp is now closed');
});

sockServer.on("connection", function () {
    console.log('Server has a new connection');
});