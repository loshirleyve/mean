/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';
module.exports = function (router) {
    router.all('/session', function (req, res, next) {
        var session = {};
        session.user = {
            id: 1,
            name: '廖志祥',
            iconid: 1,
            iconPath: '/vendor/adminlte/img/user2-160x160.jpg',
            inst: {
                id: 1,
                shotName: '时代共赢',
                fullName: '深圳时代共赢企业服务有限公司',
                pingyin: 'SDGY'
            },
            insts: [
                {
                    id: 1,
                    shotName: '时代共赢',
                    fullName: '深圳时代共赢企业服务有限公司',
                    pingyin: 'SDGY'
                }
            ],
            roles: []
        };
        res.json(session);
    });

};