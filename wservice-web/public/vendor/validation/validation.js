/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';
angular.module('y9.validate', ['ui.neptune.resource'])
    .directive('y9BizValidate', function ($q, nptResource, y9BizValidateService, y9BizValidateProvider, y9BizValidateHelper) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elm, attr, ctrl) {
                var bizConfig = attr.y9BizValidateOpts || {};
                if (!ctrl) return;
                ctrl.$asyncValidators.bizvalidate = function (modelValue, viewValue) {
                    var modeName = attr.ngModel;
                    var extraScope = {};
                    modeName && (extraScope[modeName] = modelValue);
                    scope = angular.extend({}, scope, extraScope);
                    bizConfig = angular.isObject(bizConfig) ? bizConfig : angular.fromJson(bizConfig);
                    var baseConfig = y9BizValidateProvider.getConfig(attr.y9BizValidate) || {};
                    bizConfig = y9BizValidateHelper.extendConfig(baseConfig, bizConfig);
                    var bizName = bizConfig.bizName;
                    var validator = bizConfig.validator;
                    var bizParams = bizConfig.bizParams;
                    var validExpression = bizConfig.validExpression;

                    if (!bizName || !validator) {
                        throw new Error('无效的y9BizValidate配置；' + (attr.name || attr.ngModel))
                    }
                    var deferred = $q.defer();

                    if (!bizName || !validator
                        || ((angular.isString(validator) && !y9BizValidateService[validator])
                        || (!angular.isString(validator) && !angular.isFunction(validator)))) {
                        deferred.reject(new Error('无效的y9BizValidate配置；' + (attr.name || attr.ngModel)))
                        return deferred.promise;
                    }
                    bizParams = y9BizValidateHelper.parseParams(bizParams, scope);
                    nptResource.post(bizName, bizParams, function (data) {
                        validExpression = y9BizValidateHelper.parseParams(validExpression, scope);
                        var result = y9BizValidateHelper.execute(validator, data, validExpression);
                        if (result) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    }, function (error) {
                        deferred.reject(error);
                    });

                    return deferred.promise;
                };

                attr.$observe('y9BizValidateOpts', function (config) {
                    bizConfig = config ? config : {};
                    ctrl.$validate();
                });

            }
        };
    }).factory('y9BizValidateHelper', function ($parse, y9BizValidateService) {
        return {
            extendConfig: function (baseConfig, bizConfig) {
                if (baseConfig.bizParams) {
                    baseConfig.bizParams = angular.extend(baseConfig.bizParams, bizConfig.bizParams || {});
                    delete bizConfig.bizParams;
                }
                return angular.extend(baseConfig, bizConfig);
            },
            parseParams: function (config, scope) {
                if (angular.isObject(config)) {
                    var ret = {}
                    for (var key in config) {
                        ret[key] = this.parseParams(config[key], scope);
                    }
                    return ret;
                } else if (angular.isDefined(config)) {
                    return $parse(config)(scope);
                }
                return undefined;
            },
            execute: function (validator, data, expression) {
                if (angular.isString(validator)) {
                    return y9BizValidateService[validator](data, expression);
                } else if (angular.isFunction(validator)) {
                    return validator(data, expression);
                }
                throw new Error('无法执行验证器：' + validator);
            }
        }
    })
    .service('y9BizValidateService', function ($filter) {
        this.exist = function (data, expression) {
            if (!data) {
                return false;
            }
            if (!expression) { // 不存在表达式
                if (angular.isArray(data)) {
                    return data.length > 0;
                } else {
                    return !!data;
                }
            }
            var resultArr = [];
            if (angular.isString(expression)) {
                resultArr = $filter('filter')(angular.isArray(data) ? data : [data], expression);
            } else {
                resultArr = $filter('filter')(angular.isArray(data) ? data : [data], function (value, index, array) {
                    for (var key in expression) {
                        if (expression[key] != value[key]) {
                            return false;
                        }
                    }
                    return true;
                });
            }
            if (resultArr && resultArr.length > 0) {
                return true;
            }
            return false;

        }
        this.noExist = function (data, expression) {
            return !this.exist(data, expression);
        }
    }).provider('y9BizValidateProvider', function () {
        var config = {};
        this.addConfig = function (name, bizConfig) {
            config[name] = bizConfig;
        }
        this.$get = function () {
            return {
                getConfig: function (name) {
                    if (!name)return undefined;
                    var conf = config[name];
                    if (!conf) return undefined;
                    return angular.copy(conf);
                }
            }
        }
    }).config(function (y9BizValidateProviderProvider) {
        y9BizValidateProviderProvider.addConfig('ordersnExist', {
            "bizName": "queryOrderList",
            "validator": "exist",
            "validExpression": {
                "ordersn": "ordersn"
            }
        });

        y9BizValidateProviderProvider.addConfig('ordersnExist2', {
            "bizName": "queryOrderList",
            "bizParams": {"userid": "10000001498059", "instid": "session.instid"},
            "validator": function (data, expression) {
                if (data) {
                    for (var i = 0; i < data.length;i++) {
                        if (data[i].ordersn == expression) {
                            return true;
                        }
                    }
                }
                return false;
            }
        });
    });