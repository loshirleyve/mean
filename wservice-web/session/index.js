/**
 * Created by leon on 15/10/22.
 */

var session = require("express-session");

module.exports = function (app) {
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: "y9-wservice-web"
    }))
}