import Vue from 'vue'

export default function (duration) {
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
