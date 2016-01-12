/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("AXAirlinePlanTaskApp.aXAirlinePlanTaskForm", ["ui.neptune"])
    .factory("aXAirlinePlanTaskForm", function(nptFormlyStore,QueryFileByUserLevel,UploadSignature,AddOrUpdateFileRepo) {
        return nptFormlyStore("aXAirlinePlanTaskForm", {
            fields: [
                {
                    key: 'attachmentsns',
                    type: 'npt-select-image',
                    templateOptions: {
                        required: false,
                        label: '添加附件:',
                        imageRepository: QueryFileByUserLevel,
                        uploadOptions : {
                            getSignature: UploadSignature.query,
                            repository: AddOrUpdateFileRepo,
                            repositoryParams:{"level":"user"}
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
    }).factory("QueryFileByUserLevel", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryFile").params({
            "level": "user",
            "instid": nptSessionManager.getSession().getInst().id,
            "filetype":"image"
        });
    });