/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("wservice.common.repository.common",['ui.neptune.service.repository'])
.factory("QueryCtrlCode", function (nptRepository) {
    return nptRepository("QueryMdCtrlcode");
})