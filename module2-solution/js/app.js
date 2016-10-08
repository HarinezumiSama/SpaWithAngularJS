(function ()
{
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController);

    function ShoppingListCheckOffService()
    {
        var service = this;

        var availableItems =
        [
            { name: 'cookies', quantity: 10 },
            { name: 'tomatoes', quantity: 2 },
            { name: 'candies', quantity: 3 },
            { name: 'water bottles', quantity: 7 },
            { name: 'pizza', quantity: 1 },
            { name: 'apple juice', quantity: 6 }
        ];

        var boughtItems = [];

        service.getAvailableItems = function ()
        {
            return availableItems;
        };

        service.getBoughtItems = function ()
        {
            return boughtItems;
        };

        service.buyItem = function (index)
        {
            var item = availableItems[index];
            availableItems.splice(index, 1);
            boughtItems.push(item);
        };
    }

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService)
    {
        var controller = this;

        controller.items = ShoppingListCheckOffService.getAvailableItems();

        controller.markAsBought = function (index)
        {
            ShoppingListCheckOffService.buyItem(index);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService)
    {
        var controller = this;

        controller.items = ShoppingListCheckOffService.getBoughtItems();
    }
})();
