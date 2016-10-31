(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider)
{
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    });

    $stateProvider.state(
        'public.signup',
        {
            url: '/signup',
            templateUrl: 'src/public/signup/signup.template.html',
            controller: 'SignUpController as controller'
        });

    $stateProvider.state(
        'public.myinfo',
        {
            url: '/myinfo',
            templateUrl: 'src/public/myInfo/myInfo.template.html',
            controller: 'MyInfoController as controller',
            resolve:
            {
                userInfo:
                [
                    'UserInfoService',
                    function (UserInfoService)
                    {
                        return UserInfoService.getUserInfo();
                    }
                ],
                itemInfo:
                [
                    'UserInfoService',
                    function (UserInfoService)
                    {
                        var userInfo = UserInfoService.getUserInfo();

                        return userInfo ? UserInfoService.getItemInfoAsync(userInfo.favoriteDish) : null
                    }
                ]
            }
        });
}
})();
