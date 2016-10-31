(function()
{
    'use strict';

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['userInfo', 'itemInfo', 'ApiPath'];
    function MyInfoController(userInfo, itemInfo, ApiPath)
    {
        var controller = this;

        controller.userInfo = userInfo;
        controller.itemInfo = itemInfo;
        controller.itemImagePath = itemInfo ? ApiPath + '/images/' + itemInfo.short_name + '.jpg' : null;

        controller.isSignedUp = function ()
        {
            return !!controller.userInfo;
        };
    }
})();
