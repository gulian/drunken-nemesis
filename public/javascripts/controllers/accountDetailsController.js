angular.module('drunkennemesis').controller('accountDetailsController', function ($scope, $routeParams, Account, Operation){

    $scope.account = Account.get({
        accountId : $routeParams.account
    });

    $scope.newOperation = function(){
        console.log($scope.account );
        // $scope.account.operations.push(
        var test = {
            id: Math.random(),
            name : Math.random(),
            amount: Math.random()*10
        };
        Operation.put(test) ;
        // );
    };

});
