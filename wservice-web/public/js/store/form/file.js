/**
 * Created by Shirley on 2015/11/26.
 */

angular.module("wservice.form.store.file", ["ui.neptune", "wservice.common"])
    .run(function(nptFormStore, QueryUserInfoById, QueryCtrlCode, QueryImageByUserLevel){
        nptFormStore.put("file", {
            options:{},
            fields:[
                {
                    key: 'selectImage',
                    type: 'npt-select-image',
                    templateOptions: {
                        label: "选择图片",
                        imageRepository: QueryImageByUserLevel
                    }
                }
            ]
        })
    });