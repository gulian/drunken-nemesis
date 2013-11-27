angular.module('drunkennemesis').controller('accountDetailsController', function ($scope, $routeParams, Account, Operation){

    $scope.selectedOperationsCount = 0;

    $scope.account = Account.get({
        accountId : $routeParams.account
    }, function(){
        $scope.processBalance();
        $scope.processForecastBalance();
    });

    $scope.processBalance =  function(){
        $scope.balance = $scope.account.initialBalance;
        for(var i in $scope.account.operations){
            if($scope.account.operations[i].checked){
                $scope.balance += $scope.account.operations[i].amount;
            }
        }
    };
    $scope.processForecastBalance =  function(){
        $scope.forecastBalance = $scope.account.initialBalance;
        for(var i in $scope.account.operations){
            $scope.forecastBalance += $scope.account.operations[i].amount;
        }
    };

    $scope.startNewOperation = function(){
        $scope.newOperationIsInProgress = true ;
        $scope.newOperation = {
            name : "",
            amount: 0 ,
            created: new Date().toJSON().slice(0,10),
            checked: false,
            _account : $scope.account._id
        };
    };

    $scope.postNewOperation = function (){
        Operation.post( $scope.newOperation,function(operation){
            $scope.account.operations.push(operation);
            $scope.processBalance();
            $scope.processForecastBalance();
        });
        $scope.selectedOperationsCount--;
        $scope.allSelected = false ;
        $scope.newOperationIsInProgress = false ;
    };

    $scope.saveAccount = function () {
        Account.put($scope.account);
        $scope.processBalance();
        $scope.processForecastBalance();
    };

    $scope.update = function (operation) {
        Operation.put(operation);
        $scope.processBalance();
        $scope.processForecastBalance();
    };

    $scope.updateSelected = function(all, newState, $event){
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
        if($event){
            $event.stopPropagation();
            $event.stopImmediatePropagation();
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
        for(var i = 0 ; i < $scope.account.operations.length ; i++ ){
            if($scope.account.operations[i].selected){
                Operation.delete({
                    operationId : $scope.account.operations[i]._id
                });
                $scope.account.operations.splice(i--, 1);
                $scope.updateSelected(false, false);
            }
        }
        $scope.processBalance();
        $scope.processForecastBalance();
    };


});
