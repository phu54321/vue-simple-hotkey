import { expect } from 'chai'
import { mount, shallowMount } from '@vue/test-utils'

import VueSimpleHotkey from '../../src/index'
import Vue from 'vue'
import keypress from '../utils/keypress'

const SpanClickVue = {
  template: `
    <span v-hotkey="'space'" @click="clicked++">{{clicked}}</span>
  `,
  data () {
    return {
      clicked: 0
    }
  }
}

describe('span hotkey', () => {
  beforeEach(() => {
    Vue.use(VueSimpleHotkey)
  })

  it('should respond on span click', async () => {
    const wrapper = shallowMount(SpanClickVue)
    const span = wrapper.find('span')

    expect(span.text()).to.equal('0')
    span.element.click()
    expect(span.text()).to.equal('1')
  })

  it('should respond to space hotkey', async () => {
    const wrapper = mount(SpanClickVue, { attachToDocument: true })

    expect(wrapper.find('span').text()).to.equal('0')
    await keypress('space')
    expect(wrapper.find('span').text()).to.equal('1')

    wrapper.destroy()
  })

  it('should respond to other hotkeys', async () => {
    const wrapper = mount(SpanClickVue, { attachToDocument: true })

    expect(wrapper.find('span').text()).to.equal('0')
    await keypress('enter')
    expect(wrapper.find('span').text()).to.equal('0')

    wrapper.destroy()
  })
})
