(function()
{
    'use strict';

    angular.module('MenuData')
        .service('MenuDataService', MenuDataService)
        .constant('BaseApiUrl', 'https://davids-restaurant.herokuapp.com/');

    MenuDataService.$inject = ['BaseApiUrl', '$http', '$q', '$timeout'];
    function MenuDataService(BaseApiUrl, $http, $q, $timeout)
    {
        var service = this;

        var CategoriesApiUrl = BaseApiUrl + 'categories.json';
        var MenuItemsApiUrl = BaseApiUrl + 'menu_items.json';

        service.getAllCategories = function ()
        {
            var promise = $http
                .get(CategoriesApiUrl)
                .then(
                    function (response)
                    {
                        var data = response.data;

                        var result = response.data.sort(function (l, r) { return l.name.localeCompare(r.name); });
                        return result;
                    })
                // .then(
                //     function (result)
                //     {
                //         var deferred = $q.defer();
                //         $timeout(function () { deferred.resolve(result); }, 3000);
                //         return deferred.promise;
                //     }
                // )
                .catch(
                    function (reason)
                    {
                        console.log('Error getting categories: ', reason);
                        throw reason;
                    });

            return promise;
        };

        service.getItemsForCategory = function (categoryShortName)
        {
            var promise = $http
                .get(
                    MenuItemsApiUrl,
                    {
                        params:
                        {
                            category: categoryShortName
                        }
                    })
                .then(
                    function (response)
                    {
                        var data = response.data;

                        var result =
                        {
                            category: data.category,
                            items: data.menu_items.sort(function (l, r) { return l.name.localeCompare(r.name); })
                        };

                        return result;
                    })
                // .then(
                //     function (result)
                //     {
                //         var deferred = $q.defer();
                //         $timeout(function () { deferred.resolve(result); }, 3000);
                //         return deferred.promise;
                //     }
                // )
                .catch(
                    function (reason)
                    {
                        console.log("Error getting items for category '", categoryShortName ,"': ", reason);
                        throw reason;
                    });

            return promise;
        };
    }
}());
