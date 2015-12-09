/**
 * Created by leon on 15/12/9.
 */

module.exports = function () {
    return function (req, res, next) {
        if (req.query.code) {
            res.redirect("/mobile/userRegister#/" + req.query.code);
        } else {
            res.redirect("/mobile/userRegister");
        }

    }
};