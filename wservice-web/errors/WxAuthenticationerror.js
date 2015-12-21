/**
 * `AuthenticationError` error.
 *
 * @api private
 */
function WxAuthenticationerror(message, wxprofile, status) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.name = 'WxAuthenticationerror';
    this.message = message;
    this.status = status || 401;
    this.wxprofile = wxprofile;
}

/**
 * Inherit from `Error`.
 */
WxAuthenticationerror.prototype.__proto__ = Error.prototype;


/**
 * Expose `WxAuthenticationerror`.
 */
module.exports = WxAuthenticationerror;
