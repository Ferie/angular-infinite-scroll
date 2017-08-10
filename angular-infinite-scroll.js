/**
 * Infinite Scroll Module
 *
 * @author Riccardo Andreatta
 *
 * @module ra.infinite-scroll
 * @namespace ra.infinite-scroll
 * 
 * @description
 * A module that implements a directive for the infinite scroll in the window element.
 * 
 * @example
 * <div infinite-scroll callback-fn="example()" infinite-scroll-percentage="80"></div>
 */

(function () {
    'use strict';

    angular.module('ra.infinite-scroll', []).directive('infiniteScroll', infiniteScroll);

    infiniteScroll.$inject = ['$window'];

    /**
     * @directive infinite-scroll
     * @name infiniteScroll
     * @memberOf ra.infinite-scroll
     * @return {object}
     * @description Directive that is loading content when a certain percentage
     * of the page has been reached.
     * @param $window
     * 
     * @attribute callback-fn
     * Callback function when the window's portion is reached.
     * @attribute infinite-scroll-percentage
     * A percentage of the element that triggers the callback function (default 90%).
     */

    function infiniteScroll($window) {
        return {
            restrict: 'A',
            scope: {
                infiniteScrollCallbackFn: '&'
            },
            link: function (scope, elem, attrs) {
                var percentage = (attrs.infiniteScrollPercentage !== undefined ? (attrs.infiniteScrollPercentage / 100) : '.9');
                var $element = elem[0];

                angular.element($window).on('scroll', function () {
                    if ((this.scrollY + this.innerHeight - $element.offsetTop) >= ($element.scrollHeight * percentage)) {
                        scope.$apply(scope.infiniteScrollCallbackFn);
                    }
                });
            }
        };
    }
})();