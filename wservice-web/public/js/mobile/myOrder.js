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
            })
            .when("/payInfo/:orderid", {
                controller:"OrderPayInfoController as vm",
                templateUrl:"payInfo.html",
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
    .factory("AddComplain", function(nptRepository, nptSessionManager){
        return nptRepository("AddComplain").addRequestInterceptor(function(request){
            request.params.createby=nptSessionManager.getSession().getUser().id;
            request.params.instid=nptSessionManager.getSession().getInst().id;
            return request;
        });
    })
    .factory("QueryPayinfoBySource", function(nptRepository){
        return nptRepository("QueryPayinfoBySource").addRequestInterceptor(function(request){
            request.params.source="so";
            return request;
        });
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
            vm.putImg(res.data);
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
        };
        vm.toPayInfo = function(orderid){
            $location.path('/payInfo/'+orderid);
        };
        var flag = false;
        var imgno="";
        vm.putImg = function(orderDetail){
            for(var i=0; i<orderDetail.orderLogs.length; i++){
                if(orderDetail.orderLogs[i].orderstate === orderDetail.order.state){
                    orderDetail.orderLogs[i].imgno="1";
                    flag = true;
                }else if(orderDetail.orderLogs[i].orderstate !== orderDetail.order.state && flag === false){
                    orderDetail.orderLogs[i].imgno="0";
                }else{
                    orderDetail.orderLogs[i].imgno="2";
                }
            }
        };
    }).filter("timeAgoFilter", function($filter){
        return function(dateMillis){
            var minute = 60 * 1000;
            var hour = 60 * minute;
            var day = 24 * hour;
            var week = 7 * day;
            var offset = new Date().getTime() - dateMillis;
            var ago = "";
            if(offset < minute){
                ago = "刚刚";
            }else if(offset < hour){
                t = Math.floor(offset/minute);
                ago = t + "分钟前";
            }else if(offset < day){
                t = Math.floor(offset/hour);
                ago = t + "小时前";
            }else if(offset < week){
                t = Math.floor(offset/day);
                ago = t + "天前";
            }else{
                ago = $filter("timestampFilter")(dateMillis);
            }
            return ago;
        }
    })
    .controller("OrderComplaintController", function($routeParams, queryOrderInfo, Notification, queryFileById, $location, AddComplain){
        $(window.document.body).css("background-color", "#EEF0EF");
        var vm = this;
        vm.orderid = $routeParams.orderid;
        vm.orderDetail = queryOrderInfo;
        vm.complaints = "";
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
        };
        vm.finishComplaint = function(){
            var params={};
            params.complain = vm.complaints;
            params.tag = vm.complaints;
            params.serviceinstid = vm.orderDetail.data.order.instid;
            params.sourceid = vm.orderDetail.data.order.id;
            params.sourcetype =vm.orderDetail.data.order.ordersn;
            vm.addComplain.post(params).then(function(res){
                Notification.success({
                    message:'投诉成功！',
                    delay:2000
                });
            }, function(err){
                Notification.error({
                    message:err.data.cause,
                    delay:2000
                });
            });
        }
    })
    .controller("OrderPayInfoController", function(queryOrderInfo, $location, $routeParams, QueryPayinfoBySource, Notification){
        $(window.document.body).css("background-color", "#EEF0EF");
        var vm = this;
        vm.orderid = $routeParams.orderid;
        vm.payInfo = QueryPayinfoBySource;
        vm.payInfo.post({"sourceValue":vm.orderid}).then(function(res){

        }, function(err){
            Notification.error({
               message:err.data.cause,
               delay:2000
            });
        });
        vm.toOrderDetail = function(orderid){
            $location.path('/orderDetail/'+orderid);
        };
        vm.orderDetail = queryOrderInfo;
        vm.orderDetail.post({"orderid":vm.orderid}).then(function(res){
        }, function(err){
            Notification.error({
                message:err.data.cause,
                delay:2000
            });
        });
    });