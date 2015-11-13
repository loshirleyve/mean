/**
 * Created by shirley on 15/11/11.
 */

'use strict';
angular.module("wservice.form.store.client", ["ui.neptune"])
    .run(function (nptFormStore) {
        nptFormStore.put("client", {
            options: {},
            fields: [
                {
                    key: 'id',
                    type: 'input',
                    templateOptions: {
                        disabled:true,
                        required: true,
                        label: 'ID:'
                    }
                },
                {
                    key: 'fullname',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '名称:',
                        placeholder: "请输入客户名称"
                    }
                },
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '客户简称:',
                        placeholder: "请输入客户简称"
                    }
                },
                {
                    key: 'sn',
                    type: 'input',
                    templateOptions: {
                        disabled:true,
                        required: true,
                        label: '编号:'
                    }
                },
                {
                    key: 'industry',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '行业:'
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
                    key: 'level',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '级别:'
                    }
                },
                {
                    key: 'source',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '来源:'
                    }
                },
                {
                    key: 'scale',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '规模:'
                    }
                },
                {
                    key: 'contactman',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '联系人:'
                    }
                },
                {
                    key: 'contactphone',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '电话:'
                    }
                },
                {
                    key: 'contactposition',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '职位:'
                    }
                },
                {
                    key: 'region',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '地区:'
                    }
                },
                {
                    key: 'address',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '地址:'
                    }
                },
                {
                    key: 'clientinstid',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '客户机构:'
                    }
                },
                {
                    key: 'clientadminid',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '客户管理员:'
                    }
                },
                {
                    key: 'createdate',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '创建时间:'
                    }
                },
                {
                    key: 'updatedate',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '更新时间:'
                    }
                },
                {
                    key: 'remark',
                    type: 'input',
                    templateOptions: {
                        label: '备注:'
                    }
                }
            ]
        }).put("addClient", {
            fields: [
                {
                    key: 'fullname',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '名称:',
                        placeholder: "请输入客户名称"
                    }
                },
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '客户简称:',
                        placeholder: "请输入客户简称"
                    }
                },
                {
                    key: 'sn',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '编号:'
                    }
                },
                {
                    key: 'industry',
                    type: 'ui-select',
                    templateOptions: {
                        label:'行业',
                        required: true,
                        valueProp:'id',
                        labelProp:'name',
                        placeholder:'请选择',
                        options:[],
                        datasource:'queryMdCtrlcode',
                        datasourceParams:{"userid":"10000001498059", "instid":"10000001463017"}
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
                    key: 'level',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '级别:'
                    }
                },
                {
                    key: 'source',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '来源:'
                    }
                },
                {
                    key: 'scale',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '规模:'
                    }
                },
                {
                    key: 'contactman',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '联系人:'
                    }
                },
                {
                    key: 'contactphone',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '电话:'
                    }
                },
                {
                    key: 'contactposition',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '职位:'
                    }
                },
                {
                    key: 'region',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '地区:'
                    }
                },
                {
                    key: 'address',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '地址:'
                    }
                },
                {
                    key: 'clientinstid',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '客户机构:'
                    }
                },
                {
                    key: 'clientadminid',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '客户管理员:'
                    }
                },
                {
                    key: 'createdate',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '创建时间:'
                    }
                },
                {
                    key: 'updatedate',
                    type: 'input',
                    templateOptions: {
                        required: true,
                        label: '更新时间:'
                    }
                },
                {
                    key: 'remark',
                    type: 'input',
                    templateOptions: {
                        label: '备注:'
                    }
                }
            ]
        });
    });