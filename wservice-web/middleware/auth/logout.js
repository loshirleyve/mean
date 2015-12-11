/**
 * Created by leon on 15/12/10.
 */


module.exports = function () {
    return function (req, res, next) {
        //注销机构
        req.logoutInst();
        req.logout();
        res.render("auth/login");
    }
};
