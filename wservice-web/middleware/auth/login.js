/**
 * Created by leon on 15/11/20.
 */


module.exports = function () {
    return function (req, res, next) {
        //如果存在错误,将错误传递到页面
        if (req.session.flash && req.session.flash.error) {
            res.locals.error = req.session.flash.error;
        }
        res.render("auth/login");
    }
};