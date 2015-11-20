/**
 * Created by leon on 15/11/20.
 */


exports = module.exports = function () {
    return function (req, res, next) {
        var session = {};

        if (req.user) {
            session.user = req.user;
        }
        if (req.inst) {
            session.inst = req.inst;
        }
        res.send(session);
    }
};

exports.type = ["post", "get"];