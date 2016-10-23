(function()
{
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsViewController', ItemsViewController);

    ItemsViewController.$inject = ['itemsInfo'];
    function ItemsViewController(itemsInfo)
    {
        var controller = this;

        controller.category = itemsInfo.category;
        controller.items = itemsInfo.items;

        // console.log('ItemsViewController: items = ', items);
    }
}());
