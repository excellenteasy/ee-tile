'use strict'
var test = require('tape')
var component = require('./')

test('component directive', function (t) {
  var ddo = component.directive()
  t.plan(6)
  t.equal('function', typeof component.directive, 'directive is of type function')
  t.equal('object', typeof ddo, 'directive function returns object')
  t.equal('object', typeof ddo.scope, 'directive has isolate scope')
  t.ok(ddo.controller, 'directive has controller')
  t.ok(ddo.controllerAs, 'directive has controllerAs')
  t.ok(ddo.template, 'directive has template')
})

test('component controller', function (t) {
  var ctrl = component.controller
  t.plan(1)
  t.equal('function', typeof component.directive, 'controller is of type function')
})
