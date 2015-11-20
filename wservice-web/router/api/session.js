/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';
module.exports = function (router) {
    router.all('/session', function (req, res, next) {
        var session = {};

        if (req.user) {
            session.user = req.user;
        }
        if (req.session.instPassport && req.session.instPassport.inst) {
            session.inst = req.session.instPassport.inst;
        }
        res.send(session);
    });

};