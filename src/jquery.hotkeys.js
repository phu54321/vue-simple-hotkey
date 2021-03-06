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

import $ from 'jquery';

(function ($) {
  var hotkeyInputWhitelist = {}
  $.hotkeyInputWhitelist = hotkeyInputWhitelist

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
    textAcceptingInputTypes: [
      'text', 'password', 'number', 'email', 'url', 'range', 'date', 'month', 'week', 'time', 'datetime',
      'datetime-local', 'search', 'color', 'tel'],

    // default input types not to bind to unless bound directly
    textInputTypes: /textarea|input|select/i,

    options: {
      filterInputAcceptingElements: true,
      filterTextInputs: true,
      filterContentEditable: true
    }
  }

  function keyHandler (handleObj) {
    if (typeof handleObj.data === 'string') {
      handleObj.data = {
        keys: handleObj.data
      }
    }

    // Only care when a possible input has been specified
    if (!handleObj.data || !handleObj.data.keys || typeof handleObj.data.keys !== 'string') {
      return
    }

    var origHandler = handleObj.handler
    var keys = handleObj.data.keys.toLowerCase().split(' ')

    handleObj.handler = function (event) {
      // Don't fire in text-accepting inputs that we didn't directly bind to
      if (
        this !== event.target &&
        (
          ($.hotkeys.options.filterInputAcceptingElements && $.hotkeys.textInputTypes.test(event.target.nodeName)) ||
          ($.hotkeys.options.filterContentEditable && $(event.target).attr('contenteditable')) ||
          ($.hotkeys.options.filterTextInputs && $.inArray(event.target.type, $.hotkeys.textAcceptingInputTypes) > -1)
        )
      ) {
        const splitKeys = keys[0].split('+')
        if (!(
          (splitKeys.length === 1 && splitKeys[0] === 'esc') ||
                    splitKeys.indexOf('ctrl') !== -1 ||
                    splitKeys.indexOf('meta') !== -1 ||
                    splitKeys.indexOf('alt') !== -1
        )) return
      }

      var special = event.type !== 'keypress' && $.hotkeys.specialKeys[event.which]
      var character = String.fromCharCode(event.which).toLowerCase()
      var modif = ''
      var possible = {}

      $.each(['alt', 'ctrl', 'shift'], function (index, specialKey) {
        if (event[specialKey + 'Key'] && special !== specialKey) {
          modif += specialKey + '+'
        }
      })

      // metaKey is triggered off ctrlKey erronously
      if (event.metaKey && !event.ctrlKey && special !== 'meta') {
        modif += 'ctrl+'
      }

      if (event.metaKey && special !== 'meta' && modif.indexOf('alt+ctrl+shift+') > -1) {
        modif = modif.replace('alt+ctrl+shift+', 'hyper+')
      }

      if (special) {
        possible[modif + special] = true
      } else {
        possible[modif + character] = true
        possible[modif + $.hotkeys.shiftNums[character]] = true

        // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
        if (modif === 'shift+') {
          possible[$.hotkeys.shiftNums[character]] = true
        }
      }

      for (var i = 0, l = keys.length; i < l; i++) {
        if (possible[keys[i]]) {
          return origHandler.apply(this, arguments)
        }
      }
    }
  }

  $.each(['keydown', 'keyup', 'keypress'], function () {
    $.event.special[this] = {
      add: keyHandler
    }
  })
})($)
