import sleep from './sleep'
import keymap from './keymap'
import $ from 'jquery'

export default async function keypress (element, keystroke) {
  const $el = $(element)
  const keys = keystroke.split('+')
    .map(k => k.toUpperCase())
    .map(k => keymap[k])

  function dispatchKeyboardEvent (eventType, keys) {
    for (const k of keys) {
      $el.trigger({ type: eventType, which: k, keyCode: k })
    }
  }

  $(document).on('keydown', e => {
    console.log(e.keyCode)
  })

  dispatchKeyboardEvent('keydown', keys)
  dispatchKeyboardEvent('keypress', keys)
  await sleep()
  dispatchKeyboardEvent('keyup', keys)
  await sleep()
}
