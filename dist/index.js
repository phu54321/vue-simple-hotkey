module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("jquery");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addHotkeyToMap;
/* harmony export (immutable) */ __webpack_exports__["b"] = removeHotkeyFromMap;
/* harmony export (immutable) */ __webpack_exports__["c"] = queryHotkeyHandler;
/* unused harmony export getHotkeyMap */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jquery_hotkeys__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dispatch__ = __webpack_require__(2);
// Copyright (c) 2018 Hyun Woo Park
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT


var hotkeyHandlersMap = new Map();
function addHotkeyToMap(kString, vnode, title, maxHotkeyDepth, packName) {
  if (!hotkeyHandlersMap.has(kString)) {
    hotkeyHandlersMap.set(kString, []);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__jquery_hotkeys__["a" /* registerHotkeyHandler */])(kString, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__dispatch__["a" /* createHotkeyDispatcher */])(kString));
  } // Remove any duplicate hotkeys that might exists


  var targetEl = vnode.elm;
  removeHotkeyFromMap(kString, targetEl); // Add hotkey to element and all of the ancestors

  hotkeyHandlersMap.get(kString).push({
    targetEl: targetEl,
    vnode: vnode,
    title: title,
    maxHotkeyDepth: maxHotkeyDepth,
    packName: packName
  });
}
function removeHotkeyFromMap(kString, targetEl) {
  if (!hotkeyHandlersMap.has(kString)) return;
  var handlerList = hotkeyHandlersMap.get(kString);
  var index = handlerList.findIndex(function (e) {
    return e.targetEl === targetEl;
  });
  if (index === -1) return;
  handlerList.splice(index, 1);
}
function queryHotkeyHandler(kString, originElement) {
  var parentsFromActiveElement = [];
  var backgroundElement = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__dispatch__["b" /* getBackgroundElement */])();

  for (var el = originElement; el; el = el.parentElement) {
    parentsFromActiveElement.push(el);
    if (el === backgroundElement) break;
  }

  var handlerList = hotkeyHandlersMap.get(kString);
  var matchedHandler = null;
  var matchedElementIndex = parentsFromActiveElement.length;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = handlerList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var handler = _step.value;
      var targetEl = handler.targetEl;
      var maxHotkeyDepth = handler.maxHotkeyDepth || Infinity;

      for (var _el = targetEl; _el; _el = _el.parentElement) {
        var elIndex = parentsFromActiveElement.indexOf(_el);

        if (elIndex !== -1 && elIndex <= matchedElementIndex) {
          if (elIndex === matchedElementIndex) matchedHandler = null;else matchedHandler = handler;
          matchedElementIndex = elIndex;
          break;
        }

        if (maxHotkeyDepth === 0) break;
        maxHotkeyDepth--;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return matchedHandler;
}
/**
 * Get list of hotkeys grouped by pack names.
 * @param {HTMLElement} el Root element
 */

function getHotkeyMap(el) {
  var ret = {};
  el = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__dispatch__["c" /* getEventDispatchOrigin */])(el);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = hotkeyHandlersMap.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var kString = _step2.value;
      var handler = queryHotkeyHandler(kString, el);

      if (handler) {
        ret[kString] = handler;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return ret;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getBackgroundElement;
/* harmony export (immutable) */ __webpack_exports__["c"] = getEventDispatchOrigin;
/* harmony export (immutable) */ __webpack_exports__["a"] = createHotkeyDispatcher;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__clickElement__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hotkeymap__ = __webpack_require__(1);
// Copyright (c) 2018 Hyun Woo Park
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT


/**
 * Find the 'background' element. This will be the modal background on
 * bootstrap.
 */

function getBackgroundElement() {
  // Support for bootstrap: return currrent modal's container element.
  var modalDialogs = document.querySelectorAll('.modal.show');
  if (modalDialogs.length === 1) return modalDialogs[0];
  return document.body;
}
/**
 * Finds which element should be assumed for the origin of hotkey request.
 *
 * @param {HTMLElement?} eventTargetEl: Element the event has been dispatched
 */

function getEventDispatchOrigin(eventTargetEl) {
  if (eventTargetEl === undefined) eventTargetEl = document.activeElement;
  if (eventTargetEl && eventTargetEl !== document.body) return eventTargetEl;
  return getBackgroundElement();
}
function createHotkeyDispatcher(kString) {
  return function (e) {
    var activeElement = getEventDispatchOrigin(e.target);
    var matchedHandler = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__hotkeymap__["c" /* queryHotkeyHandler */])(kString, activeElement);

    if (matchedHandler) {
      e.stopPropagation();
      e.preventDefault();
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__clickElement__["a" /* clickVNode */])(matchedHandler.vnode);
    }
  };
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hotkeymap__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Copyright (c) 2018 Hyun Woo Park
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT


/**
 * Register hotkey
 * @param {HTMLElement} el Element the hotkey is attached to
 * @param {*} binding vue directive binding
 * @param {import('vue').VNode} vnode Vue.js vnode.
 *  registered to non-vue-element. (span/div/button)
 */

