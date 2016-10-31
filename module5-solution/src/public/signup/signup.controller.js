(function()
{
    'use strict';

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['UserInfoService', '$scope'];
    function SignUpController(UserInfoService, $scope)
    {
        var controller = this;

        controller.userInfo =
        {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            favoriteDish: ''
        };

        controller.SignUp = function ()
        {
            if ($scope.form.$invalid)
            {
                console.log('SignUp: Form is invalid. Exiting.');
                return;
            }

            UserInfoService.saveUserInfo(controller.userInfo);
        };

        controller.isSignedUp = function ()
        {
            return UserInfoService.isSignedUp();
        };
    }
})();
