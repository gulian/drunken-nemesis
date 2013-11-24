angular.module('drunkennemesis', ['ngRoute','drunkenNemesisService']).config(['$routeProvider', function($routeProvider, $rootScope) {
    $routeProvider.
        when('/accounts/',          {templateUrl: '/partials/accounts.html'         }).
        when('/accounts/:account',  {templateUrl: '/partials/accountDetails.html'   }).
        when('/settings/',          {templateUrl: '/partials/settings.html'         }).
        otherwise({redirectTo: '/accounts'});
}]);
