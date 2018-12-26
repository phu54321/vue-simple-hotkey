// Copyright (c) 2018 Hyun Woo Park
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { clickVNode } from './clickElement'
import { queryHotkeyHandler } from './hotkeymap'

/**
 * Find the 'background' element. This will be the modal background on
 * bootstrap.
 */
export function getBackgroundElement () {
  // Support for bootstrap: return currrent modal's container element.
  const modalDialogs = document.querySelectorAll('.modal.show')
  if (modalDialogs.length === 1) return modalDialogs[0]

  return document.body
}

/**
 * Finds which element should be assumed for the origin of hotkey request.
 *
 * @param {HTMLElement?} eventTargetEl: Element the event has been dispatched
 */
export function getEventDispatchOrigin (eventTargetEl) {
  if (eventTargetEl === undefined) eventTargetEl = document.activeElement
  if (eventTargetEl && eventTargetEl !== document.body) return eventTargetEl
  return getBackgroundElement()
}

export function createHotkeyDispatcher (kString) {
  return function (e) {
    const activeElement = getEventDispatchOrigin(e.target)
    const matchedHandler = queryHotkeyHandler(kString, activeElement)
    if (matchedHandler) {
      e.stopPropagation()
      e.preventDefault()
      return clickVNode(matchedHandler.vnode)
    }
  }
}
