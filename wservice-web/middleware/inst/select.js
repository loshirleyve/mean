/**
 * Created by leon on 15/11/20.
 */

module.exports = function () {
    return function (req, res, next) {
        var focus = req.query.focus;
        if(focus){
            res.render("inst/select");
        }else{
            req.y9proxy.post("QueryCurrInstByUser").params({
                "userid": req.user.id
            }).launch(function (response) {
                if(response.body.data){
                    res.redirect("/system/inst/setup?instid=" + response.body.data.id);
                }else{
                    res.render("inst/select");
                }
            }, function (error) {
                res.render("inst/select");
            });
        }
    }
};
