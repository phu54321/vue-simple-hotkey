// Copyright (c) 2018 Hyun Woo Park
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import $ from 'jquery'

export const defaultRule = {
  classRules: {
    multiselect: (el) => el.focus(),
    'dropdown-toggle': (el) => el.dispatchEvent(new MouseEvent('mousedown'))
  },
  tagNameRules: {
    a: (el) => el.click(),
    button: (el) => el.click()
  },
  vnodeNameRules: {
    'b-modal': (v) => v.show()
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
export function clickVNode (vnode, rule = defaultRule) {
  const { classRules, tagNameRules, vnodeNameRules } = rule
  const el = vnode.elm

  // Vue component-based overrides
  if (vnode.componentOptions) {
    const vnodeName = vnode.componentOptions.tag
    if (vnodeNameRules[vnodeName]) {
      return vnodeNameRules[vnodeName](vnode.context.$children[0])
    }
  }

  // Sometimes the child of selected element should be clicked.
  // We assume that such child is at the center of the current element
  // and check for tagname/classname based rules for such elements.
  let targetEl = getElementOnElementCenter(el)
  if (isDescendant(targetEl, el)) {
    while (targetEl !== null) {
      // Classname-based overrides
      for (const cssClass of Object.keys(classRules)) {
        if (targetEl.classList.contains(cssClass)) {
          const classRule = classRules[cssClass]
          return classRule(targetEl)
        }
      }

      // Tag name based overrides
      const targetTagName = targetEl.tagName.toLowerCase()
      const nameRule = tagNameRules[targetTagName]
      if (nameRule) {
        nameRule(targetEl)
        return
      }

      if (targetEl === el) break
      targetEl = targetEl.parentElement
    }
  }

  // Fallback
  el.click()
}

function getElementOnElementCenter (el) {
  const $el = $(el)
  const { left, top } = $el.offset()
  const width = $el.width()
  const height = $el.height()
  return document.elementFromPoint(left + width / 2, top + height / 2)
}

function isDescendant (child, parent) {
  let el = child
  while (el) {
    if (el === parent) return true
    el = el.parentElement
  }
  return false
}
