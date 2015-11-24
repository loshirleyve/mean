/**
 * Created by Shirley on 2015/11/24.
 */

'use strict';

/**
 * 文件管理路由
 */

module.exports = function(){
    return function(req, res, next){
        res.render("biz/file/file");
    };
};
