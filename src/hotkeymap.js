// Copyright (c) 2018 Hyun Woo Park
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import $ from 'jquery'
import './jquery.hotkeys'
import { clickVNode } from './clickElement'

const hotkeyHandlersMap = new Map()

/**
 * Finds which element should be accounted for the origin of hotkey request.
 *
 * @param {HTMLElement?} eventTargetEl: Element the event has been dispatched
 */
function getEventDispatchingElement (eventTargetEl) {
  if (eventTargetEl === undefined) eventTargetEl = document.activeElement

  if (eventTargetEl && eventTargetEl !== document.body) return eventTargetEl

  // Support for bootstrap-vue: If current active model is
  const modalDialogs = document.querySelectorAll('.modal.show')
  if (modalDialogs.length === 1) return modalDialogs[0]

  return document.body
}

export function addHotkeyToMap (kString, vnode, title, maxHotkeyDepth, packName) {
  if (!hotkeyHandlersMap.has(kString)) {
    hotkeyHandlersMap.set(kString, [])
    $(document).bind('keydown', kString, (e) => {
      const activeElement = getEventDispatchingElement(e.target)
      const matchedHandler = resolveHotkey(kString, activeElement)
      if (matchedHandler) {
        e.stopPropagation()
        e.preventDefault()
        return clickVNode(matchedHandler.vnode)
      }
    })
  }

  // Remove any duplicate hotkeys that might exists
  const targetEl = vnode.elm
  removeHotkeyFromMap(kString, targetEl)

  // Add hotkey to element and all of the ancestors
  hotkeyHandlersMap.get(kString).push({
    targetEl,
    vnode,
    title,
    maxHotkeyDepth,
    packName
  })
}

export function removeHotkeyFromMap (kString, targetEl) {
  if (!hotkeyHandlersMap.has(kString)) return
  const handlerList = hotkeyHandlersMap.get(kString)
  const index = handlerList.findIndex((e) => e.targetEl === targetEl)
  if (index === -1) return
  handlerList.splice(index, 1)
}

export function resolveHotkey (kString, activeElement) {
  const parentsFromActiveElement = []
  for (let el = activeElement; el; el = el.parentElement) {
    parentsFromActiveElement.push(el)
    if (el.classList.contains('modal') && el.classList.contains('show')) break
  }

  const handlerList = hotkeyHandlersMap.get(kString)
  let matchedHandler = null
  let matchedElementIndex = parentsFromActiveElement.length

  for (const handler of handlerList) {
    const { targetEl } = handler
    let maxHotkeyDepth = handler.maxHotkeyDepth || 10000

    for (let el = targetEl; el; el = el.parentElement) {
      const elIndex = parentsFromActiveElement.indexOf(el)
      if (elIndex !== -1 && elIndex <= matchedElementIndex) {
        if (elIndex === matchedElementIndex) matchedHandler = null
        else matchedHandler = handler
        matchedElementIndex = elIndex
        break
      }
      if (maxHotkeyDepth === 0) break
      maxHotkeyDepth--
    }
  }

  return matchedHandler
}

/**
 * Get list of hotkeys grouped by pack names.
 * @param {HTMLElement} el Root element
 */
export function getHotkeyMap (el) {
  const ret = {}

  el = getEventDispatchingElement(el)
  for (const kString of hotkeyHandlersMap.keys()) {
    const handler = resolveHotkey(kString, el)
    if (handler) {
      ret[kString] = handler
    }
  }
  return ret
}
