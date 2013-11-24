angular.module('drunkenNemesisService', ['ngResource']).factory('Account', ['$resource',
    function($resource){

        var Account = {
            query: {
                method:'GET',
                isArray:true
            },
            get: {
                method:'GET',
                isArray:false
            },
            put: {
                method:'PUT',
                isArray:false
            },
            post: {
                method:'POST',
                isArray:false
            },
            delete: {
                method:'DELETE',
                isArray:false
            }
        }

        return $resource('account/:accountId', {}, Account);
}]);
