(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = angular.module('myApp', [])
var eeTile = require('../../')
eeTile(app)

},{"../../":2}],2:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

exports = module.exports = eeTile;
exports.directive = directive;
exports.ctrl = ctrl;
exports.getMainStyles = getMainStyles;
exports.getBarStyles = getBarStyles;

var textfit = _interopRequire(require("textfit"));

var ellipsis = _interopRequire(require("html-ellipsis"));

function eeTile(module) {
  module.directive("eeTile", directive);
}

if ("angular" in global) {
  eeTile(angular.module("eeTile", []));
}

function directive($timeout) {
  return {
    scope: {
      options: "&"
    },
    restrict: "E",
    controller: ctrl,
    controllerAs: "ctrl",
    template: "<div class=\"ee-tile-main\" ng-style=\"ctrl.mainStyle\">\n  <div class=\"ee-tile-content\">\n    {{ctrl.options.text}}\n  </div>\n</div>\n<div class=\"ee-tile-bottom-bar\" ng-style=\"ctrl.barStyle\" ng-if=\"ctrl.barRendered\">\n  {{ctrl.options.barText}}\n</div>\n<!-- <i class=\"ee-tile-icon\" ng-if=\"ctrl.options.icon\" class=\"{{ctrl.options.icon}}\"></i> -->\n",
    link: function (scope, element) {
      var options = scope.options;
      if (options.fitText !== false) {
        $timeout(function () {
          var el = element[0].querySelector(".ee-tile-content");
          var settings = {
            minFontSize: 10,
            maxFontSize: 100
          };
          textfit(el, settings);
        });
      }
      if (options.ellipsis !== false) {
        (function () {
          var count = 150;
          if ("number" === typeof scope.options.ellipsis) {
            count = scope.options.ellipsis;
          }
          $timeout(function () {
            var content = element[0].querySelector(".ee-tile-content");
            var html = content.innerHTML;
            var ellipsed = ellipsis(html, count);
            if (ellipsed.length < html.length) {
              content.innerHTML = ellipsed;
            }
          });
        })();
      }
    }
  };
}

function ctrl($scope, $element) {
  var options = this.options = $scope.options();

  this.mainStyle = getMainStyles(options);
  this.barStyle = getBarStyles(options);
  this.barRendered = options.bar !== false;
}

function getMainStyles(options) {
  if (options === undefined) options = {};
  var background = options.background;
  var image = options.image;
  var styles = {};

  if (typeof image === "string") {
    styles.backgroundImage = "url(" + image + ")";
    styles.backgroundSize = "cover";
  }

  if (typeof background === "string") {
    styles.background = background;
  }

  return styles;
}

