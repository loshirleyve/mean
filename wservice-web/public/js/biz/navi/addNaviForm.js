/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("naviApp.naviForm", ["ui.neptune"])
    .factory("NaviForm", function (nptFormlyStore, QueryCtrlCode) {
        return nptFormlyStore("NaviForm", {
            options: {
                formState: {
                }

            },
            fields: [
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '导航名称:'
                    }
                },
                {
                    key: 'no',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '编号:'
                    }
                },
                {
                    key: 'type',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '类型:'
                    }
                },
                {
                    key: 'actionvalue',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '路由值:'
                    }
                },
                {
                    key: 'sort',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '序号:'
                    }
                },
                {
                    key: 'actiontype',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '动作类型:'
                    }
                },
                {
                    key: 'device',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '设备:'
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
    });