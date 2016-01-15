/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("AXAirlinePlanTaskApp.aXAirlinePlanTaskForm", ["ui.neptune", "wservice.common"])
    .factory("aXAirlinePlanTaskForm", function (nptFormlyStore, nptSessionManager, QueryFileByUserLevel, UploadSignature, AddOrUpdateFileRepo) {
        return nptFormlyStore("aXAirlinePlanTaskForm", {
            fields: [
                {
                    key: 'fileId',
                    type: 'npt-select-file',
                    templateOptions: {
                        required: false,
                        label: '添加文档附件:',
                        single: true,
                        fileRepository: QueryFileByUserLevel,
                        uploadOptions: {
                            getSignature: UploadSignature.query,
                            repository: AddOrUpdateFileRepo
                        }
                    }
                },
                {
                    key: 'postscript',
                    type: 'textarea',
                    templateOptions: {
                        label: '备注:',
                        required: false
                    }
                }
            ]
        });
    }).factory("aXAirlinePlanTask2Form", function (nptFormlyStore) {
        return nptFormlyStore("aXAirlinePlanTask2Form", {
            fields: [
                {
                    key: 'postscript',
                    type: 'textarea',
                    templateOptions: {
                        label: '备注:',
                        required: false
                    }
                }
            ]
        });
    });