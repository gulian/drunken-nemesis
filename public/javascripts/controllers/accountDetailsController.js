angular.module('drunkennemesis').controller('accountDetailsController', function ($scope, $routeParams, Account, Operation){

    $scope.account = Account.get({
        accountId : $routeParams.account
    });

    $scope.newOperation = function(){
        var debug = {
            name : "Operation test",
            amount: Math.random()*10 - 5 ,
            _account : $scope.account._id
        };
        Operation.post(debug,function(operation){
            $scope.account.operations.push(operation);
        });
    };

});
