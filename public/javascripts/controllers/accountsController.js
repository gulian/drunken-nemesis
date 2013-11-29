angular.module('drunkennemesis').controller('accountsController', function ($scope, Account){

    $scope.accounts = Account.query() ;

    $scope.newAccount = function(){
        var _account = {name:'Compte courant', bank:'SG', initialBalance: Math.floor(Math.random()*100)};
        Account.post(_account, function(account){
            $scope.accounts.push(account);
        });
    };

});
