/**
 * Created by leon on 15/11/20.
 */

module.exports = function () {
    return function (req, res, next) {
        req.y9proxy.post("QueryCurrInstByUser").params({
            "userid": req.user.id
        }).launch(function (response) {
            res.redirect("/system/inst/setup?instid=" + response.body.data.id);
        }, function (error) {
            res.render("inst/select");
        });
    }
};
