# ee-tile
[![Build Status](https://travis-ci.org/excellenteasy/ee-tile.svg?branch=master)](https://travis-ci.org/excellenteasy/ee-tile)
[![Code Climate](https://codeclimate.com/github/excellenteasy/ee-tile/badges/gpa.svg)](https://codeclimate.com/github/excellenteasy/ee-tile)
[![Dependency Status](https://david-dm.org/excellenteasy/ee-tile.svg)](https://david-dm.org/excellenteasy/ee-tile)
[![devDependency Status](https://david-dm.org/excellenteasy/ee-tile/dev-status.svg)](https://david-dm.org/excellenteasy/ee-tile#info=devDependencies)

> A UI component for angular apps to display media and text content in tiles. Inspired by material design.

## Visual examples

> Height of the component is dependening on the width, as the main area will always be a square.

![ee-media-tile-abp](https://cloud.githubusercontent.com/assets/908242/5782416/02fb453c-9dbb-11e4-95e1-4de615a02fe8.png)

## Usage

[Using a `script` tag](https://github.com/excellenteasy/ee-tile/tree/master/examples):

```html
<script src="ee-tile.js"></script>
<script>
// Add eeTile as dependency to your module definition
var app = angular.module('YourApp', ['eeTile']);
</script>
```

[Using browserify](https://github.com/excellenteasy/ee-tile/tree/master/examples/browserify):

> You need to browserify your source code with the [`brfs`](https://github.com/substack/brfs) transform, if you require ee-tile from [`index.js`](https://github.com/excellenteasy/ee-tile/blob/master/package.json#L5) source.

```javascript
var app = angular.module('myApp', [])
require('ee-tile')(app)
```

## API

The API of the component can be used via attributes on the directive, which has an isolated scope. The tile is devided in four areas:

![ee-media-tile](https://cloud.githubusercontent.com/assets/908242/5564186/c7c1f33c-8eae-11e4-8272-03a515af1111.png)

We call the area with 1 and 2 "main" and the area of 3 and 4 "bottom bar".

You can provide options to the directive to change the default behavior regarding these areas:

```html
<ee-tile options="{...}"></ee-tile>
```

### background (color)
You can set the background color of the main area using the `background` option. This will be used as the value for the css `background` property.

```html
<ee-tile options="{background: 'red'}"></ee-tile>
<ee-tile options="{background: 'rgba(0,0,0,0.5)'}"></ee-tile>
```

### cover image

To fill the main area with an image, use the `image` option to reference a URL. This will be used to set a css `background-image` url.

```html
<ee-tile options="{image: '../cover.jpg'}"></ee-tile>
```

### cover icon

If you want an icon displayed on top of the main area, use the `icon` option. This must be a css class name or space delimited set of names which will be applied as classes to the icon element.

```html
<ee-tile options="{icon: 'ion-information-circled'}"></ee-tile>
```

### main text content, fitText, ellipsis
To set text to be displayed in the main area, use the `text` option.

```html
<ee-tile options="{text: 'Lorem ipsum'}"></ee-tile>
```

The font-size is automatically set to fit and fill the main area; use `fitText` option to disable this behavior.

```html
<ee-tile options="{text: 'Lorem ipsum', fitText: false}"></ee-tile>
```

If the text exceeds the length of 140 characters, it will automatically be cut off with an ellipsis. You can change the number of characters or disable this behavior with the `ellipsis` option.

```html
<ee-tile options="{text: 'Lorem ipsum', ellipsis: 5}"></ee-tile>
<ee-tile options="{text: 'Lorem ipsum', ellipsis: false}"></ee-tile>
```

### bottom bar: background, text, disable

To set the background (color) of the bottom bar, use `bar`.

```html
<ee-tile options="{bar: 'green'}"></ee-tile>
```

You can also disable the rendering of the bottom bar by passing `false` to the `bar` option.

```html
<ee-tile options="{bar: false}"></ee-tile>
```

You can provide the text for the bottom bar in the `barText` option. Text will be fixed font-size and automatically cut off by an ellipsis.

```html
<ee-tile options="{barText: 'Foo Bar'}"></ee-tile>
```


## Build process

This is build using npm scripts.

`npm run serve` opens browser for development with livereload.

`npm run dist` creates browserify bundles in `dist/` folder.

`npm test` runs the tests.

`npm run watch` executes `npm test` when `index.es6` changes.
