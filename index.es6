import {readFileSync} from 'fs'

export default function eeTile(module) {
  module.directive('eeTile', directive)
}

if ('angular' in global) {
  eeTile(angular.module('eeTile', []))
}

export function directive() {
  return {
    scope: {
      items: '='
    },
    restrict: 'AE',
    controller: ctrl,
    controllerAs: 'ctrl',
    template: readFileSync(__dirname + '/template.html', 'utf8')
  }
}

export function ctrl($scope) {
  this.items = $scope.items.map(item => item * 1000)
}
