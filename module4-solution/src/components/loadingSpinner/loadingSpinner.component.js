(function()
{
    'use strict';

    angular.module('LoadingSpinner')
        .component(
            'loadingSpinner',
            {
                templateUrl: 'src/components/loadingSpinner/loadingSpinner.template.html',
                controller: LoadingSpinnerComponentController
            });

    LoadingSpinnerComponentController.$inject = ['$rootScope'];
    function LoadingSpinnerComponentController($rootScope)
    {
        var controller = this;

        controller.isVisible = false;

        var cancellers = [];

        controller.$onInit = function ()
        {
            cancellers.push(
                $rootScope.$on(
                    '$stateChangeStart',
                    function (event, toState, toParams, fromState, fromParams)
                    {
                        controller.isVisible = true;
                    }));

            cancellers.push(
                $rootScope.$on(
                    '$stateChangeSuccess',
                    function (event, toState, toParams, fromState, fromParams)
                    {
                        controller.isVisible = false;
                    }));

            cancellers.push(
                $rootScope.$on(
                    '$stateChangeError',
                    function (event, toState, toParams, fromState, fromParams, error)
                    {
                        controller.isVisible = false;
                    }));
        };

        controller.$onDestroy = function ()
        {
            cancellers.forEach(function (canceller) { canceller(); });
        };
    }
}());
