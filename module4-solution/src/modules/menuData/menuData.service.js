(function()
{
    'use strict';

    angular.module('MenuData')
        .service('MenuDataService', MenuDataService)
        .constant('BaseApiUrl', 'https://davids-restaurant.herokuapp.com/');

    MenuDataService.$inject = ['$http', 'BaseApiUrl'];
    function MenuDataService($http, BaseApiUrl)
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
                        return response.data.sort(function (l, r) { return l.name.localeCompare(r.name); });
                    })
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
