/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("AXFlightTaskApp.aXFlightTaskForm", ["ui.neptune",'ui.bootstrap',"wservice.common"])
    .factory("aXFlightTaskForm", function (nptFormlyStore, nptSessionManager, QueryUserInfoById,QueryFileByUserLevel, UploadSignature, AddOrUpdateFileRepo) {
        return nptFormlyStore("aXFlightTaskForm", {
            options: {
                formState: {
                    disabled: false
                }
            },
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
    .factory("aXAirLineLogForm", function (nptFormlyStore, QueryUserInfoById,OrgSelectTree,UserListBySelectTree) {
        return nptFormlyStore("aXAirLineLogForm", {
            fields: [
                {
                    key: 'operatingtime',
                    type: 'dateInput',
                    templateOptions: {
                        "formateType": "short",
                        label: '作业时间:',
                        required: true
                    },
                    defaultValue:new Date().getTime()
                },
                {
                    key: 'operatingaddr',
                    type: 'input',
                    templateOptions: {
                        label: '作业地点:',
                        required: true
                    }
                },
                {
                    key: 'operator',
                    type: 'npt-select-tree-single',
                    templateOptions: {
                        label: '飞控员:',
                        required: true,
                        viewvalueQueryProp: "userid",
                        treeRepository: OrgSelectTree,
                        listRepository: UserListBySelectTree,
                        viewvalueRepository: QueryUserInfoById
                    }
                },
                {
                    key: 'groundstation',
                    type: 'input',
                    templateOptions: {
                        label: '地面站:',
                        required: false
                    }
                },
                {
                    key: 'groundservice',
                    type: 'input',
                    templateOptions: {
                        label: '地勤:',
                        required: false
                    }
                },
                {
                    key: 'weather',
                    type: 'input',
                    templateOptions: {
                        label: '天气:',
                        required: false
                    }
                },
                {
                    key: 'visibility',
                    type: 'input',
                    templateOptions: {
                        label: '能见度:',
                        required: false
                    }
                },
                {
                    key: 'winddirection',
                    type: 'input',
                    templateOptions: {
                        label: '风向:',
                        required: false
                    }
                },
                {
                    key: 'windforce',
                    type: 'input',
                    templateOptions: {
                        label: '风力:',
                        required: false
                    }
                },
                {
                    key: 'area',
                    type: 'input',
                    templateOptions: {
                        label: '面积:',
                        required: false
                    }
                },
                {
                    key: 'flyingheight',
                    type: 'input',
                    templateOptions: {
                        label: '航高:',
                        required: false
                    }
                },
                {
                    key: 'heading',
                    type: 'input',
                    templateOptions: {
                        label: '航向:',
                        required: false
                    }
                },
                {
                    key: 'route',
                    type: 'input',
                    templateOptions: {
                        label: '航线:',
                        required: false
                    }
                },
                {
                    key: 'routespacing',
                    type: 'input',
                    templateOptions: {
                        label: '航线间距:',
                        required: false
                    }
                },
                {
                    key: 'totalvoyage',
                    type: 'input',
                    templateOptions: {
                        label: '总航程:',
                        required: false
                    }
                },
                {
                    key: 'cameramodel',
                    type: 'input',
                    templateOptions: {
                        label: '型号:',
                        required: false
                    }
                },
                {
                    key: 'cameraaperture',
                    type: 'input',
                    templateOptions: {
                        label: '光圈:',
                        required: false
                    }
                },
                {
                    key: 'camerashutter',
                    type: 'input',
                    templateOptions: {
                        label: '快门:',
                        required: false
                    }
                },
                {
                    key: 'exposure',
                    type: 'input',
                    templateOptions: {
                        label: '曝光:',
                        required: false
                    }
                },{
                    key: 'camerspacing',
                    type: 'input',
                    templateOptions: {
                        label: '拍照间距:',
                        required: false
                    }
                },
                {
                    key: 'degreeoverlap',
                    type: 'input',
                    templateOptions: {
                        label: '重叠度:',
                        required: false
                    }
                },
                {
                    key: 'photoquantity',
                    type: 'input',
                    templateOptions: {
                        label: '照片数量:',
                        required: false
                    }
                },
                {
                    key: 'rudderinspection',
                    type: 'input',
                    templateOptions: {
                        label: '舵面检查:',
                        required: false
                    }
                },

                {
                    key: 'cameratest',
                    type: 'input',
                    templateOptions: {
                        label: '相机测试:',
                        required: false
                    }
                },
                {
                    key: 'takeoffvoltage',
                    type: 'input',
                    templateOptions: {
                        label: '起飞电压:',
                        required: false
                    }
                },
                {
                    key: 'groundvoltage',
                    type: 'input',
                    templateOptions: {
                        label: '落地电压:',
                        required: false
                    }
                },
                {
                    key: 'takeofftime',
                    type: 'dateInput',
                    templateOptions: {
                        "formateType": "short",
                        label: '起飞时间:',
                        required: false
                    }
                },
                {
                    key: 'landingtime',
                    type: 'dateInput',
                    templateOptions: {
                        "formateType": "short",
                        label: '落地时间:',
                        required: false
                    }
                },
                {
                    key: 'flighttime',
                    type: 'input',
                    templateOptions: {
                        label: '飞行时间:',
                        required: false
                    }
                },
                {
                    key: 'powerconsumption',
                    type: 'input',
                    templateOptions: {
                        label: '耗电量:',
                        required: false
                    }
                },
                {
                    key: 'cruisingspeed',
                    type: 'input',
                    templateOptions: {
                        label: '巡航速度:',
                        required: false
                    }
                },
                {
                    key: 'cruisethrottle',
                    type: 'input',
                    templateOptions: {
                        label: '巡航油门:',
                        required: false
                    }
                },
                {
                    key: 'cruisecurrent',
                    type: 'input',
                    templateOptions: {
                        label: '巡航电流:',
                        required: false
                    }
                },
                {
                    key: 'link',
                    type: 'input',
                    templateOptions: {
                        label: '链路:',
                        required: false
                    }
                },
                {
                    key: 'createby',
                    type: 'ui-select',
                    templateOptions: {
                        optionsAttr: "bs-options",
                        label: '创建人:',
                        disabled: true,
                        valueProp: "id",
                        labelProp: "name",
                        options: [],
                        search: ["userid"],
                        repository: QueryUserInfoById,
                        allowClear: false
                    }
                }
            ]
        });
    });