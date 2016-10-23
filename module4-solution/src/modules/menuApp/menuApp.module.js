
(function()
{
    'use strict';

    angular.module('MenuApp', ['ui.router', 'MenuData'])
        .run(RunMenuApp);

    RunMenuApp.$inject = ['$rootScope'];
    function RunMenuApp($rootScope)
    {
        // $rootScope.$on(
        //     '$stateChangeStart',
        //     function (event, toState, toParams, fromState, fromParams)
        //     {
        //         console.log('$stateChangeStart: toState = { ', toState, ' }, toParams = { ', toParams, ' }');
        //     });
        //
        // $rootScope.$on(
        //     '$stateChangeSuccess',
        //     function (event, toState, toParams, fromState, fromParams)
        //     {
        //         console.log('$stateChangeSuccess: toState = { ', toState, ' }, toParams = { ', toParams, ' }');
        //     });

        $rootScope.$on(
            '$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error)
            {
                console.log('$stateChangeError: error = { ', error,' }, toState = { ', toState, ' }, toParams = { ', toParams, ' }');
            });
    }
})();
