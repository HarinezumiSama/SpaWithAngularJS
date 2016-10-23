(function ()
{
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider)
    {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state(
                'home',
                {
                    url: '/',
                    templateUrl: 'src/MenuApp/templates/home.template.html'
                })
            .state(
                'categories',
                {
                    url: '/categories',
                    templateUrl: 'src/MenuApp/templates/categories.template.html',
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
    }

})();
