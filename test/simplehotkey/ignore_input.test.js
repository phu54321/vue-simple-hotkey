import { expect } from 'chai'
import { mount } from '@vue/test-utils'

import VueSimpleHotkey from '../../src/index'
import Vue from 'vue'
import keypress from '../utils/keypress'

import $ from 'jquery'

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

Vue.use(VueSimpleHotkey)

describe('ignore keystroke inside input elements', () => {
  afterEach(() => {
    $('input').blur()
  })

  it('should respond to other hotkeys', async () => {
    const wrapper = mount(SpanClickVue, { attachToDocument: true })
    const inputEl = wrapper.find('input').element
    inputEl.focus()
    await keypress('space')
    expect(wrapper.find('span').text()).to.equal('0')

    inputEl.blur()
    await keypress('space')
    expect(wrapper.find('span').text()).to.equal('1')
  })
})
