import {readFileSync} from 'fs'
import textfit from 'textfit'
import ellipsis from 'html-ellipsis'

export default function eeTile(module) {
  module.directive('eeTile', directive)
}

if ('angular' in global) {
  eeTile(angular.module('eeTile', []))
}

export function directive($timeout) {
  return {
    scope: {
      options: '&'
    },
    restrict: 'E',
    controller: ctrl,
    controllerAs: 'ctrl',
    template: readFileSync(__dirname + '/template.html', 'utf8'),
    link: function(scope, element) {
      let options = scope.options
      if (options.fitText !== false) {
        $timeout(function() {
          let el = element[0].querySelector('.ee-tile-content')
          let settings = {
            minFontSize: 10,
            maxFontSize: 100
          }
          textfit(el, settings)
        }, 50)
      }
      if (options.ellipsis !== false) {
        let count = 150
        if ('number' === typeof scope.options.ellipsis) {
          count = scope.options.ellipsis
        }
        $timeout(function() {
          let content = element[0].querySelector('.ee-tile-content')
          let html = content.innerHTML
          let ellipsed = ellipsis(html, count)
          if (ellipsed.length < html.length)  {
            content.innerHTML = ellipsed
          }
        }, 50)
      }
    }
  }
}

export function ctrl($scope, $element) {
  let options = this.options = $scope.options()

  this.mainStyle = getMainStyles(options)
  this.barStyle = getBarStyles(options)
  this.barRendered = options.bar !== false
}

export function getMainStyles(options = {}) {
  let background = options.background
  let image = options.image
  let styles = {}

  if (typeof image === 'string') {
    styles.backgroundImage = `url(${ image })`
    styles.backgroundSize = 'cover'
  }

  if (typeof background === 'string') {
    styles.background = background
  }

  return styles
}

export function getBarStyles(options = {}) {
  let background = options.bar

  if ('string' !== typeof background) {
    return {}
  }
  return {
    background: background
  }
}
