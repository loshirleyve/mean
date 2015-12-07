/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module('wservice.common.service.common',[]).service('UploadSignature', ['$http',
    function($http) {
        this.query = function () {
            return $http.get("/api/aliuploadAuth");
        };
    }
]);