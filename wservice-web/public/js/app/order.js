/**
 * Created by leon on 15/10/22.
 */


var app = angular.module("orderApp", ['ui.bootstrap'])
    .controller("OrderListCtrl", function ($scope, $http, $log) {

        $scope.alerts = [];

        $scope.addAlert = function (msg) {
            $scope.alerts.push(msg);
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.clickAlert = function (bizKey, index) {
            console.info(bizKey);
            $scope.closeAlert(index);
        }

        $scope.query = {
            params: {
                userid: "10000001498059",
                instid: "10000001468002"
            },
            result: [],
            data: [],
            page: {
                totalItems: 0,
                currPage: 1,
                maxSize: 5,
                rowNum: 5
            }
        };

        //初始化分类查询状态
        $scope.queryState = "";

        /**
         * 根据参数查询订单列表
         * @param params
         */
        $scope.queryList = function (success, error) {
            $http.post("/service", {
                y9action: {
                    name: "queryOrderList",
                    params: $scope.query.params,
                }
            }).success(function (data) {
                $scope.setData(data);
                if (success) {
                    success(data);
                }
            }).error(function (data) {
                $scope.query.page.totalItems = 0;
                $scope.data = data;

                if (error) {
                    error(data);
                }

                $scope.addAlert({
                    title: "查询出错",
                    type: "danger",
                    content: "查询订单出现错误.",
                    action: "关闭",
                    bizKey: "query"
                });
            });
        };

        /**
         * 设置页面数据
         * @param pageNo
         */
        $scope.setData = function (result) {
            //重置分页信息
            $scope.query.page.currPage = 1;
            $scope.query.page.totalItems = result.data.length;
            $scope.query.result = result;

            //渲染第一页数据
            $scope.pageChanged();
        };

        /**
         * 根据状态查询当前用户机构的订单列表
         */
        $scope.queryByState = function () {
            var btn = $("#" + $scope.queryState);
            btn = btn.button('loading')

            //设置当前查询状态
            //$scope.query.data.state = $scope.queryState;

            $scope.queryList(function () {
                btn.button('reset')
            }, function () {
                btn.button('reset')
            });
        };

        /**
         * 目前处理分页为从当前查询结果上进行分页.
         */
        $scope.pageChanged = function () {

            $scope.query.data = [];
            var endIndex = $scope.query.page.currPage * $scope.query.page.rowNum;
            var beginIndex = $scope.query.page.currPage * $scope.query.page.rowNum - $scope.query.page.rowNum;

            for (beginIndex; beginIndex < endIndex; beginIndex++) {
                if (beginIndex >= $scope.query.result.data.length) {
                    break;
                } else {
                    $scope.query.data.push($scope.query.result.data[beginIndex]);
                }
            }
        };

    });