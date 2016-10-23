(function()
{
    'use strict';

    angular.module('MenuApp')
        .component(
            'items',
            {
                templateUrl: 'src/components/items/items.template.html',
                bindings:
                {
                    items: '<'
                }
            });
}());
