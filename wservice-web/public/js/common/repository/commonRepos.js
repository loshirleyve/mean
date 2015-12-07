/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */


angular.module("wservice.common.repository.common",
    ['ui.neptune.service.repository', "ui.neptune.service.session"])
    .factory("QueryCtrlCode", function (nptRepository) {
        return nptRepository("queryMdCtrlcode");
    }).factory("QueryImageByUserLevel", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryFile").addRequestInterceptor(function (request) {
            request.params.userid = nptSessionManager.getSession().getUser().id;
            request.params.level = "user";
            request.params.instid = nptSessionManager.getSession().getInst().id;
            request.params.filetype = "image";
            return request;
        })
            .addRequestInterceptor(function (request) {
                return request;
            });
    })
    .factory("QueryImageByMaterialLevel", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryFile").params({
            "level": "material",
            "instid": nptSessionManager.getSession().getInst().id,
            "filetype": "image"
        });
    })
    .factory("QueryImageBySystemLevel", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryFile").params({
            "level": "system",
            "instid": nptSessionManager.getSession().getInst().id,
            "filetype": "image"
        });
    }).factory("OrgListBySelectTree", function (nptRepository, nptSessionManager) {
        function builderOrgTreeNode(nodes, data) {
            if (data) {
                nodes.nodes = [];
                for (var i = 0; i < data.length; i++) {
                    var node = {
                        id: data[i].id,
                        title: data[i].name
                    };
                    builderOrgTreeNode(node, data[i].children);
                    nodes.nodes.push(node);
                }
            }
        }

        return nptRepository("queryOrgTree").addRequestInterceptor(function (request) {
            request.params.instid = nptSessionManager.getSession().getInst().id;
            request.params.dimtype = "hr";
            return request;
        }).addResponseInterceptor(function (response) {
            var orgNodes = [{
                id: response.data.id,
                title: response.data.simplename
            }];
            builderOrgTreeNode(orgNodes[0], response.data.children);
            return orgNodes;
        });

    })
    .factory("UserListBySelectTree", function (nptRepository) {
        return nptRepository("queryUsersByOrgid").addRequestInterceptor(function (request) {
            if (request.params.id) {
                request.params = {
                    orgid: request.params.id
                };
            }
            return request;
        });
    })
    .factory("QueryUserInfoById", function (nptRepository) {
        return nptRepository("QueryUserInfoById");
    })
    .factory("QueryUserByInst", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryUserByInst").addRequestInterceptor(function (request) {
            request.params.instid = nptSessionManager.getSession().getInst().id;
            return request;
        });
    })
    .factory("QueryFileById", function (nptRepository) {
        return nptRepository("QueryFileById").addResponseInterceptor(function (response) {
            if (response.data && response.data.fileUrl) {
                response.data.thumbnailUrl = response.data.fileUrl;
            }
            return response;
        });
    })
    .factory("QueryInsts", function (nptRepository) {
        return nptRepository("queryInsts");
    }).factory("AddOrUpdateFileRepo", function (nptRepository, nptSessionManager) {
        return nptRepository("AddOrUpdateFile").addRequestInterceptor(function (request) {
            request.params.createby = nptSessionManager.getSession().getUser().id;
            request.params.instid = nptSessionManager.getSession().getInst().id;
            return request;
        });
    });
