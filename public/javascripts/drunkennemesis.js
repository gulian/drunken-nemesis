angular.module('drunkennemesis', ['ngRoute']).config(['$routeProvider', function($routeProvider, $rootScope) {
    $routeProvider.
        when('/',           {templateUrl: '/partials/accounts.html'}).
        when('/settings/',  {templateUrl: '/partials/settings.html'}).
        otherwise({redirectTo: '/'});
}]);
