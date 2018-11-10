import sleep from './sleep'
import keymap from './keymap'
import $ from 'jquery'

export default async function keypress (element, keystroke) {
  const $el = $(element)
  const keys = keystroke.split('+')
    .map(k => k.toUpperCase())

  const specialKeys = ['CTRL', 'ALT', 'SHIFT']
  let ctrlPressed = (keys.indexOf('CTRL') !== -1)
  let altPressed = (keys.indexOf('ALT') !== -1)
  let shiftPressed = (keys.indexOf('SHIFT') !== -1)

  function dispatchKeyboardEvent (eventType, keys) {
    for (const key of keys) {
      if (specialKeys.indexOf(key) !== -1) continue

      const keyCode = keymap[key]
      if (keyCode === undefined) {
        console.warn('Unknown key ' + key)
        continue
      }
      $el.trigger({
        type: eventType,
        which: keyCode,
        keyCode,
        shiftKey: shiftPressed,
        ctrlKey: ctrlPressed,
        altKey: altPressed
      })
    }
  }

  dispatchKeyboardEvent('keydown', keys)
  dispatchKeyboardEvent('keypress', keys)
  await sleep()
  dispatchKeyboardEvent('keyup', keys)
  await sleep()
}
