angular.module('drunkennemesis').controller('accountDetailsController', function ($scope, $routeParams, Account, Operation){

    $scope.selectedOperationsCount = 0;

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
        Operation.put(operation);
        $scope.processBalance();
        $scope.processForecastBalance();
    };

    $scope.updateSelected = function(all, newState){
        if(all){
            for(var i in $scope.account.operations){
                $scope.account.operations[i].selected = $scope.allSelected;
            }
            $scope.selectedOperationsCount = $scope.allSelected ? $scope.account.operations.length : 0 ;
        } else {
            $scope.selectedOperationsCount += newState ? 1 : -1 ;
            if($scope.selectedOperationsCount === $scope.account.operations.length){
                $scope.allSelected = true ;
            } else {
                $scope.allSelected = false ;
            }
        }

    };

    $scope.checkSelected = function(){
        for(var i in $scope.account.operations){
            if($scope.account.operations[i].selected && !$scope.account.operations[i].checked){
                $scope.account.operations[i].checked = true;
                Operation.put($scope.account.operations[i]);
            }
        }
        $scope.processBalance();
        $scope.processForecastBalance();
    };

    $scope.uncheckSelected = function(){
        for(var i in $scope.account.operations){
            if($scope.account.operations[i].selected && $scope.account.operations[i].checked){
                $scope.account.operations[i].checked = false;
                Operation.put($scope.account.operations[i]);
            }
        }
        $scope.processBalance();
        $scope.processForecastBalance();
    };

    $scope.deleteSelected = function(){

    };



});
