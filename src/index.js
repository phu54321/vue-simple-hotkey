// Copyright (c) 2018 Hyun Woo Park
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { addHotkeyToMap, removeHotkeyFromMap } from './hotkeymap'
import $ from 'jquery'

/**
 * Register hotkey
 * @param {HTMLElement} el Element the hotkey is attached to
 * @param {*} binding vue directive binding
 * @param {import('vue').VNode} vnode Vue.js vnode.
 *  registered to non-vue-element. (span/div/button)
 */
function registerHotkey (el, binding, vnode) {
  let hotkeyList = binding.value
  if (typeof hotkeyList === 'string') hotkeyList = [hotkeyList]
  hotkeyList = hotkeyList.map(x => x.toLowerCase())

  // non-standard properties like 'pack-name' goes to props in vue components
  // and to attrs in DOM element. Merge them to handle both cases.
  const props = Object.assign({}, vnode.data.attrs, vnode.data.props)
  const title = props.title || $(el).text() || '(untitled hotkey)'
  const packName = props.packName || props['pack-name'] || 'Hotkeys'

  for (let kString of hotkeyList) {
    addHotkeyToMap(kString, vnode, title, binding.arg | 0, packName)
  }

  el.dataset.hotkeyList = hotkeyList.join('|')
}

function unregisterHotkey (el) {
  const hotkeyList = el.dataset.hotkeyList.split('|')
  for (let kString of hotkeyList) {
    removeHotkeyFromMap(kString, el)
  }
}

export default {
  install (Vue) {
    Vue.directive('hotkey', {
      bind (el, binding, vnode) {
        registerHotkey(el, binding, vnode)
      },
      update (el, binding, vnode) {
        unregisterHotkey(el)
        registerHotkey(el, binding, vnode)
      },
      unbind (el) {
        unregisterHotkey(el)
      }
    })

    Vue.component('hotkey-pack', {
      props: ['depth', 'pack', 'packName'],
      render (h) {
        return h(
          'div',
          { class: { invisible: true } },
          this.pack.map(([key, value]) => h('span', {
            directives: [
              { name: 'hotkey', arg: this.depth + 1, value: key }
            ],
            props: {
              packName: this.packName
            }
          }, [value]))
        )
      }
    })
  }
}
