(function()
{
    'use strict';

    angular.module('MenuApp')
        .component(
            'categories',
            {
                templateUrl: 'src/components/categories/categories.template.html',
                bindings:
                {
                    categories: '<'
                }
            });
}());
