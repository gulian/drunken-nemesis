angular.module('drunkennemesis').controller('accountDetailsController', function ($scope, $routeParams, Account){

    var accounts = [
        {id: '1', name:'Compte courant', bank:'SG', initialBalance:'20.34', operations: []},
        {id: '2',name:'Compte courant', bank:'ING Direct', initialBalance:'2345.23', operations: []}
    ] ;

    $scope.account = accounts[$routeParams.account-1];

    $scope.newOperation = function(){
        $scope.account.operations.push({
            id: Math.random(),
            name : Math.random(),
            amount: Math.random()*10
        });
    };

});
