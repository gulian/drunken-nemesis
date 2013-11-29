angular.module('drunkennemesis').controller('accountsController', function ($scope, Account){

    $scope.accounts = Account.query() ;
    $scope.newAccount = {} ;
    $scope.sendNewAccount = function(){
        if(!$scope.newAccount.name.trim().length){
            $scope.newAccountMessage = "Name is required" ;
             return false ;
        }
        if(!$scope.newAccount.initialBalance) {
            $scope.newAccount.initialBalance = 0 ;
        }
        Account.post($scope.newAccount, function(account){
            $scope.accounts.push(account);
        });
        $scope.newAccount = {} ;
        $scope.newAccountFormIsVisible = false ;
    };

});
