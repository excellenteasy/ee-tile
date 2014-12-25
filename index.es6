import {readFileSync} from 'fs'

export default function component(module) {
  module.directive('component', directive)
}

if ('angular' in global) {
  component(angular.module('component', []))
}

export function directive() {
  return {
    scope: {
      items: '='
    },
    restrict: 'ACE',
    controller: ctrl,
    controllerAs: 'ctrl',
    template: readFileSync(__dirname + '/template.html', 'utf8')
  }
}

export function ctrl($scope) {
  this.items = $scope.items.map(item => item * 1000)
}
