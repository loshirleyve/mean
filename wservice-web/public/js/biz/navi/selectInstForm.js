/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("naviApp.selectInstForm", ["ui.neptune","wservice.common"])
    .factory("selectInstForm", function (nptFormlyStore, queryInsts) {
        return nptFormlyStore("selectInstForm", {
            options: {
                formState: {
                }

            },
            fields: [
                {
                    key: 'instid',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        required: true,
                        label: '机构:',
                        valueProp:'id',
                        labelProp:'name',
                        placeholder:'请选择机构',
                        options:[],
                        repository: queryInsts
                    }
                }
            ],
            buttons: {
                ok: false,
                reset: false
            },
            onSubmitListens: [
                function (model, $timeout, $q) {
                    var deferd = $q.defer();

                    $timeout(function () {
                        deferd.resolve();
                    }, 1000);

                    return deferd.promise;
                }
            ]
        });
    })
    .factory("queryInsts",function(nptRepository) {
        return nptRepository("queryInsts");
    });