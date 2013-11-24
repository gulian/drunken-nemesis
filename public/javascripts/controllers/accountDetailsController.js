angular.module('drunkennemesis').controller('accountDetailsController', function ($scope, $routeParams, Account, Operation){

    $scope.account = Account.get({
        accountId : $routeParams.account
    });

    $scope.newOperation = function(){
        var debug = {
            id: Math.random(),
            name : "Operation test",
            amount: Math.random()*10,
            _account : $scope.account._id
        };
        Operation.post(debug) ;
        $scope.account.operations.push(debug);
    };

});
