import Vue from 'vue'

export default function (duration = 100) {
  return new Promise((resolve) => {
    if (duration) {
      setTimeout(() => {
        resolve()
      }, duration)
    } else {
      Vue.nextTick(resolve)
    }
  })
}
