// Copyright (c) 2018 Hyun Woo Park
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { registerHotkeyHandler } from './jquery.hotkeys'
import { createHotkeyDispatcher, getBackgroundElement, getEventDispatchOrigin } from './dispatch'

const hotkeyHandlersMap = new Map()

export function addHotkeyToMap (kString, vnode, title, maxHotkeyDepth, packName) {
  if (!hotkeyHandlersMap.has(kString)) {
    hotkeyHandlersMap.set(kString, [])
    registerHotkeyHandler(kString, createHotkeyDispatcher(kString))
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

export function queryHotkeyHandler (kString, originElement) {
  const parentsFromActiveElement = []
  const backgroundElement = getBackgroundElement()
  for (let el = originElement; el; el = el.parentElement) {
    parentsFromActiveElement.push(el)
    if (el === backgroundElement) break
  }

  const handlerList = hotkeyHandlersMap.get(kString)
  let matchedHandler = null
  let matchedElementIndex = parentsFromActiveElement.length

  for (const handler of handlerList) {
    const { targetEl } = handler
    let maxHotkeyDepth = handler.maxHotkeyDepth || Infinity

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

  el = getEventDispatchOrigin(el)
  for (const kString of hotkeyHandlersMap.keys()) {
    const handler = queryHotkeyHandler(kString, el)
    if (handler) {
      ret[kString] = handler
    }
  }
  return ret
}
