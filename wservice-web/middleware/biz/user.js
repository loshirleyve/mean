/**
 * Created by Shirley on 2015/12/5.
 */

'use strict';

/**
 * 客户列表路由
 */

module.exports = function(){
    return function(req, res, next){
        res.render("app/profile/index");
    };
};


