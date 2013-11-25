angular.module('drunkennemesis').controller('accountDetailsController', function ($scope, $routeParams, Account, Operation){

    $scope.account = Account.get({
        accountId : $routeParams.account
    }, function(){
        $scope.processBalance();
    });

    $scope.processBalance =  function(){
        $scope.balance = 0 ;
        for(var i in $scope.account.operations){
            $scope.balance += $scope.account.operations[i].amount;
        }
    };

    $scope.newOperation = function(){
        var debug = {
            name : "Operation test",
            amount: Math.random()*100 - 50 ,
            _account : $scope.account._id
        };
        Operation.post(debug,function(operation){
            $scope.account.operations.push(operation);
            $scope.processBalance();
        });
    };

});
