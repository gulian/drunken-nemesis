angular.module('drunkennemesis').controller('accountDetailsController', function ($scope, $routeParams, Account, Operation){

    $scope.account = Account.get({
        accountId : $routeParams.account
    }, function(){
        $scope.processBalance();
        $scope.processForecastBalance();
    });

    $scope.processBalance =  function(){
        $scope.balance = 0 ;
        for(var i in $scope.account.operations){
            if($scope.account.operations[i].checked){
                $scope.balance += $scope.account.operations[i].amount;
            }
        }
    };
    $scope.processForecastBalance =  function(){
        $scope.forecastBalance = 0 ;
        for(var i in $scope.account.operations){
            $scope.forecastBalance += $scope.account.operations[i].amount;
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
            $scope.processForecastBalance();
        });
    };

    $scope.update = function (operation) {
        // var operation = $scope.account.operations[$index];
        Operation.put(operation);
        $scope.processBalance();
        $scope.processForecastBalance();
    }

});
