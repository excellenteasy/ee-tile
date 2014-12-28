'use strict'
var test = require('tape')
var component = require('./')

test('component pattern', function (t) {
  var ddo = component.directive()
  t.plan(6)
  t.equal('function', typeof component.directive, 'directive is of type function')
  t.equal('object', typeof ddo, 'directive function returns object')
  t.equal('object', typeof ddo.scope, 'directive has isolate scope')
  t.ok(ddo.controller, 'directive has controller')
  t.ok(ddo.controllerAs, 'directive has controllerAs')
  t.ok(ddo.template, 'directive has template')
})

test('getMainStyles', function (t) {
  t.plan(3)
  t.deepEqual(component.getMainStyles(), {})
  t.deepEqual(component.getMainStyles({
    background: 'red'
  }), {background: 'red'})
  t.deepEqual(component.getMainStyles({
    background: 'red',
    image: '../cover.jpg'
  }), {
    background: 'red',
    backgroundImage: 'url(../cover.jpg)',
    backgroundSize: 'cover'
  })
})

test('getBarStyles', function (t) {
  t.plan(3)
  t.deepEqual(component.getBarStyles(), {})
  t.deepEqual(component.getBarStyles({bar: false}), {})
  t.deepEqual(component.getBarStyles({bar: 'red'}), {background: 'red'})
})