function registerHotkey(el, binding, vnode) {
  var hotkeyList = binding.value;
  if (typeof hotkeyList === 'string') hotkeyList = [hotkeyList];
  hotkeyList = hotkeyList.map(function (x) {
    return x.toLowerCase();
  }); // non-standard properties like 'pack-name' goes to props in vue components
  // and to attrs in DOM element. Merge them to handle both cases.

  var props = Object.assign({}, vnode.data.attrs, vnode.data.props);
  var title = props.title || __WEBPACK_IMPORTED_MODULE_1_jquery___default()(el).text() || '(untitled hotkey)';
  var packName = props.packName || props['pack-name'] || 'Hotkeys';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = hotkeyList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var kString = _step.value;
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__hotkeymap__["a" /* addHotkeyToMap */])(kString, vnode, title, binding.arg | 0, packName);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  el.dataset.hotkeyList = hotkeyList.join('|');
}

function unregisterHotkey(el) {
  var hotkeyList = el.dataset.hotkeyList.split('|');
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = hotkeyList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var kString = _step2.value;
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__hotkeymap__["b" /* removeHotkeyFromMap */])(kString, el);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = ({
  install: function install(Vue) {
    Vue.directive('hotkey', {
      bind: function bind(el, binding, vnode) {
        registerHotkey(el, binding, vnode);
      },
      update: function update(el, binding, vnode) {
        unregisterHotkey(el);
        registerHotkey(el, binding, vnode);
      },
      unbind: function unbind(el) {
        unregisterHotkey(el);
      }
    });
    Vue.component('hotkey-pack', {
      props: ['depth', 'pack', 'packName'],
      render: function render(h) {
        var _this = this;

        return h('div', {
          class: {
            invisible: true
          }
        }, this.pack.map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          return h('span', {
            directives: [{
              name: 'hotkey',
              arg: _this.depth + 1,
              value: key
            }],
            props: {
              packName: _this.packName
            }
          }, [value]);
        }));
      }
    });
  }
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = registerHotkeyHandler;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* jslint browser: true */

/* jslint jquery: true */
// Copyright (c) 2018 Hyun Woo Park
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
// This is a slightly modified version of jquery.hotkeys for
// use with VueSimpleHotkeys. Original license below.

/*
 * $ Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * https://github.com/tzuryby/jquery.hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
 */


