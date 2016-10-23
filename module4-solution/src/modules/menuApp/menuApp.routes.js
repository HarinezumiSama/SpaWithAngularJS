(function ()
{
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider)
    {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state(
            'home',
            {
                url: '/',
                templateUrl: 'src/modules/menuApp/templates/home.template.html'
            });

        $stateProvider.state(
            'categories',
            {
                url: '/categories',
                templateUrl: 'src/modules/menuApp/templates/categoriesView.template.html',
                controller: 'CategoriesViewController as controller',
                resolve:
                {
                    categories:
                    [
                        'MenuDataService',
                        function (MenuDataService)
                        {
                            return MenuDataService.getAllCategories();
                        }
                    ]
                }
            });

        $stateProvider.state(
            'items',
            {
                url: '/items/{category:string}',
                templateUrl: 'src/modules/menuApp/templates/itemsView.template.html',
                controller: 'ItemsViewController as controller',
                resolve:
                {
                    itemsInfo:
                    [
                        'MenuDataService',
                        '$stateParams',
                        function (MenuDataService, $stateParams)
                        {
                            return MenuDataService.getItemsForCategory($stateParams.category);
                        }
                    ]
                }
            });
    }
})();
