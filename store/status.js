export const state = () => ({
  notifcations: {
    github: false,
    gitlab: false,
    slack: false,
    email: false,
  },
  kintai: 0,
  message: "Hello!",
  messages: []
})

export const mutations = {
  set(state, t) {
  },
  message(state, t){
    state.message = t
  }
}

export const actions = {
}
