/**
 * Created by leon on 15/12/11.
 */


module.exports = function () {
    return function (req, res, next) {
        res.render("auth/joinUsByEmail");
    }
};