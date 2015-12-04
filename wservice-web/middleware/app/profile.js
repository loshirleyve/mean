/**
 * Created by leon on 15/11/20.
 */

module.exports = function () {
    return function (req, res, next) {
        res.render("app/profile/index");
    }
};