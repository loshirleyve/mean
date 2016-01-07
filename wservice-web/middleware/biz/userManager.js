/**
 * Created by rxy on 16/1/7.
 */

module.exports = function () {

    return function (req, res, next) {
        res.render("admin/user/userManager");
    };
};