/**
 * Created by leon on 15/12/9.
 */

module.exports = function () {
    return function (req, res, next) {
        if (req.query.code) {
            res.redirect("/mobile/userRegister#/form/" + req.query.code);
        } else {
            next(new Error("转发动作错误,无法获取code."));
        }

    }
};