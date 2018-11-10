import { expect } from 'chai'
import { mount } from '@vue/test-utils'

import VueSimpleHotkey from '../../src/index'
import Vue from 'vue'
import keypress from '../utils/keypress'

const SpanClickVue = {
  template: `
    <span v-hotkey="'ctrl+space'" @click="clicked++">{{clicked}}</span>
  `,
  data () {
    return {
      clicked: 0
    }
  }
}

describe('multiple keystroke test', () => {
  beforeEach(() => {
    Vue.use(VueSimpleHotkey)
  })

  it('should respond to other hotkeys', async () => {
    const wrapper = mount(SpanClickVue, { attachToDocument: true })

    expect(wrapper.find('span').text()).to.equal('0')
    await keypress(document.body, 'space')
    expect(wrapper.find('span').text()).to.equal('0')
    await keypress(document.body, 'ctrl')
    expect(wrapper.find('span').text()).to.equal('0')
    await keypress(document.body, 'ctrl+space')
    expect(wrapper.find('span').text()).to.equal('1')
    await keypress(document.body, 'space')
    expect(wrapper.find('span').text()).to.equal('1')
  })
})
