(function ()
{
    'use strict';

    angular.module('NarrowItDownApp', [])
        .service('MenuSearchService', MenuSearchService)
        .controller('NarrowItDownController', NarrowItDownController)
        .directive('foundItems', FoundItemsDirective);

    function isNullOrWhitespace(str)
    {
      return !str || !/\S/.test(str);
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http)
    {
        var service = this;

        function normalizeString(value)
        {
            return value.toLowerCase();
        }

        service.getMatchedMenuItems = function (searchTerm)
        {
            var searchTermNormalized = normalizeString(searchTerm);

            return $http
                .get('https://davids-restaurant.herokuapp.com/menu_items.json')
                .then(
                    function (response)
                    {
                        var items = response.data.menu_items;
                        if (!angular.isArray(items))
                        {
                            return [];
                        }

                        return items.filter(
                            function (item)
                            {
                                return normalizeString(item.description).indexOf(searchTermNormalized) >= 0;
                            });
                    });
        };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService)
    {
        var controller = this;

        controller.found = null;
        controller.searchTerm = '';

        controller.search = function ()
        {
            controller.found = null;
            if (isNullOrWhitespace(controller.searchTerm))
            {
                controller.found = [];
                return;
            }

            MenuSearchService
                .getMatchedMenuItems(controller.searchTerm)
                .then(
                    function (result)
                    {
                        var found = result;
                        found.sort(function (l, r) { return l.name.localeCompare(r.name); })
                        controller.found = found;
                    });
        };

        controller.removeItem = function (itemIndex)
        {
            controller.found.splice(itemIndex, 1);
        };
    }

    function FoundItemsDirective()
    {
        var ddo =
        {
            templateUrl: 'foundItems/foundItems.template.html',
            restrict: 'E',
            scope:
            {
                items: '<foundItems',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'directiveController',
            bindToController: true
        };

        return ddo;
    }

    FoundItemsDirectiveController.$inject = [];
    function FoundItemsDirectiveController()
    {
        var controller = this;

        controller.hasItems = function ()
        {
            var items = controller.items;
            return items && angular.isArray(items) && items.length > 0;
        };

        controller.isNothingFound = function ()
        {
            var items = controller.items;
            return angular.isArray(items) && items.length <= 0;
        };
    }
})();
