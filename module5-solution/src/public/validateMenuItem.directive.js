(function()
{
    'use strict';

    angular.module('public')
        .directive('validateMenuItem', ValidateMenuItemDirective);

    ValidateMenuItemDirective.$inject = ['UserInfoService'];
    function ValidateMenuItemDirective(UserInfoService)
    {
        return (
        {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModel)
            {
                ngModel.$asyncValidators.invalidMenuItem = function (modelValue, viewValue)
                {
                    return UserInfoService.getItemInfoAsync(viewValue);
                };
            }
        });
    }
})();
