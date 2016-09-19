/**
 * Directive to check for if <img> src has loaded and calls a function.
 * @returns {{restrict: string, link: Function}}
 */
function imageLoad($parse) {

  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      var fn = $parse(attrs.sbLoad);
      elem.on('load', function (event) {
        scope.$apply(function() {
          fn(scope, { $event: event });
        });
      });
    }
  };
}

angular.module('app')
  .directive('imageLoaded', imageLoaded);