(function ($) {
  var hotkeyInputWhitelist = {};
  $.hotkeyInputWhitelist = hotkeyInputWhitelist;
  $.hotkeys = {
    version: '0.2.0',
    specialKeys: {
      8: 'backspace',
      9: 'tab',
      10: 'enter',
      13: 'enter',
      16: 'shift',
      17: 'ctrl',
      18: 'alt',
      19: 'pause',
      20: 'capslock',
      27: 'esc',
      32: 'space',
      33: 'pageup',
      34: 'pagedown',
      35: 'end',
      36: 'home',
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
      45: 'insert',
      46: 'del',
      59: ';',
      61: '=',
      96: '0',
      97: '1',
      98: '2',
      99: '3',
      100: '4',
      101: '5',
      102: '6',
      103: '7',
      104: '8',
      105: '9',
      106: '*',
      107: '+',
      109: '-',
      110: '.',
      111: '/',
      112: 'f1',
      113: 'f2',
      114: 'f3',
      115: 'f4',
      116: 'f5',
      117: 'f6',
      118: 'f7',
      119: 'f8',
      120: 'f9',
      121: 'f10',
      122: 'f11',
      123: 'f12',
      144: 'numlock',
      145: 'scroll',
      173: '-',
      186: ';',
      187: '=',
      188: ',',
      189: '-',
      190: '.',
      191: '/',
      192: '`',
      219: '[',
      220: '\\',
      221: ']',
      222: '\''
    },
    shiftNums: {
      '`': '~',
      '1': '!',
      '2': '@',
      '3': '#',
      '4': '$',
      '5': '%',
      '6': '^',
      '7': '&',
      '8': '*',
      '9': '(',
      '0': ')',
      '-': '_',
      '=': '+',
      ';': ': ',
      '\'': '"',
      ',': '<',
      '.': '>',
      '/': '?',
      '\\': '|'
    },
    // excludes: button, checkbox, file, hidden, image, password, radio, reset, search, submit, url
    textAcceptingInputTypes: ['text', 'password', 'number', 'email', 'url', 'range', 'date', 'month', 'week', 'time', 'datetime', 'datetime-local', 'search', 'color', 'tel'],
    // default input types not to bind to unless bound directly
    textInputTypes: /textarea|input|select/i,
    options: {
      filterInputAcceptingElements: true,
      filterTextInputs: true,
      filterContentEditable: true
    }
  };

  function keyHandler(handleObj) {
    if (typeof handleObj.data === 'string') {
      handleObj.data = {
        keys: handleObj.data
      };
    } // Only care when a possible input has been specified


    if (!handleObj.data || !handleObj.data.keys || typeof handleObj.data.keys !== 'string') {
      return;
    }

    var origHandler = handleObj.handler;
    var keys = handleObj.data.keys.toLowerCase().split(' ');

    handleObj.handler = function (event) {
      // Don't fire in text-accepting inputs that we didn't directly bind to
      if (this !== event.target && ($.hotkeys.options.filterInputAcceptingElements && $.hotkeys.textInputTypes.test(event.target.nodeName) || $.hotkeys.options.filterContentEditable && $(event.target).attr('contenteditable') || $.hotkeys.options.filterTextInputs && $.inArray(event.target.type, $.hotkeys.textAcceptingInputTypes) > -1)) {
        var splitKeys = keys[0].split('+');
        if (!(splitKeys.length === 1 && splitKeys[0] === 'esc' || splitKeys.indexOf('ctrl') !== -1 || splitKeys.indexOf('meta') !== -1 || splitKeys.indexOf('alt') !== -1)) return;
      }

      var special = event.type !== 'keypress' && $.hotkeys.specialKeys[event.which];
      var character = String.fromCharCode(event.which).toLowerCase();
      var modif = '';
      var possible = {};
      $.each(['alt', 'ctrl', 'shift'], function (index, specialKey) {
        if (event[specialKey + 'Key'] && special !== specialKey) {
          modif += specialKey + '+';
        }
      }); // metaKey is triggered off ctrlKey erronously

      if (event.metaKey && !event.ctrlKey && special !== 'meta') {
        modif += 'ctrl+';
      }

      if (event.metaKey && special !== 'meta' && modif.indexOf('alt+ctrl+shift+') > -1) {
        modif = modif.replace('alt+ctrl+shift+', 'hyper+');
      }

      if (special) {
        possible[modif + special] = true;
      } else {
        possible[modif + character] = true;
        possible[modif + $.hotkeys.shiftNums[character]] = true; // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"

        if (modif === 'shift+') {
          possible[$.hotkeys.shiftNums[character]] = true;
        }
      }

      for (var i = 0, l = keys.length; i < l; i++) {
        if (possible[keys[i]]) {
          return origHandler.apply(this, arguments);
        }
      }
    };
  }

  $.each(['keydown', 'keyup', 'keypress'], function () {
    $.event.special[this] = {
      add: keyHandler
    };
  });
})(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

function registerHotkeyHandler(kString, f) {
  __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).bind('keydown', kString, f);
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultRule */
/* harmony export (immutable) */ __webpack_exports__["a"] = clickVNode;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
// Copyright (c) 2018 Hyun Woo Park
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

var defaultRule = {
  classRules: {
    multiselect: function multiselect(el) {
      return el.focus();
    },
    'dropdown-toggle': function dropdownToggle(el) {
      return el.dispatchEvent(new MouseEvent('mousedown'));
    }
  },
  tagNameRules: {
    a: function a(el) {
      return el.click();
    },
    button: function button(el) {
      return el.click();
    }
  },
  vnodeNameRules: {
    'b-modal': function bModal(v) {
      return v.show();
    }
  }
  /**
   * 'click' a node.
   *
   * Since many elements have different ways of 'click's, this code got
   * quite complicated.
   *
   * @param {VNode} vnode node to click
   */

};
function clickVNode(vnode) {
  var rule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultRule;
  var classRules = rule.classRules,
      tagNameRules = rule.tagNameRules,
      vnodeNameRules = rule.vnodeNameRules;
  var el = vnode.elm; // Vue component-based overrides

  if (vnode.componentOptions) {
    var vnodeName = vnode.componentOptions.tag;

    if (vnodeNameRules[vnodeName]) {
      return vnodeNameRules[vnodeName](vnode.context.$children[0]);
    }
  } // Sometimes the child of selected element should be clicked.
  // We assume that such child is at the center of the current element
  // and check for tagname/classname based rules for such elements.


  var targetEl = getElementOnElementCenter(el);

  if (isDescendant(targetEl, el)) {
    while (targetEl !== null) {
      // Classname-based overrides
      var _arr = Object.keys(classRules);

      for (var _i = 0; _i < _arr.length; _i++) {
        var cssClass = _arr[_i];

        if (targetEl.classList.contains(cssClass)) {
          var classRule = classRules[cssClass];
          return classRule(targetEl);
        }
      } // Tag name based overrides


      var targetTagName = targetEl.tagName.toLowerCase();
      var nameRule = tagNameRules[targetTagName];

      if (nameRule) {
        nameRule(targetEl);
        return;
      }

      if (targetEl === el) break;
      targetEl = targetEl.parentElement;
    }
  } // Fallback


  el.click();
}

function getElementOnElementCenter(el) {
  var $el = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el);

  var _$el$offset = $el.offset(),
      left = _$el$offset.left,
      top = _$el$offset.top;

  var width = $el.width();
  var height = $el.height();
  return document.elementFromPoint(left + width / 2, top + height / 2);
}

function isDescendant(child, parent) {
  var el = child;

  while (el) {
    if (el === parent) return true;
    el = el.parentElement;
  }

  return false;
}

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map