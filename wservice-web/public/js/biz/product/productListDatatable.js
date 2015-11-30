/**
 * Created by rxy on 15/11/11.
 */

angular.module("productApp.productListDatatable", ["ui.neptune"]).
    run(function (nptDatatableStore) {
        nptDatatableStore.putDatatable("product", {
                header: {
                    instid: {
                        label: "服务商名称",
                        filter: "cacheFilter:'inst':'instname':'instid'"
                    },
                    sn: {
                        label: "产品编号"
                    },
                    name: {
                        label: "产品名称"
                    },
                    pricedescr: {
                        label: "售价"
                    },
                    state: {
                        label: "产品状态",
                        filter:"ctrlCodeFilter:'productstate':'name':'no'"
                    },
                    type: {
                        label: "产品类型",
                        filter:"ctrlCodeFilter:'producttype':'name':'no'"

                    },
                    createdate: {
                        label: "创建日期",
                        filter:"timestampFilter|json"
                    }
                },
                action: {
                    view: {
                        label: "查看",
                        type: "view"
                    }
                }
            }
        );
        nptDatatableStore.putDatatable("group", {
            header: {
                name: {
                    label: "分组名称"
                },
                sort: {
                    label: "排序"
                }
            },
            action: {
                edit: {
                    label: "编辑",
                    type: "edit",
                    target: "group",
                    listens: [
                        function (params, $timeout, $q, productService) {
                            var deferd = $q.defer();
                            productService.query.editGroup(params.data, function (data) {
                                deferd.resolve(data);
                            }, function (error) {
                                deferd.reject(error);
                            });
                            return deferd.promise;
                        }
                    ]
                },
                del: {
                    label: "删除",
                    type: "del",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                }
            }
        });
        nptDatatableStore.putDatatable("productInfo", {
                header: {
                    name: {
                        label: "产品名称"
                    },
                    pricedescr: {
                        label: "售价"
                    },
                    state: {
                        label: "产品状态",
                        filter:"ctrlCodeFilter:'productstate':'name':'no'"
                    },
                    saleprice: {
                        label: "促销价格"
                    },
                    type: {
                        label: "产品类型",
                        filter:"ctrlCodeFilter:'producttype':'name':'no'"
                    },
                    daynum: {
                        label: "办理天数"
                    }
                },
                action: {
                    view: {
                        label: "编辑",
                        type: "view"
                    }
                }
            }
        );
        nptDatatableStore.putDatatable("productPhase", {
            header: {
                name: {
                    label: "阶段名称"
                },
                cyclevalue: {
                    label: "阶段周期"
                },
                duty: {
                    label: "阶段职责"
                },
                times: {
                    label: "办理天数"
                },
                processdays: {
                    label: "服务次数"
                }
            },
            action: {
                add: {
                    label: "添加",
                    type: "add",
                    target: "productPhase",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    target: "productPhase",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                                if (params.index === 0) {
                                    deferd.reject("不能编辑第一行");
                                } else {
                                    deferd.resolve("执行成功!");
                                }
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                },
                del: {
                    label: "删除",
                    type: "del",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                }
            }
        });
        nptDatatableStore.putDatatable("productProfiles", {
            header: {
                synopsis: {
                    label: "内容描述"
                },
                sort: {
                    label: "排序"
                }
            },
            action: {
                add: {
                    label: "添加",
                    type: "add",
                    target: "productProfiles",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    target: "productProfiles",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                                if (params.index === 0) {
                                    deferd.reject("不能编辑第一行");
                                } else {
                                    deferd.resolve("执行成功!");
                                }
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                },
                del: {
                    label: "删除",
                    type: "del",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                }
            }
        });
        nptDatatableStore.putDatatable("productGroup", {
            header: {
                backgorundimgid: {
                    label: "分组图标"
                },
                groupname: {
                    label: "分组名称"
                },
                province: {
                    label: "省"
                },
                city: {
                    label: "市"
                },
                district: {
                    label: "区"
                },
                top: {
                    label: "是否置顶"
                },
                sort: {
                    label: "排序"
                }
            },
            action: {
                add: {
                    label: "添加",
                    type: "add",
                    target: "productGroup",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    target: "productGroup",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                                if (params.index === 0) {
                                    deferd.reject("不能编辑第一行");
                                } else {
                                    deferd.resolve("执行成功!");
                                }
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                },
                del: {
                    label: "删除",
                    type: "del",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                }
            }
        });
        nptDatatableStore.putDatatable("productClassifies", {
            header: {
                classifyname: {
                    label: "分类名称"
                },
                classifyno: {
                    label: "分类编号"
                },
                price: {
                    label: "价格"
                },
                phasename: {
                    label: "所属服务阶段"
                },
                sort: {
                    label: "排序"
                }
            },
            action: {
                add: {
                    label: "添加",
                    type: "add",
                    target: "productClassifies",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    target: "productClassifies",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                                if (params.index === 0) {
                                    deferd.reject("不能编辑第一行");
                                } else {
                                    deferd.resolve("执行成功!");
                                }
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                },
                del: {
                    label: "删除",
                    type: "del",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                }
            }
        });
        nptDatatableStore.putDatatable("productDescrs", {
            header: {
                descr: {
                    label: "标题"
                },
                descrvalue: {
                    label: "内容"
                },
                type: {
                    label: "类型",
                    filter: "ctrlCodeFilter:'productdescrtype':'name':'no'"
                }
            },
            action: {
                add: {
                    label: "添加",
                    type: "add",
                    target: "productDescrs",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                },
                edit: {
                    label: "编辑",
                    type: "edit",
                    target: "productDescrs",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                                if (params.index === 0) {
                                    deferd.reject("不能编辑第一行");
                                } else {
                                    deferd.resolve("执行成功!");
                                }
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                },
                del: {
                    label: "删除",
                    type: "del",
                    listens: [
                        function (params, $timeout, $q) {
                            var deferd = $q.defer();
                            $timeout(function () {
                            }, 500);
                            return deferd.promise;
                        },
                        function () {
                            return "我是第二个方法";
                        }
                    ]
                }
            }
        });
    });
