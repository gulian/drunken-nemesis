angular.module('drunkennemesis').controller('accountsController', function ($scope, Account){

    // $scope.accounts = [
    //     {id: '1', name:'Compte courant', bank:'SG', balance:'20.34'},
    //     {id: '2',name:'Compte courant', bank:'ING Direct', balance:'2345.23'}
    // ] ;

    $scope.accounts = Account.query() ;

    Account.post({name:'Compte courant', bank:'SG', initialBalance: Math.floor(Math.random()*100)});

});
