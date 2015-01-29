import {readFileSync} from 'fs'
import textfit from 'textfit'
import ellipsis from 'html-ellipsis'

export default function eeTile(module) {
  module.directive('eeTile', directive)
}

if ('angular' in global) {
  eeTile(angular.module('eeTile', []))
}

export function directive() {
  return {
    scope: {
      options: '='
    },
    restrict: 'E',
    controller: ctrl,
    controllerAs: 'ctrl',
    template: readFileSync(__dirname + '/template.html', 'utf8')
  }
}

export function ctrl($scope, $element, $timeout) {
  let options = this.options = $scope.options
  let that = this

  this.applyOptions = applyOptions.bind(this, $element, $timeout)
  this.loadImage = function() {
    let opts = angular.copy(this.options)
    opts.lazyload = false
    this.mainStyle = getMainStyles(opts)
  }

  $scope.$watch('options', function(newValue) {
    if (!newValue) { return }
    this.mainStyle = getMainStyles(newValue)
    this.barStyle = getBarStyles(newValue)
    this.barRendered = newValue.bar !== false
    that.options = newValue
    that.applyOptions(newValue)
  })

  if (options) {
    this.mainStyle = getMainStyles(options)
    this.barStyle = getBarStyles(options)
    this.barRendered = options.bar !== false
    this.applyOptions(options)
  }

}

function applyOptions(element, $timeout, options) {
  if (options.fitText !== false) {
    $timeout(() => {
      let el = element[0].querySelector('.ee-tile-content')
      let settings = {
        minFontSize: 10,
        maxFontSize: 100
      }
      textfit(el, settings)
    })
  }
  if (options.ellipsis === false) return
  let count = 150
  if (typeof options.ellipsis === 'number') {
    count = options.ellipsis
  }
  $timeout(() => {
    let content = element[0].querySelector('.ee-tile-content')
    let html = content.innerHTML
    let ellipsed = ellipsis(html, count)
    if (ellipsed.length < html.length)  {
      content.innerHTML = ellipsed
    }
  })
}

export function getMainStyles(options = {}) {
  let background = options.background
  let image = options.image
  let styles = {}

  if (typeof image === 'string' && !options.lazyload) {
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

  if (typeof background !== 'string') {
    return {}
  }
  return {
    background: background
  }
}