function getBarStyles(options) {
  if (options === undefined) options = {};
  var background = options.bar;

  if ("string" !== typeof background) {
    return {};
  }
  return {
    background: background
  };
}


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"html-ellipsis":3,"textfit":4}],3:[function(require,module,exports){
/**
 * @module html-ellipsis
 * @version 1.0.0
 * @exports htmlEllipsis
 *
 * @copyright 2014 Alex Gherghisan
 * @license MIT
 */

(function(root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports !== 'undefined') {
		module.exports = factory();
	} else {
		root.htmlEllipsis = factory();
	}
}(this, function factory() {
	'use strict';

	/** Extracts <tag id="foo"> from a larger string. Assumes str[startIdx] === '<' */
	function extractTag(str, startIdx) {
		var endIdx = str.indexOf('>', startIdx);
		return str.slice(startIdx, endIdx + 1);
	}

	/** Checks that <tag> is an end tag */
	function isEndTag(tag) {
		return tag[1] === '/';
	}

	/** Extracts tag from <tag id="foo"> */
	function extractTagName(tag) {
		var tagNameEndIdx = tag.indexOf(' ');
		if (tagNameEndIdx === -1) {
			// check for <br/> style tags
			tagNameEndIdx = tag.indexOf('/');

			if (tagNameEndIdx === -1) {
				tagNameEndIdx = tag.length - 1;
			}
		}

		return tag.slice(1, tagNameEndIdx);
	}

	// taken from http://webdesign.about.com/od/htmltags/qt/html-void-elements.htm
	var voidTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'wbr'];

	/** Checks that tagName is a void tag (it doesn't have an end tag) */
	function isVoidTag(tagName) {
		for (var i = voidTags.length - 1; i >= 0; --i) {
			if (tagName === voidTags[i]) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Truncates a string to maxLength chars without destroying HTML tags.
	 * Optionally adds ellipsis to the end of the string (this does not make the string larger than maxLength)
	 *
	 * @param {string} html - The HTML string to truncate. The function assumes valid HTML.
	 * @param {number} maxLength - The max truncated length
	 * @param {boolean} [opt_addEllipsis = false] - Add &hellip; at the end of the string.
	 *
	 * @returns {string}
	 */
	return function htmlEllipsis(html, maxLength, opt_addEllipsis) {
		var len = html.length;
		if (len <= maxLength) {
			return html; 
		}

		// leave room for ellipsis
		if (opt_addEllipsis) {
			--maxLength;
		}

		var i = 0;
		var charCount = 0;
		var tagStack = [];

		while (i < len && charCount < maxLength) {
			if (html[i] === '<') {
				var tag = extractTag(html, i);

				// skip content between < and >
				i += tag.length;

				if (isEndTag(tag)) {
					tagStack.pop();
				} else {
					var tagName = extractTagName(tag);

					if (!isVoidTag(tagName)) {
						tagStack.push(tagName);
					}
				}
			} else {
				++charCount;
				++i;
			}
		}

		var result = html.slice(0, i);

		for (var j = tagStack.length - 1; j >= 0; --j) {
			result += '</' + tagStack[j] + '>';
		}

		if (opt_addEllipsis && result.length < html.length) {
			result += '&hellip;';
		}

		return result;
	};
}));


},{}],4:[function(require,module,exports){
(function (global){
/**
 * textFit v2.1.1
 * Previously known as jQuery.textFit
 * 11/2014 by STRML (strml.github.com)
 * MIT License
 * 
 * To use: textFit(document.getElementById('target-div'), options);
 * 
 * Will make the *text* content inside a container scale to fit the container
 * The container is required to have a set width and height
 * Uses binary search to fit text with minimal layout calls.
 * Version 2.0 does not use jQuery.
 */
/*global define:true, document:true, window:true, HTMLElement:true*/

(function(root, factory) {
  "use strict";

  // UMD shim
  if (typeof define === "function" && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === "object") {
    // Node/CommonJS
    module.exports = factory();
  } else {
    // Browser
    root.textFit = factory();
  }

}(typeof global === "object" ? global : this, function () {
  "use strict";

  return function textFit(els, options) {
    var settings = {
      alignVert: false, // if true, textFit will align vertically using css tables
      alignHoriz: false, // if true, textFit will set text-align: center
      multiLine: false, // if true, textFit will not set white-space: no-wrap
      detectMultiLine: true, // disable to turn off automatic multi-line sensing
      minFontSize: 6,
      maxFontSize: 80,
      reProcess: true, // if true, textFit will re-process already-fit nodes. Set to 'false' for better performance
      widthOnly: false, // if true, textFit will fit text to element width, regardless of text height
      suppressErrors: false // if true, will not print errors to console
    };

    // Extend options.
    for(var key in options){
      if(options.hasOwnProperty(key)){
        settings[key] = options[key];
      }
    }

    // Convert jQuery objects into arrays
    if (typeof els.toArray === "function") {
      els = els.toArray();
    }

    // Support passing a single el
    var elType = Object.prototype.toString.call(els);
    if (elType !== '[object Array]' && elType !== '[object NodeList]'){
      els = [els];
    }

    for(var i = 0; i < els.length; i++){
      processItem(els[i]);
    }

    function processItem(el){

      if (!isElement(el) || (!settings.reProcess && el.getAttribute('textFitted'))) {
        return false;
      }

      // Set textFitted attribute so we know this was processed.
      if(!settings.reProcess){
        el.setAttribute('textFitted', 1);
      }

      var innerSpan, originalHeight, originalHTML, originalWidth;
      var low, mid, high;

      // Get element data.
      originalHTML = el.innerHTML;
      originalWidth = innerWidth(el);
      originalHeight = innerHeight(el);

      // Don't process if we can't find box dimensions
      if (!originalWidth || (!settings.widthOnly && !originalHeight)) {
        // Show an error, if we can.
        if (window.console && !settings.suppressErrors) {
          if(!settings.widthOnly)
            console.info('Set a static height and width on the target element ' + el.outerHTML +
              ' before using textFit!');
          else
            console.info('Set a static width on the target element ' + el.outerHTML +
              ' before using textFit!');
        }
        return false;
      }

      // Add textFitted span inside this container.
      if (originalHTML.indexOf('textFitted') === -1) {
        innerSpan = document.createElement('span');
        innerSpan.className = 'textFitted';
        // Inline block ensure it takes on the size of its contents, even if they are enclosed
        // in other tags like <p>
        innerSpan.style['display'] = 'inline-block';
        innerSpan.innerHTML = originalHTML;
        el.innerHTML = '';
        el.appendChild(innerSpan);
      } else {
        // Reprocessing.
        innerSpan = el.querySelector('span.textFitted');
        // Remove vertical align if we're reprocessing.
        if (hasClass(innerSpan, 'textFitAlignVert')){
          innerSpan.className = innerSpan.className.replace('textFitAlignVert', '');
          innerSpan.style['height'] = '';
        }
      }

      // Prepare & set alignment
      if (settings.alignHoriz) {
        el.style['text-align'] = 'center';
        innerSpan.style['text-align'] = 'center';
      }

      // Check if this string is multiple lines
      // Not guaranteed to always work if you use wonky line-heights
      var multiLine = settings.multiLine;
      if (settings.detectMultiLine && !multiLine &&
          innerSpan.offsetHeight >= parseInt(window.getComputedStyle(innerSpan)['font-size'], 10) * 2){
        multiLine = true;
      }

      // If we're not treating this as a multiline string, don't let it wrap.
      if (!multiLine) {
        el.style['white-space'] = 'nowrap';
      }

      low = settings.minFontSize + 1;
      high = settings.maxFontSize + 1;

      // Binary search for best fit
      while ( low <= high) {
        mid = parseInt((low + high) / 2, 10);
        innerSpan.style.fontSize = mid + 'px';
        if(innerSpan.offsetWidth <= originalWidth && (settings.widthOnly || innerSpan.offsetHeight <= originalHeight)){
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      // Sub 1 at the very end, this is closer to what we wanted.
      innerSpan.style.fontSize = (mid - 1) + 'px';

      // Our height is finalized. If we are aligning vertically, set that up.
      if (settings.alignVert) {
        addStyleSheet();
        var height = innerSpan.offsetHeight;
        if (window.getComputedStyle(el)['position'] === "static"){
          el.style['position'] = 'relative';
        }
        if (!hasClass(innerSpan, "textFitAlignVert")){
          innerSpan.className = innerSpan.className + " textFitAlignVert";
        }
        innerSpan.style['height'] = height + "px";
      }
        
    }

    // Calculate height without padding.
    function innerHeight(el){
      var style = window.getComputedStyle(el, null);
      return el.clientHeight -
        parseInt(style.getPropertyValue('padding-top'), 10) -
        parseInt(style.getPropertyValue('padding-bottom'), 10);
    }

    // Calculate width without padding.
    function innerWidth(el){
      var style = window.getComputedStyle(el, null);
      return el.clientWidth -
        parseInt(style.getPropertyValue('padding-left'), 10) -
        parseInt(style.getPropertyValue('padding-right'), 10);
    }

    //Returns true if it is a DOM element    
    function isElement(o){
      return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
      );
    }

    function hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    // Better than a stylesheet dependency
    function addStyleSheet() {
      if (document.getElementById("textFitStyleSheet")) return;
      var style = [
        ".textFitAlignVert{",
          "position: absolute;",
          "top: 0; right: 0; bottom: 0; left: 0;",
          "margin: auto;",
        "}"].join("");

      var css = document.createElement("style");
      css.type = "text/css";
      css.id = "textFitStyleSheet";
      css.innerHTML = style;
      document.body.appendChild(css);
    }
  };
}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
