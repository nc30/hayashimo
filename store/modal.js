export const state = () => ({
  message: "",
  enable: false,
})

export const mutations = {
  set(state, t) {
    state.message = t.message
    enable = true
  },
  clear(state, t) {
    enable = false
  }
}

