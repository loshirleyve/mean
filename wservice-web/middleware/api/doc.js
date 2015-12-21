/**
 * Created by leon on 15/12/21.
 */



exports = module.exports = function () {
    return function (req, res, next) {
        res.render("api/doc");
    }
};

//exports.type = ["post", "get"];