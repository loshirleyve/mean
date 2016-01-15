/**
 * Created by Shirley on 2016/1/13.
 */
angular.module("MyWalletApp", ["ui.neptune", "ngRoute", "ui-notification"])
    .config(function($routeProvider){
        $routeProvider
            .when("/",{
                controller:"MyWalletController as vm",
                templateUrl:"myWallet.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession();
                    }
                }
            })
            .when("/recharge",{
                controller:"MyWalletController as vm",
                templateUrl:"recharge.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession();
                    }
                }
            })
            .when("/payMode",{
                controller:"MyWalletController as vm",
                templateUrl:"payMode.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession();
                    }
                }
            })
            .when("/rechargeRecord/:rechargeRecordState",{
                controller:"RechargeRecordController as vm",
                templateUrl:"rechargeRecord.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession();
                    }
                }
            });
    })
    .factory("QueryBalanceByOwner", function(nptRepository, nptSessionManager){
        return nptRepository("QueryBalanceByOwner").params({
            "owner":nptSessionManager.getSession().getUser().id
        });
    })
    .factory("QueryRechargeGroupsByUserId", function(nptRepository, nptSessionManager){
        return nptRepository("QueryRechargeGroupsByUserId").params({
            "userid":nptSessionManager.getSession().getUser().id
        });
    })
    .factory("QueryPayModeTypeByType", function(nptRepository){
        return nptRepository("QueryPayModeTypeByType").addRequestInterceptor(function(request){
            request.params.paymodetype="online";
            request.params.type="3rdparty";
            return request;
        });
    })
    .factory("QueryRecharge", function(nptRepository, nptSessionManager){
        return nptRepository("QueryRecharge").addRequestInterceptor(function(request){
            request.params.userid=nptSessionManager.getSession().getUser().id;
            return request;
        });
    })
    .controller("MyWalletController", function(QueryBalanceByOwner, $location, Notification, QueryRechargeGroupsByUserId, QueryPayModeTypeByType){
        $(window.document.body).css("background-color","#EEF0EF");
        var vm = this;
        vm.rechargeGroup={};
        vm.queryBalance = QueryBalanceByOwner;
        vm.queryBalance.post().then(function(res){
        }, function(err){
            Notification.error({
                message:err.data.cause,
                delay:2000
            });
        });
        vm.queryRecharge = QueryRechargeGroupsByUserId;
        vm.queryRecharge.post().then(function(res){
            angular.forEach(res.data, function(recharge){
                if(recharge.state === "arrive"){
                    vm.rechargeGroup.arrive=recharge.nums;
                }
                else if(recharge.state === "unarrive"){
                    vm.rechargeGroup.unarrive=recharge.nums;
                }
            })
        }, function(err){
            Notification.error({
                message:err.data.cause,
                delay:2000
            });
        });
        vm.toRecharge = function(){
            $location.path("/recharge");
        };
        vm.queryPayMode = QueryPayModeTypeByType;
        vm.queryPayMode.post().then(function(res){
        }, function(err){
            Notification.error({
                message:err.data.cause,
                delay:2000
            });
        });
    })
    .controller("RechargeRecordController", function(QueryRecharge, Notification, $routeParams){
        $(window.document.body).css("background-color","#EEF0EF");
        var vm = this;
        vm.rechargeState=$routeParams.rechargeRecordState;
        vm.rechargeStateName="";
        vm.queryRechargeRecord = QueryRecharge;
        vm.queryRechargeRecord.post({"state":vm.rechargeState}).then(function(res){
            angular.forEach(res.cache.ctrlcode.rechargedetailstate, function(sta){
               if(sta.no === vm.rechargeState){
                   vm.rechargeStateName = sta.name;
               }
            });
        }, function(err){
            Notification.error({
                message:err.data.cause,
                delay:2000
            });
        });
    });