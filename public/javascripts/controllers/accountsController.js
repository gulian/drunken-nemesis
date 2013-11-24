angular.module('drunkennemesis').controller('accountsController', function ($scope, Account){

    $scope.accounts = Account.query() ;

    // Account.post({name:'Compte courant', bank:'SG', initialBalance: Math.floor(Math.random()*100)});

});
