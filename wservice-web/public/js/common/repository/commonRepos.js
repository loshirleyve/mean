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
        return nptRepository("QueryFile").delayParamsFn(function() {
            return {
                "userid": nptSessionManager.getSession().getUser().id,
                "level": "user",
                "instid": nptSessionManager.getSession().getInst().id,
                "filetype": "image"
            };
        })
            .addRequestInterceptor(function (request) {
            return request;
        });
    }).factory("OrgListBySelectTree", function (nptRepository,nptSessionManager) {
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

        return nptRepository("queryOrgTree").delayParamsFn(function() {
            return {
                "instid": nptSessionManager.getSession().getInst().id,
                "dimtype": "hr"
            };
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
    });
