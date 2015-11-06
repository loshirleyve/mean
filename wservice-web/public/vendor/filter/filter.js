/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';
angular.module('y9.filter',['angular.filter','ui.neptune.resource'])
    .directive('y9BizFilter',function($parse,nptResource,y9BizFilterHelper) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elm, attr, ctrl) {
                var filterConfig = attr.y9BizFilter;
                if(!filterConfig)throw new Error('无效的指令器配置,'+attr.ngModel);
                var filters = filterConfig.split("|");
                var modelName = filters[0]||attr.ngModel;
                var asNameArray = filters[filters.length - 1].split(/\s+as\s+/);
                var asName = (asNameArray.length==2)?asNameArray[1]:undefined;
                var asName = (asNameArray.length==2)?asNameArray[1]:undefined;
                filters[filters.length - 1] = (asNameArray.length==2)?asNameArray[0]:filters[filters.length - 1];;
                scope.$watch(modelName,function() {
                    y9BizFilterHelper.fire($parse(filters[0])(scope),filters.slice(1),scope)
                        .then(function(data){
                            data = angular.isObject(data)?angular.fromJson(data):data;
                            if (asName) {
                                scope[asName] = data;
                            }else if (attr.ngModel) {
                                scope[attr.ngModel] = data;
                            } else {
                                $(elm).html(data);
                            }
                        },function(error) {
                            throw error;
                        });
                });
            }
        };
    })
    .service('y9BizFilterHelper',function($q,$filter,$parse,y9BizFilterProvider,nptResource) {
        this.fire = function(originData,filters,scope) {
            var deferred = $q.defer();
            var self = this;
            var index = 0;
            var doFilter = function(data) {
                if (index == filters.length) {
                    deferred.resolve(data);
                    return;
                }
                var currentFilter = filters[index];
                self.filter(data,currentFilter,scope).then(function(nData) {
                    index++
                    doFilter(nData);
                },function(error) {
                    throw error;
                });
            }
            this.filter(originData).then(function(data) {
                doFilter(data);
            });

            return deferred.promise;
        }
        this.filter = function(data,filterExpression,scope) {
            if (!filterExpression) {
                var deferred = $q.defer();
                deferred.resolve(data);
                return deferred.promise;
            }
            filterExpression = this.parseFilterExpression(filterExpression,scope);
            var filterName = filterExpression.filterName,
                expression = filterExpression.expression;

            var bizConfig = y9BizFilterProvider.getConfig(filterName);
            if (bizConfig) { // 存在业务过滤器，需要异步处理
                return this.doBizFilter(filterName,expression,scope);
            } else {
                var deferred = $q.defer();
                deferred.resolve($filter(filterName)(data,expression));
                return deferred.promise;
            }
        }
        this.doBizFilter = function(name,params,scope) {
            var deferred = $q.defer();
            params = params || {};
            params = angular.isObject(params)?params:angular.fromJson(params);
            var bizConfig = y9BizFilterProvider.getConfig(name);
            bizConfig.bizParams = bizConfig.bizParams || {};
            bizConfig.bizParams = this.linkContex(bizConfig.bizParams,scope);
            angular.extend(bizConfig.bizParams,params);
            var self = this;
            nptResource.post(bizConfig.bizName, bizConfig.bizParams, function (data) {
                if (bizConfig.chains) {
                    self.fire(data,bizConfig.chains).then(function(cData) {
                        deferred.resolve(cData);
                    });
                } else {
                    deferred.resolve(data);
                }
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        this.linkContex = function(param,scope) {
            if (angular.isObject(param)) {
                var linkedParam = {};
                for (var key in param) {
                    linkedParam[key] = this.linkContex(param[key],scope);
                }
                return linkedParam;
            }
            return $parse(param)(scope);
        }

        this.parseFilterExpression = function(filterExpression,scope) {
            if (!filterExpression) {
                return {};
            }
            if (filterExpression.indexOf(":") > 0) {
                var parsedExpression = {};
                filterExpression = filterExpression.split(":");
                var filterName = filterExpression[0];
                filterExpression = filterExpression.slice(1);
                filterExpression = filterExpression.join(":");
                filterExpression = filterExpression.startsWith("{")?angular.fromJson(filterExpression):filterExpression;
                parsedExpression['filterName'] = filterName;
                parsedExpression['expression'] = this.linkContex(filterExpression,scope);
                return parsedExpression;
            } else {
                return {
                    filterName:filterExpression
                };
            }
        }
    })
    .filter('pickup',function($parse) {
        return function(input,expression) {
            var output = input;
            if (angular.isArray(input)) {
                output = input[0];
            } else if (!angular.isObject(input)) {
                return output;
            }
            output = output||{};
            return $parse(expression)(output);
        }
    })
    .provider('y9BizFilterProvider', function () {
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
    }).config(function (y9BizFilterProviderProvider) {
        y9BizFilterProviderProvider.addConfig('orderFilter', {
            "bizName": "queryOrderList",
            "bizParams": {"instid": "session.instid"},
            "chains":["first: 5"]
        });
    });