(function ()
{
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    function isNullOrWhitespace(str)
    {
      return !str || !/\S/.test(str);
    }

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope)
    {
        $scope.dishes = '';
        $scope.message = '';
        $scope.lunchMenuClass = "";
        $scope.messageClass = "";

        $scope.onCheckButtonClicked = function ()
        {
            var dishesString = $scope.dishes || '';
            if (isNullOrWhitespace(dishesString))
            {
                $scope.message = 'Please enter data first';
                $scope.lunchMenuClass = "noDataEntered";
                $scope.messageClass = "noDataEntered";
                return;
            }

            $scope.lunchMenuClass = "dataEntered";
            $scope.messageClass = "dataEntered";

            var dishes = dishesString.split(',');
            var dishCount = 0;
            for (var i = 0; i < dishes.length; i++)
            {
                if (!isNullOrWhitespace(dishes[i]))
                {
                    dishCount++;
                }
            }

            $scope.message = dishCount <= 3 ? "Enjoy!" : "Too much!";
        };
    }
})();
