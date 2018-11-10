import { expect } from 'chai'
import { mount } from '@vue/test-utils'

import VueSimpleHotkey from '../../src/index'
import Vue from 'vue'
import keypress from '../utils/keypress'

const SpanClickVue = {
  template: `
  <div>
    <span v-hotkey="'space'" @click="clicked++">{{clicked}}</span>
    <input name='test'>
  </div>
  `,
  data () {
    return {
      clicked: 0
    }
  }
}

describe('ignore keystroke inside input elements', () => {
  beforeEach(() => {
    Vue.use(VueSimpleHotkey)
  })

  it('should respond to other hotkeys', async () => {
    const wrapper = mount(SpanClickVue, { attachToDocument: true })

    const inputEl = wrapper.find('input').element
    inputEl.focus()
    await keypress(inputEl, 'space')
    expect(wrapper.find('span').text()).to.equal('0')

    window.blur()
    await keypress(document.body, 'space')
    expect(wrapper.find('span').text()).to.equal('1')
  })
})
