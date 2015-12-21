/**
 * `AuthenticationError` error.
 *
 * @api private
 */
function WxAuthenticationerror(message, status) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.name = 'WxAuthenticationerror';
    this.message = message;
    this.status = status || 401;
}

/**
 * Inherit from `Error`.
 */
WxAuthenticationerror.prototype.__proto__ = Error.prototype;


/**
 * Expose `WxAuthenticationerror`.
 */
module.exports = WxAuthenticationerror;
