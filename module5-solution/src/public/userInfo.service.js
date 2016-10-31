(function ()
{
    'use strict';

    angular.module('public')
        .service('UserInfoService', UserInfoService);

    UserInfoService.$inject = ['ApiPath', '$http', '$q', '$interpolate'];
    function UserInfoService(ApiPath, $http, $q, $interpolate)
    {
        var service = this;

        var userInfo = null;
        var urlEvaluator = $interpolate(ApiPath + '/menu_items/{{itemCode}}.json');

        service.saveUserInfo = function (userInfoSource)
        {
            userInfo = angular.copy(userInfoSource);
            console.log("saveUserInfo: ", userInfo);
        };

        service.getUserInfo = function ()
        {
            return angular.copy(userInfo);
        };

        service.isSignedUp = function ()
        {
            return !!service.getUserInfo();
        };

        service.getItemInfoAsync = function (itemCode)
        {
            var menuItemUri = urlEvaluator({itemCode: itemCode});

            var deferred = $q.defer();

            $http.get(menuItemUri)
                .then(
                    function (response)
                    {
                        deferred.resolve(response.data);
                    })
                .catch(
                    function (reason)
                    {
                        deferred.reject("Item is not found.");
                    }
                );

            return deferred.promise;
        };
    }
})();
