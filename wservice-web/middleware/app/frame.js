/**
 * Created by leon on 15/11/20.
 */


exports = module.exports = function () {
    return function (req, res, next) {
        res.render("app/home/frame");
    }
};

exports.otherPaths = ["/"];

