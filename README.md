# The component pattern
[![Build Status](https://travis-ci.org/excellenteasy/boilerplate-angular-component.svg?branch=master)](https://travis-ci.org/excellenteasy/boilerplate-angular-component)
[![Code Climate](https://codeclimate.com/github/excellenteasy/boilerplate-angular-component/badges/gpa.svg)](https://codeclimate.com/github/excellenteasy/boilerplate-angular-component)
[![Dependency Status](https://david-dm.org/excellenteasy/boilerplate-angular-component.svg)](https://david-dm.org/excellenteasy/boilerplate-angular-component)
[![devDependency Status](https://david-dm.org/excellenteasy/boilerplate-angular-component/dev-status.svg)](https://david-dm.org/excellenteasy/boilerplate-angular-component#info=devDependencies)

> Credit goes to [Tero Parviainen](http://teropa.info/blog/2014/10/24/how-ive-improved-my-angular-apps-by-banning-ng-controller.html) for writing about this pattern.

## Key principles are:

### isolate scope
The scope definition explicitly defines what date can be handed to the component. It does not inherit from a parent scope. You can think of this as its "API".

### controller replaces link function
To write and run unit tests easily, use a controller.

### template
If a comComponents have a one-to-one correspondence with HTML templates.

## Further goodies
Beyond the original writeup of the component pattern, we can optimize even more.

### controllerAs
Interally, the directive should always refer to its controller as `ctrl`. This creates reusable and more maintainable code.

### avoid `$scope` in controller
Avoid using `$scope` in your controllers to set values if possible. You can use `this.something = "value"` in controllers and refer to `ctrl.something` in your template. You will need to use `$scope` to access data handed to the isolate scope, though.

### fs.readFileSync the template
If your component has a template, then fs.readFileSync it. This is made possible by the browserify transform [brfs](https://github.com/substack/brfs).

## Build process

This boilerplate is build using npm scripts.

`npm run serve` opens browser for development with livereload.

`npm run dist` creates browserify bundles in `dist/` folder.

`npm test` runs the tests.

`npm run watch` executes `npm test` when `index.js` changes.
