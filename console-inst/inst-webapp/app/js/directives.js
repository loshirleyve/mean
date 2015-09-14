'use strict';

/* Directives */


angular.module('y9App.directives', []).
  directive('appVersion', ['version', function(version) {return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
