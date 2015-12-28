/**
 * Created by leon on 15/12/10.
 */

module.exports = function () {
    return function (req, res, next) {

        res.render("mobile/wx/bind", {
            "wxprofile": JSON.stringify(req.session.y9WxProfile),
            "returnTo" : req.session.returnTo || "/auth/loginByWeixinClient"
        });


    }
};