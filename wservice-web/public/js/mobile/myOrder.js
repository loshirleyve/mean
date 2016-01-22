/**
 * Created by Shirley on 2016/1/19.
 */
angular.module("MyOrderApp", ["ui.neptune", "ui-notification", "ngRoute"])
    .config(function($routeProvider){
        $routeProvider
            .when("/", {
                controller:"MyOrderController as vm",
                templateUrl:"myOrder.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession();
                    }
                }
            })
            .when("/orderDetail/:orderid", {
                controller:"OrderDetailController as vm",
                templateUrl:"orderDetail.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession();
                    }
                }
            })
            .when("/complaint/:orderid", {
                controller:"OrderComplaintController as vm",
                templateUrl:"orderComplaint.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession();
                    }
                }
            });
    })
    .factory("QueryOrderGroupsByUserId", function(nptRepository, nptSessionManager){
        return nptRepository("QueryOrderGroupsByUserId").addRequestInterceptor(function(request){
            request.params.userid=nptSessionManager.getSession().getUser().id;
            request.params.instid=nptSessionManager.getSession().getInst().id;
            return request;
        });
    })
    .factory("QueryOrdersByState", function(nptRepository, nptSessionManager){
        return nptRepository("QueryOrdersByState").addRequestInterceptor(function(request){
            request.params.userid=nptSessionManager.getSession().getUser().id;
            request.params.instid=nptSessionManager.getSession().getInst().id;
            return request;
        });
    })
    .factory("queryFileById", function(nptRepository){
        return nptRepository("QueryFileById");
    })
    .factory("queryOrderInfo", function(nptRepository){
        return nptRepository("queryOrderInfo");
    })
    .factory("queryFileById", function(nptRepository){
        return nptRepository("QueryFileById");
    })
    .factory("AddComplain", function(nptRepository){
        return nptRepository("AddComplain");
    })
    .controller("MyOrderController", function(QueryOrderGroupsByUserId, Notification, QueryOrdersByState, queryFileById, $location){
        $(window.document.body).css("background-color", "#EEF0EF");
        var vm = this;
        vm.imageOptions={
            repository:queryFileById,
            searchProp:"fileid",
            labelProp:"fileUrl"
        };
        vm.firstDisplayOrderState = "";
        vm.queryOrderGroups = QueryOrderGroupsByUserId;
        vm.queryOrderGroups.post().then(function(res){
            if(vm.queryOrderGroups.data && vm.queryOrderGroups.data.length){
                //if(vm.firstDisplayOrderState == null){
                    vm.firstDisplayOrderState = vm.queryOrderGroups.data[0].state;
               //}
                vm.queryOrderByState(vm.firstDisplayOrderState);
            }
        }, function(err){
            Notification.error({
               message:err.data.cause,
               delay:2000
            });
        });
        vm.queryOrder = QueryOrdersByState;
        vm.queryOrderByState = function(state){
            vm.queryOrder.post({"state":state}).then(function(res){

            }, function(err){
                Notification.error({
                    message:err.data.cause,
                    delay:2000
                });
            });
        };
        vm.toOrderDetail = function(orderid){
            $location.path('/orderDetail/'+orderid);
        }
    })
    .controller("OrderDetailController", function($routeParams, queryOrderInfo, Notification, queryFileById, $location){
        $(window.document.body).css("background-color", "#EEF0EF");
        var vm = this;
        vm.orderid = $routeParams.orderid;
        vm.orderDetail = queryOrderInfo;
        vm.orderDetail.post({"orderid":vm.orderid}).then(function(res){

        }, function(err){
            Notification.error({
                message:err.data.cause,
                delay:2000
            });
        });
        vm.imageOptions={
            repository:queryFileById,
            searchProp:"fileid",
            labelProp:"fileUrl"
        };
        vm.toComplaint = function(orderid){
            $location.path('/complaint/'+orderid);
        }
    })
    .controller("OrderComplaintController", function($routeParams, queryOrderInfo, Notification, queryFileById, $location, AddComplain){
        $(window.document.body).css("background-color", "#EEF0EF");
        var vm = this;
        vm.orderid = $routeParams.orderid;
        vm.orderDetail = queryOrderInfo;
        vm.addComplain = AddComplain;
        vm.orderDetail.post({"orderid":vm.orderid}).then(function(res){
        }, function(err){
            Notification.error({
                message:err.data.cause,
                delay:2000
            });
        });
        vm.imageOptions={
            repository:queryFileById,
            searchProp:"fileid",
            labelProp:"fileUrl"
        };
        vm.toOrderDetail = function(orderid){
            $location.path('/orderDetail/'+orderid);
        }
    });