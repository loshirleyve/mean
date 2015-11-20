/**
 * Created by leon on 15/11/20.
 */


exports = module.exports = function () {
    return function (req, res, next) {
        var session = {};

        if (req.user) {
            session.user = req.user;
        }
        if (req.session.instPassport && req.session.instPassport.inst) {
            session.inst = req.session.instPassport.inst;
        }
        res.send(session);
    }
};

exports.type = ["post", "get"];