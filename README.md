# ee-tile
[![Build Status](https://travis-ci.org/excellenteasy/ee-tile.svg?branch=master)](https://travis-ci.org/excellenteasy/ee-tile)
[![Code Climate](https://codeclimate.com/github/excellenteasy/ee-tile/badges/gpa.svg)](https://codeclimate.com/github/excellenteasy/ee-tile)
[![Dependency Status](https://david-dm.org/excellenteasy/ee-tile.svg)](https://david-dm.org/excellenteasy/ee-tile)
[![devDependency Status](https://david-dm.org/excellenteasy/ee-tile/dev-status.svg)](https://david-dm.org/excellenteasy/ee-tile#info=devDependencies)

> A UI component for angular apps to display media and text content in tiles. Inspired by material design.

## Usage

```javascript
<script src="ee-tile.js"></script>
<script>
// Add timeRelative as dependency to your module definition
var app = angular.module('YourApp', ['eeTile']);
</script>
```

## API


## Build process

This is build using npm scripts.

`npm run serve` opens browser for development with livereload.

`npm run dist` creates browserify bundles in `dist/` folder.

`npm test` runs the tests.

`npm run watch` executes `npm test` when `index.js` changes.
