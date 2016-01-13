/**
 * Created by Shirley on 2016/1/13.
 */
angular.module("MyWalletApp", ["ui.neptune", "ngRoute", "ui-notification", "wservice.common"])
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
    .controller("MyWalletController", function(QueryBalanceByOwner, Notification, QueryRechargeGroupsByUserId){
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
    });