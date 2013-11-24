angular.module('drunkennemesis').controller('accountsController', function ($scope, Account){

    $scope.accounts = Account.query() ;

    $scope.newAccount = function(){
        var debug = {name:'Compte courant', bank:'SG', initialBalance: Math.floor(Math.random()*100)};
        Account.post(debug);
        $scope.accounts.push(debug);
    };

});
