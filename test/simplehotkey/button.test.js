import { expect } from 'chai'
import { mount, shallowMount } from '@vue/test-utils'

import VueSimpleHotkey from '../../src/index'
import Vue from 'vue'
import keypress from '../utils/keypress'

const SpanClickVue = {
  template: `
    <button v-hotkey="'space'" @click="clicked++">{{clicked}}</button>
  `,
  data () {
    return {
      clicked: 0
    }
  }
}

describe('button hotkey', () => {
  beforeEach(() => {
    Vue.use(VueSimpleHotkey)
  })

  it('should respond on button click', async () => {
    const wrapper = shallowMount(SpanClickVue)
    const button = wrapper.find('button')

    expect(button.text()).to.equal('0')
    button.element.click()
    expect(button.text()).to.equal('1')
  })

  it('should respond to space hotkey', async () => {
    const wrapper = mount(SpanClickVue, { attachToDocument: true })

    expect(wrapper.find('button').text()).to.equal('0')
    await keypress(document.body, 'space')
    expect(wrapper.find('button').text()).to.equal('1')
  })

  it('should not respond to other keys', async () => {
    const wrapper = mount(SpanClickVue, { attachToDocument: true })

    expect(wrapper.find('button').text()).to.equal('0')
    await keypress(document.body, 'enter')
    expect(wrapper.find('button').text()).to.equal('0')
  })
})
